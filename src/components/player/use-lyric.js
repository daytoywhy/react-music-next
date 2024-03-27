import { useSelector, useDispatch } from 'react-redux'
import { useMemo, useState, useEffect, useRef } from 'react'
import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser'
import {addSongLyric} from '@/store/slice/appSlice'
export default function useLyric({ songReady, currentTime }) {
  const dispatch = useDispatch()
  const lyricScrollRef = useRef(null)
  const lyricListRef = useRef(null)
  const [currentLineNum, setCurrentLineNum] = useState(0)
  const [currentLyric, setCurrentLyric] = useState(null)
  const [playingLyric, setPlayingLyric] = useState('')
  const [pureMusicLyric, setPureMusicLyric] = useState('')
  const { playlist, currentIndex } = useSelector((state) => state.app)
  const currentSong = useMemo(() => {
    return playlist[currentIndex] || {}
  }, [currentIndex, playlist])

  useEffect(() => {
    if (!currentSong.id || !currentSong.url) return
    stopLyric()
    setCurrentLyric(null)
    setCurrentLineNum(0)
    setPureMusicLyric('')
    setPlayingLyric('')
    ;(async function () {
      const lyric = await getLyric(newSong)
      dispatch(
        addSongLyric({
          song: newSong,
          lyric,
        })
      )
      if (currentSong.lyric !== lyric) return
      setCurrentLyric(new Lyric(lyric, handleLyric))
      const hasLyric = currentLyric.lines.length > 0
      if (hasLyric) {
        if (songReady) {
          playLyric()
        }
      } else {
        setPlayingLyric(lyric.replace(/\[(\d{2}):(\d{2}):(\d{2})\]/g, ''))
        setPureMusicLyric(lyric.replace(/\[(\d{2}):(\d{2}):(\d{2})\]/g, ''))
      }
    })


  }, [currentSong])

  function handleLyric({ lineNum, txt }) {
    setCurrentLineNum(lineNum)
    setCurrentLyric(txt)
    const scrollComp = lyricScrollRef.current
    const listEl = lyricListRef.current
    if (!listEl) return
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5]
      scrollComp?.scroll?.scrollToElement(lineEl, 1000)
    } else {
      scrollComp?.scroll?.scrollTo(0, 0, 1000)
    }
  }
  function playLyric() {
    currentLyric && currentLyric.seek(currentTime.value * 1000)
  }
  function stopLyric() {
    currentLyric && currentLyric.stop()
  }
  return {
    currentLyric,
    currentLineNum,
    pureMusicLyric,
    playingLyric,
    lyricScrollRef,
    lyricListRef,
    playLyric,
    stopLyric,
  }
}
