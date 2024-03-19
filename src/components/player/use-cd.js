
import { useMemo,useRef,useEffect } from 'react'
import {useSelector } from 'react-redux'

export default function useCd() {
  const cdRef = useRef(null)
  const cdImageRef = useRef(null)
  const { playing } = useSelector((state) => state.app)
  const cdCls = useMemo(()=>{
    return playing ? 'playing' : ''
  },[])
  useEffect(()=>{
    if(!playing){
      syncTransform(cdRef.current, cdImageRef.current)
    }
  },[playing])
  function syncTransform(wrapper, inner) {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    const transformValue =
      wrapperTransform === 'none' ? innerTransform : innerTransform.concat(' ', wrapperTransform)
    wrapper.style.transform = transformValue
  }
  return {
    cdCls,
    cdRef,
    cdImageRef
  }
}
