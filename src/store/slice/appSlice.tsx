import { createSlice } from "@reduxjs/toolkit";
import {load} from '@/assets/js/array-store'
import {PLAY_MODE,SEARCH_KEY } from '@/assets/js/constant'


interface AppState {
  sequenceList: any[],
  playlist: any[],
  playing: boolean,
  playMode: number,
  fullScreen: boolean,
  currentIndex: number,
  favoriteList: any[],
  searchHistory: any[],
  playHistory: any[]
}
const initialState: AppState = {
  sequenceList: [],
  playlist: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  fullScreen: false,
  currentIndex: 0,
  favoriteList: [],
  searchHistory: load(SEARCH_KEY),
  playHistory: []
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
      setPlayingState:(state,action) => {
        state.playing = action.payload
      },
      setSequenceList:(state,action) => {
        state.sequenceList = action.payload
      },
      setPlaylist:(state,action) => {
        state.playlist = action.payload
      },
      setPlayMode:(state,action) => {
        state.playMode = action.payload
      },
      setCurrentIndex:(state,action) => {
        state.currentIndex = action.payload
      },
      setFullScreen:(state,action) => {
        state.fullScreen = action.payload
      },
      setFavoriteList:(state,action) => {
        state.favoriteList = action.payload
      },
      addSongLyric:(state,action) => {
        const { song, lyric } = action.payload
        state.sequenceList.map((item) => {
          if (item.id === song.id) {
            item.lyric = lyric
          }
          return item
        })
      },
      setSearchHistory:(state,action) => {
        state.searchHistory = action.payload
      },
      setPlayHistory:(state,action) => {
        state.playHistory = action.payload
      }
    }
})
export const { setPlayingState, setSequenceList, setPlaylist, setPlayMode, setCurrentIndex, setFullScreen, setFavoriteList, addSongLyric, setSearchHistory, setPlayHistory } = appSlice.actions;
export default appSlice.reducer;