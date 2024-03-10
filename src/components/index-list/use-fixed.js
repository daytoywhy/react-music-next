
import { useEffect, useState,useRef,useMemo} from 'react'
export default function useFixed(props){
  const HEIGHT = 30
  const groupRef = useRef(null)
  const [scrollY,setScrollY] = useState(0)
  const [listHeights,setListHeights] = useState([])
  const [currentIndex,setCurrentIndex] = useState(0)
  const [distance,setDistance] = useState(0)
  const onListenerScroll = (pos) => {
    setScrollY(-pos.y)
  }
  const calclate = ()=>{
    const list = groupRef.current.children
    let listHeights = []
    let height = 0
    listHeights.push(height)
    for(let i=0;i<list.length;i++){
      height += list[i].clientHeight
      listHeights.push(height)
    }
    setListHeights(listHeights)
  }
  useEffect(()=>{
    (async ()=>{
      await new Promise(resolve => setTimeout(resolve,0))
      calclate()
    })()
  },[props.data])
  useEffect(()=>{
    for (let i = 0; i < listHeights.length - 1; i++) {
      let heightTop = listHeights[i]
      let heightBottom = listHeights[i + 1]
      if (scrollY >= heightTop && scrollY <= heightBottom) {
        setCurrentIndex(i)
        setDistance(heightBottom - scrollY)
      }
    }
  },[scrollY])

  const fixedStyle = useMemo(() => {
    const diff = distance > 0 && distance < HEIGHT ? distance - HEIGHT : 0
    return {
      transform: `translate3d(0,${diff}px,0)`
    }
  },[distance])
  const fixedTitle = useMemo(() => {
    if (scrollY < 0) return ''
    const currentGroup = props.data[currentIndex]
    return currentGroup ? currentGroup.title : ''
  },[scrollY])
  return {
    onListenerScroll,
    groupRef,
    fixedStyle,
    fixedTitle,
    currentIndex
  }
}