import IndexList from '@/components/index-list/IndexList'
import { useState, useEffect,useRef } from 'react'
import { getSingerList } from '@/service/singer.js'
import { Outlet, history, useLocation, useOutlet } from 'umi'

import storage from 'good-storage'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './index.scss'
function Singer() {
  const nodeRef = useRef(null)
  const location = useLocation()
  const currentOutlet = useOutlet()
  const [singers, setSingers] = useState([])
  const [selectedSinger, setSelectedSinger] = useState(null)
  useEffect(() => {
    ;(async function fetchSingers() {
      const result = await getSingerList()

      setSingers(result.singers)
    })()
  }, [])
  const selectSinger = (singer) => {
    setSelectedSinger(singer)
    storage.session.set('__singer__', singer)
    history.push(`/singer/${singer.mid}`)
  }

  return (
    <div className="singer">
      <IndexList data={singers} select={selectSinger}></IndexList>
      <TransitionGroup>
        <CSSTransition
          classNames="fade"
          timeout={300}
          key={location.pathname}
          unmountOnExit={true}
        >
         <Outlet context={nodeRef} data={selectedSinger} />
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default Singer
