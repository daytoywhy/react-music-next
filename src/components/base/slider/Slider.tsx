import { useState,useRef,useEffect } from 'react'
import BScroll from 'better-scroll'
import './index.scss'
function Slider(props: any) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [scrollRef,setScrollRef] = useState<BScroll|null>(null)
  useEffect(()=>{
    let scroll = new BScroll(rootRef.current!, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true
    })
    scroll.on('slideWillChange', (page) => {
      setCurrentPageIndex(page.pageX)
    })
    setScrollRef(scroll)
    return () => {
      setScrollRef(null)
    }
  },[])
  return (
    <div className="slider" ref={rootRef}>
      <div className="slider-group">
        {props.slidersList.map((item) => (
          <div className="slider-page" key={item.id}>
            <a href={item.link}>
              <img src={item.pic} />
            </a>
          </div>
        ))}
      </div>
      <div className="dots-wrapper">
        {props.slidersList.map((item, index) => (
          <span
            key={item.id}
            className={(currentPageIndex === index ? 'active' : '') + ' dot'}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default Slider
