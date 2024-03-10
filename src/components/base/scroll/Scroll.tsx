import BScroll from "better-scroll";
import { useRef,useEffect,useState} from 'react'
import propTypes from 'prop-types'
import './index.scss'
function Scroll (props: any){
  const rootRef = useRef(null)
  const [scroll,setScroll] = useState<any>(null)
  useEffect(()=>{
    let scrollRef = new BScroll(rootRef.current,{
      observeDOM: true,
      ...props
    })
    setScroll(scrollRef)
    return ()=>{
      scrollRef.destroy()
      setScroll(null)
    }
  },[])
  
 
  return <div ref={rootRef} className={props.className}>
    {props.children}
  </div>
}

Scroll.defaultProps = {
  click: true,
  probeType: 0
}

Scroll.propTypes = {
  click: propTypes.boolean,
  probeType: propTypes.number,
}

export default Scroll