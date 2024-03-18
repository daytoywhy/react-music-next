import { Provider } from "react-redux";
import React from 'react'
import store from "./store";
import './assets/styles/index.scss'
export const rootContainer = (root) =>{
  return (
    <Provider store={store}>
      {root}
    </Provider>
  )
}