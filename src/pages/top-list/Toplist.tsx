import './index.scss'
import Scroll from '@/components/base/scroll/Scroll'
import { useState,useEffect } from 'react'
import { getTopList } from '@/service/top-list'
import { TOP_KEY } from '@/assets/js/constant'
import storage from 'good-storage'
import { history,Outlet } from 'umi'
function Rank() {
  const [topList, setTopList] = useState([])
  const [selectedTop, setSelectedTop] = useState(null)
  useEffect(()=>{
    (async function (){
      const result = await getTopList()
      setTopList(result.topList)
    })()
  },[])
  const selectItem =(top)=>{
    setSelectedTop(top)
    storage.session.set(TOP_KEY, top)
    history.push(`/top-list/${top.id}`)
  }
  return (
    <div className="top-list">
      <Scroll className="top-list-content">
        <ul>
          {topList.map((item, index) => (
            <li className="item" key={item.id} onClick={()=>selectItem(item)}>
              <div className="icon">
                <img width="100" height="100" src={item.pic} />
              </div>
              <ul className="song-list">
                {item.songList.map((song) => (
                  <li className="song" key={song.id}>
                    <span>{index + 1}. </span>
                    <span>
                      {song.songName}-{song.singerName}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Scroll>
      <Outlet data={selectedTop}/>
    </div>
  )
}

export default Rank
