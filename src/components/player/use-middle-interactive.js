import { useRef, useState, useMemo } from 'react'

export default function useMiddleInteractive() {
  const [middleLStyle, setMiddleLStyle] = useState(null)
  const [middleRStyle, setMiddleRStyle] = useState(null)
  const [currentShow, setCurrentShow] = useState('cd')

  const touch = useMemo(() => {
    return {}
  }, [])
  let currentView = 'cd'
  function onMiddleTouchStart(e) {
    touch.startX = e.changedTouches[0].pageX
    touch.startY = e.changedTouches[0].pageY
    touch.directionLock = ''
  }
  function onMiddleTouchMove(e) {
    const deltaX = e.changedTouches[0].pageX - touch.startX
    const deltaY = e.changedTouches[0].pageY - touch.startY

    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)
    if (!touch.directionLock) {
      touch.directionLock = absDeltaX >= absDeltaY ? 'h' : 'v'
    }
    if (touch.directionLock === 'v') {
      return
    }
    const left = currentView === 'cd' ? 0 : -window.innerWidth
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
    touch.percent = Math.abs(offsetWidth / window.innerWidth)

    if (currentView === 'cd') {
      touch.percent > 0.2 ? setCurrentShow('lyric') : setCurrentShow('cd')
    } else {
      touch.percent < 0.8 ? setCurrentShow('cd') : setCurrentShow('lyric')
    }
    setMiddleLStyle({
      opacity: 1 - touch.percent,
    })

    setMiddleRStyle({
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
    })
  }
  function onMiddleTouchEnd() {
    let offsetWidth
    let opacity
    if (currentShow === 'cd') {
      currentView = 'cd'
      opacity = 1
      offsetWidth = 0
    } else {
      currentView = 'lyric'
      opacity = 0
      offsetWidth = -window.innerWidth
    }
    const duration = 300
    setMiddleLStyle({
      opacity,
      transitionDuration: `${duration}ms`,
    })

    setMiddleRStyle({
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
      transitionDuration: `${duration}ms`,
    })
  }
  return {
    currentShow,
    middleLStyle,
    middleRStyle,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd,
  }
}
