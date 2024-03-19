import { useState, useEffect, useRef } from 'react'
import { getRecommend } from '@/service/recommend'
import { ALBUM_KEY } from '@/assets/js/constant'
import { history,Outlet,useLocation } from 'umi'
import styles from  './index.scss'
import storage from 'good-storage'
import Scroll from '@/components/base/scroll/Scroll'
import Slider from '@/components/base/slider/Slider'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
function Recommend() {
  const location = useLocation()
  const [albums, setAlbums] = useState([])
  const [sliders, setSliders] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  useEffect(() => {
    (async function fetchRecommend(){
      let result = await getRecommend()
      setAlbums(result.albums)
      setSliders(result.sliders)
    })()
    
  }, [])

  const selectItem = (album) => {
    setSelectedAlbum(album)
    storage.session.set(ALBUM_KEY, album)
    history.push(`/recommend/${album.id}`)
  }

  return (
    <div className={styles.recommend}>
      <Scroll className={styles.recommendContent}>
        <div >
          <div className={styles.sliderWrapper}>
            <div className={styles.sliderContent}>
              {sliders.length ? <Slider slidersList={sliders}></Slider> : ''}
            </div>
          </div>
          <div className={styles.recommendList}>
            <h1 className={styles.listTitle}>
              热门歌单推荐
            </h1>
            <ul>
              {albums.map((item, index) => (
                <li
                  className={styles.item}
                  key={item.id}
                  onClick={() => selectItem(item)}
                >
                  <div className={styles.icon}>
                    <img width="60" height="60" src={item.pic} />
                  </div>
                  <div className={styles.text}>
                    <h2 className={styles.name}>{item.username}</h2>
                    <p className={styles.title}>{item.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Scroll>
      <SwitchTransition>
        <CSSTransition
          classNames="fade"
          timeout={300}
          key={location.pathname}
          unmountOnExit={true}
        >
         <Outlet data={selectedAlbum}/>
        </CSSTransition>
      </SwitchTransition>
      
    </div>
  )
}

export default Recommend
