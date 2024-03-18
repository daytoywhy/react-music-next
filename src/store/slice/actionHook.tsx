import { useDispatch,useSelector } from 'react-redux'
import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/util'

import {setPlayingState, setSequenceList, setPlaylist, setPlayMode, setCurrentIndex, setFullScreen, setFavoriteList, addSongLyric, setSearchHistory, setPlayHistory} from './appSlice'
const dispatch = useDispatch()
export const selectPlay = ({ list,index}) => {
  dispatch(setPlayMode(PLAY_MODE.sequence))
  dispatch(setPlaylist(list))
  dispatch(setPlayingState(true))
  dispatch(setFullScreen(true))
  dispatch(setPlaylist(list))
  dispatch(setCurrentIndex(index))
}

export const randomPlay = (list) => {
  dispatch(setPlayMode(PLAY_MODE.random))
  dispatch(setPlaylist(list))
  dispatch(setPlayingState(true))
  dispatch(setFullScreen(true))
  dispatch(setPlaylist(shuffle(list)))
  dispatch(setCurrentIndex(0))
}

export const changeMode = (state,mode) => {
  const currentId = state.playlist[state.currentIndex].id
  if(mode === PLAY_MODE.random){
    dispatch(setPlaylist(shuffle(state.sequenceList)))
  } else {
    dispatch(setPlaylist(state.sequenceList))
  }
  let index = state.playlist.findIndex(item => item.id === currentId)
  dispatch(setPlayMode(mode))
  dispatch(setCurrentIndex(index))
}

export const removeSong = (state,song) => {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()

  let playIndex = playlist.findIndex((item) => item.id === song.id)
  let sequenceIndex = sequenceList.findIndex((item) => item.id === song.id)

  if(playIndex < 0 || sequenceIndex < 0) return
  playlist.splice(playIndex,1)
  sequenceList.splice(sequenceIndex,1)

  let currentIndex = state.currentIndex
  if(playIndex < currentIndex || currentIndex === playlist.length){
    currentIndex--
  }
  dispatch(setPlaylist(playlist))
  dispatch(setSequenceList(sequenceList))
  dispatch(setCurrentIndex(currentIndex))
  if(!playlist.length){
    dispatch(setPlayingState(false))
  }
}

export function clearSongList() {
  dispatch(setSequenceList([]))
  dispatch(setPlaylist([]))
  dispatch(setCurrentIndex(0))
  dispatch(setPlayingState(false))
}

export function addSong(state, song) {
  const playlist = state.playlist.slice()
  const sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  const playIndex = findIndex(playlist, song)

  if (playIndex > -1) {
    currentIndex = playIndex
  } else {
    playlist.push(song)
    currentIndex = playlist.length - 1
  }

  const sequenceIndex = findIndex(sequenceList, song)
  if (sequenceIndex === -1) {
    sequenceList.push(song)
  }
  dispatch(setSequenceList(sequenceList))
  dispatch(setPlaylist(playlist))
  dispatch(setCurrentIndex(currentIndex))
  dispatch(setPlayingState(true))
  dispatch(setFullScreen(true))
}

function findIndex(list:any[], song:object) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

