import './style/playlist.scss'
import { createPortal } from 'react-dom'
import Scroll from '../base/scroll/Scroll'
import useMode from './use-mode'
import useFavorite from './use-favorite'
import { useState, useMemo, useEffect,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import useAppSelector from '@/store/slice/actionHook'
import { setPlayingState,setCurrentIndex} from '@/store/slice/appSlice'
export default function Playlist(props){
  const dispatch = useDispatch()
  const { clearSongList, removeSongStore } = useAppSelector()
  const store = useSelector((state) => state.app)
  const {playlist,currentIndex,sequenceList} = store 
  const currentSong = useMemo(() => playlist[currentIndex] || {}, [currentIndex, playlist])
  const [visible,setVisible] = useState(false)
  const [scroll,setScroll] = useState(null)
  const [removing,setRemoving] = useState(false)
  const listRef = useRef(null)
  const scrollRef = useRef(null)
  const show = ()=>{
    setVisible(true)
    refreshScroll()
    scrollToCurrent()
  }
  const hide = ()=>{
    setVisible(false)
  }

  const  refreshScroll =()=>{
    scrollRef.current.scroll.refresh()
  }
  const  scrollToCurrent = ()=>{
    const listRefVal = listRef.current
    const index = sequenceList.findIndex(song => {
      return song.id === currentSong.id
    })
    if(index === -1) return
    const target = listRefVal.$el.children[index]
    scrollRef.current.scroll.scrollToElement(target, 300)
  }
  const selectItem = (song) =>{
    const index = playlist.findIndex(item => item.id === song.id)
    dispatch(setCurrentIndex(index))
    dispatch(setPlayingState(true))
  }
  const getCurrentIcon = (song) =>{
    if (song.id === currentSong.id) {
      return 'icon-play'
    }
  }
  const removeSong = (song) =>{
    if(removing){
      return
    }
    setRemoving(true)
    removeSongStore(store,song)
    if(!playlist.value.length){
      hide()
    }
    setTimeout(() => {
      setRemoving(false)
    },300)
  }
  const showAddSong = ()=>{
    
  }
  const confirmClear = ()=>{
    clearSongList()
    hide()
  }
  const showConfirm = ()=>{
    
  }
  const { modeIcon, changeMode, modeText } = useMode()
  const { getFavoriteIcon,toggleFavorite} = useFavorite()
  return <>
    {
      createPortal( <div className="playlist" v-show="visible && playlist.length" onClick={hide}>
      <div className="list-wrapper" onClick={(e)=> e.stopPropagation}>
        <div className="list-header">
          <h1 className="title">
            <i  className={`${modeIcon} icon`} onClick={changeMode}> </i>
            <span className="text">{ modeText }</span>
            <span className="clear" onClick={showConfirm}>
              <i className="icon-clear"></i>
            </span>
          </h1>
        </div>
        <Scroll  ref={scrollRef} className="list-content">
          <ul ref="listRef">
            {
              sequenceList.map(song =>    <li
                className="item"
              
                key={song.id}
                onClick={() => selectItem(song)}
              >
                <i  className={`${getCurrentIcon(song)} current`}></i>
                <span className="text">{ song.name }</span>
                <span className="favorite" onClick={()=>toggleFavorite(song)}>
                  <i className={getFavoriteIcon(song)}></i>
                </span>
                <span onClick={()=>removeSong(song)} className={ removing ? 'disable': '' + ' delete'  }>
                  <i className="icon-delete"></i>
                </span>
              </li>)
            }
         
          </ul>
        </Scroll>
        <div className="list-add">
          <div className="add" onClick={showAddSong}>
            <i className="icon-add"></i>
            <span className="text">添加歌曲到队列</span>
          </div>
        </div>
        <div className="list-footer" onClick={hide}>
          <span>关闭</span>
        </div>
      </div>
    </div>,document.body)
    }
  </>
}