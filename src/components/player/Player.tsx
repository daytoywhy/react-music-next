import './style/player.scss'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Scroll from '@/components/base/scroll/Scroll'
import { formatTime } from '@/assets/js/util.js'
import { PLAY_MODE } from '@/assets/js/constant.js'
import useCd from './use-cd.js'
import useLyric from './use-lyric.js'
import useMiddleInteractive from './use-middle-interactive.js'
import useAnimation from './use-animation.js'
import usePlayHistory from './use-play-history.js'
import useMode from './use-mode.js'
import useFavorite from './use-favorite.js'
import ProgressBar from './ProgressBar'
import MiniPlayer from './MiniPlayer'
import { setFullScreen,setPlayingState,setCurrentIndex} from '@/store/slice/appSlice'
export default function Player() {
  const dispatch = useDispatch()
  const audioRef = useRef(null)
  const barRef = useRef(null)
  const [songReady, setSongReady] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isProgressChanging, setIsProgressChanging] = useState(false)
  const { fullScreen,playing,playlist,currentIndex,playMode} = useSelector((state) => state.app)
  
  const currentSong = useMemo(()=>{
    return playlist[currentIndex] || {}
  },[currentIndex,playlist])

  const disableCls = useMemo(()=>{
   return songReady ? '' : 'disable'
  },[songReady])
  const playIcon = useMemo(()=>{
    return playing ? 'icon-pause' : 'icon-play'
  },[playing])
  const progress = useMemo(()=>{
    return currentTime / currentSong.duration
  },[currentTime])
  const { modeIcon, changeMode } = useMode()
  
  const { cdCls, cdRef, cdImageRef } = useCd()
  const { getFavoriteIcon, toggleFavorite } = useFavorite()
  const {
    currentLyric,
    currentLineNum,
    pureMusicLyric,
    playingLyric,
    lyricScrollRef,
    lyricListRef,
    playLyric,
    stopLyric
  } = useLyric({ songReady, currentTime })
  const {
    currentShow,
    middleLStyle,
    middleRStyle,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd
  } = useMiddleInteractive()

  const { cdWrapperRef,enter,afterEnter,leave,afterLeave } = useAnimation()
  const { savePlay } = usePlayHistory()

  useEffect(()=>{
    if (!currentSong.id || !currentSong.url) {
      return
    }
    setSongReady(false)
    const audioEl = audioRef.current
    audioEl.src = currentSong.url
    audioEl.play()
    dispatch(setPlayingState(true))
   
  },[currentSong])

  useEffect(()=>{
    if (!songReady) {
      return
    }
    const audioEl = audioRef.current
    if (playing) {
      audioEl.play()
      playLyric()
    } else {
      audioEl.pause()
      stopLyric()
    }
  },[playing])

  useEffect(()=>{
    if (fullScreen) {
      barRef.current.setOffset(progress)
    }
  },[fullScreen])

  const goBack = () => {
    dispatch(setFullScreen(false))
  }
  const prev = () => {
    const list = playlist
    if (!list.length || !songReady) return
    if (list.length === 1) {
      loop()
    } else {
      let index = currentIndex - 1
      if (index === -1) {
        index = list.length - 1
      }
      dispatch(setCurrentIndex(index))
    }
  }
  const next = () =>{
    const list = playlist
    if (!list.length || !songReady) return
    if (list.length === 1) {
      loop()
    } else {
      let index = currentIndex + 1
      if (index === list.length) {
        index = 0
      }
      dispatch(setCurrentIndex(index))
    }
  }

  const togglePlay = ()=>{
    if (!songReady) return
    dispatch(setPlayingState(!playing))
  }

  const loop = () => {
    const audioEl = audioRef.current
    audioEl.currentTime = 0
    audioEl.play()
    dispatch(setPlayingState(true))
  }

  const pause = () => {
    dispatch(setPlayingState(false))
  }

  const ready = () =>{
    if (songReady) return
    setSongReady(true)
    playLyric()
    savePlay(currentSong)
  }
  const error = ()=>{
    setSongReady(true)
  }
  const updateTime = e => {
    if (isProgressChanging) {
      return
    }
    setCurrentTime(e.target.currentTime)
  }

  const progressChanging = (progress)=>{
    setIsProgressChanging(true)
    setCurrentTime(currentSong.duration * progress)
    
    playLyric()
    stopLyric()
  }

  const progressChanged = (progress)=>{
    setIsProgressChanging(false)
    setCurrentTime(currentSong.duration * progress)
    const audioEl = audioRef.current
      audioEl.currentTime = currentTime
      if (!playing) {
        dispatch(setPlayingState(true))
      }
      playLyric()
  }

  const end = () =>{
    setCurrentTime(0)
    if (playMode === PLAY_MODE.loop) {
      loop()
    } else {
      next()
    }
  }
  return (
    <div className="player" style={{ display: playlist.length ? 'block' : 'none'}}>
      <div className="normal-player"  style={{display: fullScreen ? 'block' : 'none'}}>
        <div className="background">
          <img src={currentSong.pic} />
        </div>
        <div className="top">
          <div className="back" onClick={goBack}>
            <i className="icon-back"></i>
          </div>
          <h1 className="title">{currentSong.name}</h1>
          <h2 className="subtitle">{currentSong.singer}</h2>
        </div>
        <div
          className="middle"
          onTouchStart={onMiddleTouchStart}
          onTouchMove={onMiddleTouchMove}
          onTouchEnd={onMiddleTouchEnd}
        >
          <div className="middle-l" style={{ ...middleLStyle }}>
            <div ref={cdWrapperRef} className="cd-wrapper">
              <div ref={cdRef} className="cd">
                <img
                  ref={cdImageRef}
                  className={`${cdCls} image`}
                  src={currentSong.pic}
                />
              </div>
            </div>
            <div className="playing-lyric-wrapper">
              <div className="playing-lyric">{playingLyric}</div>
            </div>
          </div>
          <Scroll
            className="middle-r"
            ref={lyricScrollRef}
            style={{ ...middleRStyle }}
          >
            <div className="lyric-wrapper">
              {currentLyric ? (
                <div ref={lyricListRef}>
                  {currentLyric.lines.map((line, index) => (
                    <p
                      className="text"
                      className={currentLineNum === index ? 'current' : ''}
                      key={line.num}
                    >
                      {line.txt}
                    </p>
                  ))}
                </div>
              ) : (
                ''
              )}

              <div className="pure-music" style={{display : pureMusicLyric ? 'block' : 'none'}}>
                <p>{pureMusicLyric}</p>
              </div>
            </div>
          </Scroll>
        </div>
        <div className="bottom">
          <div className="dot-wrapper">
            <span
              className={(currentShow === 'cd' ? 'active' : '') + ' dot'}
            ></span>
            <span
              className={(currentShow === 'lyric' ? 'active' : '') + ' dot'}
            ></span>
          </div>
          <div className="progress-wrapper">
            <span className="time time-l">{formatTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar
                progressChanging={progressChanging}
                progressChanged={progressChanged}
                ref={barRef}
                progress={progress}
              ></ProgressBar>
            </div>
            <span className="time time-r">
              {formatTime(currentSong.duration)}
            </span>
          </div>
          <div className="operators">
            <div className="icon i-left">
              <i onClick={changeMode} className={modeIcon}></i>
            </div>
            <div  className={`${disableCls} icon i-left`}>
              <i onClick={prev} className="icon-prev"></i>
            </div>
            <div  className={`${disableCls} icon i-center`}>
              <i onClick={togglePlay} className={playIcon}></i>
            </div>
            <div  className={`${disableCls} icon i-right`}>
              <i onClick={next} className="icon-next"></i>
            </div>
            <div className="icon i-right">
              <i
                className={getFavoriteIcon(currentSong)}
                onClick={()=>toggleFavorite(currentSong)}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <audio
      ref={audioRef}
      onPause={pause}
      onError={error}
      onCanPlay={ready}
      onTimeUpdate={updateTime}
      onEnded={end}
    ></audio>
    </div>
  )
}
