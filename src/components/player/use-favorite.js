import { useDispatch,useSelector } from 'react-redux'
import { useMemo } from 'react'
import { save, remove } from '@/assets/js/array-store'
import { FAVORITE_KEY } from '@/assets/js/constant'

export default function useFavorite() {
  const { favoriteList} = useSelector((state) => state.app)
  const maxLen = 100

  function getFavoriteIcon(song) {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }

  function toggleFavorite(song) {
    let list
    if (isFavorite(song)) {
      list = remove(FAVORITE_KEY, compare)
    } else {
      list = save(song, FAVORITE_KEY, compare, maxLen)
    }
    store.commit('setFavoriteList', list)

    function compare(item) {
      return item.id === song.id
    }
  }

  function isFavorite(song) {
    return (
      favoriteList.findIndex((item) => {
        return item.id === song.id
      }) > -1
    )
  }

  return {
    getFavoriteIcon,
    toggleFavorite
  }
}
