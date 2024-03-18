import BScroll from "better-scroll";
import { useRef,useEffect,useState} from 'react'
import './index.scss'
const Scroll =(props) =>{
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
    props.getScroll && props.getScroll(scrollValue)
  },[scrollValue])
  

  return <div className={props.className} ref={scrollRef} style={{...props.style}}>
    {props.children}
  </div>
}


export default Scroll