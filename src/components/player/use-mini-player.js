import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef, useEffect, useMemo } from 'vue'
import BScroll from 'better-scroll'

export default function useMiniPlayer() {
  const dispatch = useDispatch()
  const sliderWrapperRef = useRef(null)
  const [slider, setSlider] = useState(null)

  const { currentIndex, fullScreen, playlist } = useSelector(
    (state) => state.app
  )
  const sliderShow = useMemo(() => {
    !fullScreen.value && !!playlist.value.length
  }, [fullScreen, playlist])

  useEffect(() => {
    if (sliderShow) {
      if (!slider) {
        setSlider(
          new BScroll(sliderWrapperRef.current, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true,
            },
          })
        )
        sliderVal.on('slidePageChanged', ({ pageX }) => {
          dispatch(setCurrentIndex(pageX))
        })
      } else {
        slider.refresh()
      }
      slider.goToPage(currentIndex.value, 0, 0)
    }
    if (slider && sliderShow) {
      slider.goToPage(newIndex, 0, 0)
    }
    if (slider && sliderShow && playlist.length) {
      slider.refresh()
    }
    return ()=>{
      if (slider) {
        slider.destroy()
      }
    }
  }, [sliderShow, slider, currentIndex, playlist])

  return {
    slider,
    sliderWrapperRef,
  }
}
