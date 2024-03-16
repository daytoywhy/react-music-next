import BScroll from 'better-scroll'
import { useRef,useEffect,useState} from 'react'
export default function useUpPullLoad(requestData, preventPullUpLoad){
  const [scroll,setScroll] = useState(null)
  const rootRef = useRef(null)
  const [isPullUpLoad,setIsPullUpLoad] = useState(false)


  const initScroll = () => {
    setScroll(()=>{
      return new BScroll(rootRef.current,{
        pullUpLoad: true,
        observeDOM: true,
        click: true
      })
    })

  }
  useEffect(()=>{
    initScroll()
    return ()=>{
      if(scroll && scroll.destroy){
        scroll.destroy()
      }
    }
  },[])
  useEffect(()=> {
    if(scroll) {
      scroll.on('pullingUp', pullingUpHandler)
    }
  },[scroll,preventPullUpLoad])
  const pullingUpHandler = async() =>{
    if (preventPullUpLoad) {
      scroll.finishPullUp()
      return
    }
    setIsPullUpLoad(true)
    await requestData()
    scroll.finishPullUp()
    scroll.refresh()
    setIsPullUpLoad(false)
  }
  return {
    scroll,
    rootRef,
    isPullUpLoad
  }
}