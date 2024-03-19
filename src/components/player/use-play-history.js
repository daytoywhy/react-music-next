import { useSelector,useDispatch } from 'react-redux'
import { PLAY_KEY } from '@/assets/js/constant'
import { save } from '@/assets/js/array-store'

export default function usePlayHistory() {
  const dispatch = useDispatch()

  const maxLen = 200

  function savePlay(song) {
    const songs = save(song, PLAY_KEY, (item) => {
      return item.id === song.id
    }, maxLen)
    dispatch(setPlayHistory(songs))
  }

  return {
    savePlay
  }
}
