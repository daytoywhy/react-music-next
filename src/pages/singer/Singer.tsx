import IndexList from '@/components/index-list/IndexList'
import { useState,useEffect } from 'react'
import { getSingerList } from '@/service/singer.js'
import { Outlet,history ,useLocation} from 'umi'
import {  } from 'react-router-dom'
import storage from 'good-storage'
import { CSSTransition,SwitchTransition } from 'react-transition-group'
import './index.scss'
function Singer() {
  const loaction = useLocation()
  const [singers,setSingers] = useState([])
  const [selectedSinger,setSelectedSinger] = useState(null)
  useEffect(()=>{
    (async function fetchSingers(){
      const result = await getSingerList()
      
      setSingers(result.singers)
    })()
  },[])
  const selectSinger = (singer) =>{
    setSelectedSinger(singer)
    storage.session.set('__singer__', singer)
    history.push(`/singer/${singer.mid}`)
    
  }

  
  return (
    <div className="singer">
      <IndexList data={singers} select={selectSinger}></IndexList>
      <SwitchTransition>
      <CSSTransition classNames="fade" timeout={300} key={loaction.key}>
        
        <Outlet data={selectedSinger}/>
      </CSSTransition>
      </SwitchTransition>
     
    </div>
  )
}

export default Singer
