import { useMemo, useRef, useState, useEffect } from 'react'
import Scroll from '@/components/base/scroll/Scroll'
import SongList from '@/components/base/song-list/SongList'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { history } from 'umi'
import './index.scss'
export default function MusicList(props) {
  const { playlist } = useSelector((state) => state.app)

  const RESERVED_HEIGHT = 40
  const { songs, rank, title, pic, loading } = props
  const bgImage = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)
  const [maxTranslateY, setMaxTranslateY] = useState(0)

  useEffect(() => {
    setImageHeight(()=> bgImage.current.clientHeight)
    setMaxTranslateY(()=> imageHeight - RESERVED_HEIGHT)
   
  }, [imageHeight])

  const goBack = () => {
    history.back()
  }
  const bgImageStyle = useMemo(() => {
    let zIndex = 0
    let paddingTop: string | number = '70%'
    let height: string | number = 0
    let translateZ = 0
    let scale = 1
    
    if (scrollY > maxTranslateY) {
      zIndex = 10
      paddingTop = 0
      height = `${RESERVED_HEIGHT}px`
      translateZ = 1
    }
    if (scrollY < 0) {
      scale = 1 + Math.abs(scrollY / imageHeight)
    }
    
    return {
      backgroundImage: `url(${pic})`,
      zIndex,
      paddingTop,
      height,
      transform: `scale(${scale})`,
    }
  }, [scrollY])
  
  const playBtnStyle = useMemo(() => {
    let display = ''
    if (scrollY > maxTranslateY) {
      display = 'none'
    }
    return {
      display,
    }
  }, [scrollY, maxTranslateY])
  const filterStyle = useMemo(() => {
    let blur = 0
    if (scrollY >= 0) {
      blur = Math.min(maxTranslateY / imageHeight, scrollY / imageHeight) * 20
    }
    return {
      backdropFilter: `blur(${blur}px)`,
    }
  }, [scrollY, maxTranslateY, imageHeight])
  const scrollStyle = useMemo(() => {
    const bottom = playlist.length > 0 ? '60px' : 0
    return {
      top: `${imageHeight}px`,
      bottom,
    }
  }, [imageHeight, playlist])
  const random = () => {}
  const selectItem = () => {}
  const handleScroll = (pos) => {
    setScrollY(-pos.y)
  }
  return (
    <div className="music-list">
      <div className="back" onClick={goBack}>
        <i className="icon-back"></i>
      </div>
      <h1 className="title">{title}</h1>
      <div className="bg-image" style={{ ...bgImageStyle }} ref={bgImage}>
        <div className="play-btn-wrapper" style={{ ...playBtnStyle }}>
          {songs?.length > 0 ? (
            <div className="play-btn" onClick={random}>
              <i className="icon-play"></i>
              <span className="text">随机播放全部</span>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="filter" style={{ ...filterStyle }}></div>
      </div>
      <Scroll
        className="list"
        style={{ ...scrollStyle }}
        options={{ probeType: 3 }}
        onScroll={handleScroll}
      >
        <div className="song-list-wrapper">
          <SongList songs={songs} select={selectItem} rank={rank}></SongList>
        </div>
      </Scroll>
    </div>
  )
}

MusicList.defineProps = {
  songs: [],
  rank: false,
  loading: false,
  pic: '',
  title: '',
}
MusicList.propTypes = {
  songs: PropTypes.array,
  rank: PropTypes.bool,
  loading: PropTypes.bool,
  pic: PropTypes.string,
  title: PropTypes.string,
}
