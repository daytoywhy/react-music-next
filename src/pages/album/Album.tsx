import MusicList from "@/components/music-list/MusicList"
import { useState,useMemo,useEffect } from 'react'
import { getAlbum } from '@/service/recommend'
import { ALBUM_KEY } from '@/assets/js/constant'
import { processSongs } from '@/service/song'
import { useMatch,useParams} from 'umi'
import storage from 'good-storage'
import './index.scss'
export default function Album(props){
  const match = useMatch('/singer/:id')
  const params = useParams()
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const computedData = useMemo(() => {
    let ret = null
    const data = props.data
    if (data) {
      ret = data
    } else {
      const cached = storage.session.get(ALBUM_KEY)
      if (cached && (cached.mid || cached.id + '') === params.id) {
        ret = cached
      }
    }
    return ret
  }, [props.data])
  const title = useMemo(() => {
    const data = computedData
    return data && (data.name || data.title)
  }, [computedData])
  const pic = useMemo(() => {
    const data = computedData
    return data && data.pic
  }, [computedData])
  useEffect(() => {
    const data = computedData
    if (!data) {
      return
    }
    ;(async function () {
      const result = await getAlbum(data)
      const songsResult = await processSongs(result?.songs)
      setSongs(songsResult)
    })()
  }, [])
  return (
    <div className="album">
    <MusicList
      songs={songs}
      title={title}
      pic={pic}
      loading={loading}
    ></MusicList>
  </div>
  )
}