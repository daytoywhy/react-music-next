import './index.scss'
import Scroll from '@/components/base/scroll/Scroll'
import { useState,useEffect } from 'react'
import { getTopList } from '@/service/top-list'
function Rank() {
  const [topList, setTopList] = useState([])
  useEffect(()=>{
    (async function (){
      const result = await getTopList()
      setTopList(result.topList)
    })()
  },[])
  return (
    <div className="top-list">
      <Scroll className="top-list-content">
        <ul>
          {topList.map((item, index) => (
            <li className="item" key={item.id}>
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
    </div>
  )
}

export default Rank
