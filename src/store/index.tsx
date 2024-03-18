import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slice/appSlice'
export default configureStore({
  reducer:{
    app: appReducer,
  }
})