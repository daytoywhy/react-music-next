import { useState, useEffect, useRef } from 'react'
import { getRecommend } from '@/service/recommend'
import styles from  './index.scss'

import Scroll from '@/components/base/scroll/Scroll'
import Slider from '@/components/base/slider/Slider'
function Recommend() {
  const scrollRef = useRef(null)
  const [albums, setAlbums] = useState([])
  const [sliders, setSliders] = useState([])
  useEffect(() => {
    (async function fetchRecommend(){
      let result = await getRecommend()
      setAlbums(result.albums)
      setSliders(result.sliders)
    })()
    
  }, [])

  const selectItem = () => {}

  return (
    <div className={styles.recommend}>
      <Scroll className={styles.recommendContent} ref={scrollRef}>
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
    </div>
  )
}

export default Recommend
