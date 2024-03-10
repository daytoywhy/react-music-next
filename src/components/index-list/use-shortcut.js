import { useRef,useState,useEffect,useMemo } from "react";

export default function useShortcut(props,groupRef){
  const ANCHOR_HEIGHT = 18
  const scrollRef = useRef(null)
  const [scroll,setScroll] = useState(null)
  let shortcutList = useMemo(() => {
    return props.data.map((item) => item.title)
  },[props.data])

  const touch = useMemo(()=>{
     return {}
  },[])
  function onShortcutTouchStart(e){
    e.stopPropagation()
    // e.preventDefault()
    const anchorIndex = parseInt(e.target.dataset.index)
    touch.anchorIndex = anchorIndex
    touch.y1 = e.changedTouches[0].pageY
    scrollTo(anchorIndex)
  }
  function onShortcutTouchMove(e){
    e.stopPropagation()
    // e.preventDefault()
    touch.y2 = e.changedTouches[0].pageY
    let delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0
    const anchorIndex = touch.anchorIndex + delta
    // console.log(anchorIndex);
    scrollTo(anchorIndex)
  }
  function onShortcutTouchEnd(e){
    e.stopPropagation()
    // e.preventDefault()
  }
  function scrollTo(index){
    if (isNaN(index)) return
    index = Math.max(0, Math.min(shortcutList.length - 1, index))
    const anchorElement = groupRef.current.children[index]
    scroll.scrollToElement(anchorElement)
  }
  function getScrollRef(scrollValue){
    setScroll(scrollValue)
  }
  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchEnd,
    onShortcutTouchMove,
    getScrollRef
  }
}
