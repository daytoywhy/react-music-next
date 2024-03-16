import './index.scss'
export default function Loading(props) {
  const imgSrc = require('./loading.gif')
  return (
    <div className="loading">
      <div className="loading-content">
        <img width="24" height="24" src={imgSrc} />
        <p className="desc">{props.title ? props.title : '正在加载...'}</p>
      </div>
    </div>
  )
}
