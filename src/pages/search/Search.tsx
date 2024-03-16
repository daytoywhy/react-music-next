import './index.scss'
import SearchInput from '@/components/search/SearchInput'
import Suggest from '@/components/search/Suggest'
import Scroll from '@/components/base/scroll/Scroll'
import Confirm from '@/components/base/confirm/Confirm'
import SearchList from '@/components/base/search-list/SearchList'
import { getHotKeys } from '@/service/search'
import { useState, useRef, useEffect } from 'react'
function Search() {
  const searchHistory: any[] = []
  const [query, setQuery] = useState('')
  const [hotKeys, setHotKeys] = useState([])
  const [scroll, setScroll] = useState(null)
  const confirmRef = useRef(null)
  function setValue(e) {
    setQuery(e)
  }

  useEffect(() => {
    getHotKeys().then((result) => {
      setHotKeys(result.hotKeys)
    })
  }, [])
  useEffect(() => {
    scroll && scroll.refresh()
  }, [query])
  const getScroll = (scrollValue) => {
    setScroll(scrollValue)
  }
  const clearSearch = () => {}
  const showConfirm = () => {}
  return (
    <div className="search">
      <div className="search-input-wrapper">
        <SearchInput
          modelValue={query}
          updateModelValue={setValue}
        ></SearchInput>
      </div>
      {
        !query ?       <Scroll
        getScroll={getScroll}
        className="search-content"
      >
        <div>
          <div className="hot-keys">
            <h1 className="title">热门搜索</h1>
            <ul>
              {hotKeys.map((item) => (
                <li
                  className="item"
                  key={item.id}
                  onClick={() => setValue(item.key)}
                >
                  <span>{item.key}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="search-history"
            style={{ display: searchHistory.length ? '' : 'none' }}
          >
            <h1 className="title">
              <span className="text">搜索历史</span>
              <span className="clear" onClick={showConfirm}>
                <i className="icon-clear"></i>
              </span>
            </h1>
            <Confirm
              childRef={confirmRef}
              text="是否清空所有搜索历史"
              confirm-btn-text="清空"
              onConfirm={clearSearch}
            ></Confirm>
            <SearchList searches={searchHistory}></SearchList>
          </div>
        </div>
      </Scroll> : ''
      }

      <div
        className="search-result"
        style={{
          display: query ? '' : 'none',
        }}
      >
        <Suggest
          query={query}
          selectSong="selectSong"
          selectSinger="selectSinger"
        ></Suggest>
      </div>
    </div>
  )
}

export default Search
