import {
  useMemo,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react'
import './style/progress-bar.scss'
const ProgressBar = forwardRef((props,ref) => {
  useImperativeHandle(ref,()=>{
    return{
      setOffset:setOffset
    }
  })
  const progressBtnWidth = 16
  const progressRef = useRef<HTMLDivElement>(null)
  const innerProgressRef = useRef<HTMLDivElement>(null)
  const touch = useMemo(() => {
    return {}
  }, [])
  const [offset, setOffset] = useState(0)
  const progressStyle = useMemo(() => {
    return {
      width: `${offset}px`,
    }
  }, [offset])

  const btnStyle = useMemo(() => {
    return {
      transform: `translate3d(${offset}px, 0, 0)`,
    }
  }, [offset])

  useEffect(() => {
    changeOffset(props.progress)
  }, [props.progress])

  const changeOffset = (progress) => {
    const barWidth = progressRef.current.clientWidth - progressBtnWidth
    setOffset(progress * barWidth)
  }
  const onProgressTouchStart = (e) => {
    touch.x1 = e.changedTouches[0].pageX
    touch.beginWidth = innerProgressRef.current.clientWidth
  }
  const onProgressTouchMove = (e) => {
    const delta = e.changedTouches[0].pageX - touch.x1
    const tempWidth = touch.beginWidth + delta
    const barWidth = progressRef.current.clientWidth - progressBtnWidth
    const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))
    setOffset(progress * barWidth)
    props.progressChanging(progress)
  }
  const onProgressTouchEnd = () => {
    const barWidth = progressRef.current.clientWidth - progressBtnWidth
    const progress = innerProgressRef.current.clientWidth / barWidth
    props.progressChanged(progress)
  }
  const onClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect()
    
    const offsetWidth = e.pageX - rect.left
    const barWidth = progressRef.current.clientWidth - progressBtnWidth
    const progress = offsetWidth / barWidth
    
    props.progressChanged(progress)
  }
  return (
    <div className="progress-bar" ref={progressRef} onClick={onClick}>
      <div className="bar-inner">
        <div
          className="progress"
          ref={innerProgressRef}
          style={{ ...progressStyle }}
        ></div>
        <div
          className="progress-btn-wrapper"
          style={{ ...btnStyle }}
          onTouchStart={onProgressTouchStart}
          onTouchMove={onProgressTouchMove}
          onTouchEnd={onProgressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </div>
  )
})

export default ProgressBar
