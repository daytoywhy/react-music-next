import { NavLink} from 'umi'
import './index.scss'
import { useMemo} from 'react'

function Tab (){
  const tabs = useMemo(()=>{
    return [
      {
        name: '推荐',
        path: '/recommend'
      },
      {
        name: '歌手',
        path: '/singer'
      },
      {
        name: '排行',
        path: '/top-list'
      },
      {
        name: '搜索',
        path: '/search'
      }
    ]
  },[])
  return   <div className="tab">
    { tabs.map(item => <NavLink key={item.path} className="tabItem" to={item.path}>
      <span className="tabLink">{item.name}</span>
    </NavLink>)}
      
    </div>
}

export default Tab