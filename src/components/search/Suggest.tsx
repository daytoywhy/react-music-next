import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { search } from '@/service/search'
import './suggest.scss'
import { processSongs } from '@/service/song'
import useUpPullLoad from './use-up-pull-load'
import { debounce } from 'throttle-debounce'
import Loading from '@/components/base/loading/Loading'

export default function Suggest(props) {
  console.log(props.query,'props');
  
  const [singer, setSinger] = useState(null)
  const [songs, setSongs] = useState([])
  const [manualLoading, setManualLoading] = useState(false)
  let hasMore = true
  let page = 1
  
  const debounceFn = useCallback(
    debounce(300, (callback) => callback()),
    []
  )

  useEffect(() => {
    if (!props.query) return

    debounceFn(() => searchFirst())
  }, [props.query])
  const searchFirst = async () => {
    if (!props.query) {
      return
    }

    page = 1
    setSongs([])
    setSinger(null)
    hasMore = true

    const result = await search(props.query, page, props.showSinger || true)
    let songsResult = await processSongs(result.songs)
    setSongs(songsResult)
    setSinger(result.singer)
    hasMore = result.hasMore
    await makeItScrollable()
  }
  const makeItScrollable = async () => {
    if (scroll.maxScrollY >= -1) {
      setManualLoading(true)
      await searchMore()
      setManualLoading(false)
    }
  }

  const searchMore = async () => {
    if (!hasMore || !props.query) {
      return
    }
    page++
    const result = await search(props.query, page, props.showSinger || true)
    const songsResult = await processSongs(result.songs)
    setSongs((list) => list.concat(songsResult))
    hasMore = result.hasMore
    await makeItScrollable()
  }

  const loading = useMemo(() => {
    return !singer && !songs.length
  }, [singer, songs])
  const preventPullUpLoad = useMemo(() => {
    return loading || manualLoading
  }, [manualLoading, loading])
  
  const { scroll, rootRef, isPullUpLoad } = useUpPullLoad(
    searchMore,
    preventPullUpLoad,
  )
  const pullUpLoading = useMemo(() => {
    return isPullUpLoad && hasMore
  }, [isPullUpLoad, hasMore])
  return (
    <>
      {loading ? <Loading></Loading> : ''}
      <div ref={rootRef} className="suggest">
        <ul className="suggest-list">
          {singer ? (
            <li className="suggest-item">
              <div className="icon">
                <i className="icon-mine"></i>
              </div>
              <div className="name">
                <p className="text">{singer.name}</p>
              </div>
            </li>
          ) : (
            ''
          )}
          {songs.map((song) => (
            <li className="suggest-item" key={song.id}>
              <div className="icon">
                <i className="icon-music"></i>
              </div>
              <div className="name">
                <p className="text">
                  {song.singer}-{song.name}
                </p>
              </div>
            </li>
          ))}
          <div className="suggest-item">{pullUpLoading ? <Loading></Loading> : ''}</div>
        </ul>
      </div>
    </>
  )
}
