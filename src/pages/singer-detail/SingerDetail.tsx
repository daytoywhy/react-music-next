import { useMemo, useEffect, useState } from 'react'
import MusicList from '@/components/music-list/MusicList'
import storage from 'good-storage'
import { useParams, useMatch } from 'umi'
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import './index.scss'
export default function SingerDetail(props) {
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
      const cached = storage.session.get('__singer__')
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
      const result = await getSingerDetail(data)
      const songsResult = await processSongs(result.songs)
      setSongs(songsResult)
    })()
  }, [])
  return (
    <div className="singer-detail">
      <MusicList
        title={title}
        pic={pic}
        songs={songs}
        loading={loading}
      ></MusicList>
    </div>
  )
}
