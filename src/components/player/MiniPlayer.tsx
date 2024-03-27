import './style/mini-player.scss'
import ProgressCircle from "./ProgressCircle"
import Playlist from "./Playlist"
import useCd from './use-cd'
import useMiniPlayer from './use-mini-player' 
import { useMemo,useState,useRef } from "react"
import { useSelector,useDispatch } from "react-redux"
import { setFullScreen} from '@/store/slice/appSlice'
export default function MiniPlayer(props){
  const dispatch = useDispatch()
  const playlistRef = useRef(null)
  const { playlist,currentIndex,playing,fullScreen} = useSelector(state => state.app)
  const miniPlayIcon = useMemo(()=>{
    return playing ? 'icon-pause-mini' : 'icon-play-mini'
  },[playing])
  const currentSong = useMemo(()=>{
    return playlist[currentIndex] || {}
  },[playlist,currentIndex])
  const { cdCls, cdRef, cdImageRef } = useCd()
  const { slider, sliderWrapperRef } = useMiniPlayer()

  const showNormalPlayer = () => {
    dispatch(setFullScreen(true))
  }
  const showPlaylist = (e) =>{
    e.stopPropagation()
  }
  return(
    <div className="mini-player" style={{
      display: !fullScreen ? 'block' : 'none'
    }} v-show="!fullScreen" onClick={showNormalPlayer}>
    <div className="cd-wrapper">
      <div ref={cdRef} className="cd">
        <img ref={cdImageRef} width="40" height="40" src={currentSong.pic} className={cdCls} />
      </div>
    </div>
    <div ref={sliderWrapperRef} className="slider-wrapper">
      <div className="slider-group">
        {
          playlist.map(song =><div className="slider-page"  key={song.id}>
          <h2 className="name">{ song.name }</h2>
          <p className="desc">{song.singer }</p>
        </div>)
        }
      </div>
    </div>
    <div className="control">
      <ProgressCircle radius={32} progress={props.progress}>
        <i className={`${miniPlayIcon} + icon-mini`} onClick={(e)=>{
          e.stopPropagation()
          props.togglePlay
        }}></i>
      </ProgressCircle>
    </div>
    <div className="control" onClick={(e)=> showPlaylist(e)}>
      <i className="icon-playlist"></i>
    </div>
    <Playlist></Playlist>
  </div>
  )
}