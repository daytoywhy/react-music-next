import { PLAY_MODE } from '@/assets/js/constant'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import useAppSelector from '@/store/slice/actionHook.tsx'
export default function useMode() {
  const {changeModeStore } = useAppSelector()
  const store =  useSelector(state => state.app)
  const { playMode } = store 
  const modeIcon = useMemo(()=>{
    return playMode === PLAY_MODE.sequence
      ? 'icon-sequence'
      : playMode === PLAY_MODE.random
        ? 'icon-random'
        : 'icon-loop'
  },[playMode]) 

  const modeText = useMemo(()=>{
    return playMode === PLAY_MODE.sequence
      ? '顺序播放'
      : playMode === PLAY_MODE.random
        ? '随机播放'
        : '循环播放'
  },[playMode])
  function changeMode() {
    const mode = (playMode + 1) % 3
    changeModeStore(store,mode)
  }
  return {
    modeIcon,
    changeMode,
    modeText
  }
}
