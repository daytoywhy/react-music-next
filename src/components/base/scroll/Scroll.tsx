import BScroll from "better-scroll";
import { useImperativeHandle,useEffect,useState,forwardRef} from 'react'
import './index.scss'
const Scroll = forwardRef ((props,ref) =>{
  const [scrollValue,setScrollValue] = useState<any>(null)
  
  const initScroll = () => {
    setScrollValue(()=>{
      return new BScroll(ref.current,{
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
  

  return <div className={props.className} ref={ref}>
    {props.children}
  </div>
})


export default Scroll