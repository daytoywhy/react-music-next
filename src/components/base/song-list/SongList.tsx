import PropTypes from 'prop-types'
import './index.scss'
export default function SongList(props) {
  const { songs, select, rank } = props
  const selectItem = (song: object, index: number) => {
    select({ song, index })
  }
  const getRankText = (index: number) => {
    if (index > 2) {
      return index + 1
    }
  }
  const getDesc = (song: object) => {
    return `${song.singer}·${song.album}`
  }
  const getRankCls = (index: number) => {
    if (index <= 2) {
      return `icon icon${index}`
    } else {
      return 'text'
    }
  }
  return (
    <ul className="song-list">
      {songs?.map((song, index) => (
        <li
          className="item"
          key={song.id}
          onClick={() => selectItem(song, index)}
        >
          {rank ? (
            <div className="rank">
              <span className={getRankCls(index)}>{getRankText(index)}</span>
            </div>
          ) : (
            ''
          )}

          <div className="content">
            <h2 className="name">{song.name}</h2>
            <p className="desc">{getDesc(song)}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

SongList.defineProps = {
  songs: [],
}
SongList.propTypes = {
  songs: PropTypes.array, // 这里可以设置默认值
}
