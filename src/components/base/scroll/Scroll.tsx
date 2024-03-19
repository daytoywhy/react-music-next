import BScroll from "better-scroll";
import { useRef,useEffect,useState,useImperativeHandle,forwardRef} from 'react'
import './index.scss'
const Scroll =forwardRef((props,ref) =>{
  useImperativeHandle(ref,()=>{
    return {
      scroll: scrollValue
    }
  })
  const scrollRef = useRef<any>(null)
  const [scrollValue,setScrollValue] = useState<any>(null)
  
  const initScroll = () => {
    setScrollValue(()=>{
      return new BScroll(scrollRef.current,{
        observeDOM: true,
        click: true,
        ...props.options,
      })
    })

  }
  useEffect(()=>{
    initScroll()
    return ()=>{
      if(scrollValue && scrollValue.destroy){
        scrollValue.destroy()
      }
    }
  },[])
  useEffect(()=> {
    if(scrollValue) {
      scrollValue.on('scroll', (pos) => {
        props.onScroll && props.onScroll(pos)
      })
    }
  },[scrollValue])
  
  

  return <div className={props.className} ref={scrollRef} style={{...props.style}}>
    {props.children}
  </div>
})


export default Scroll