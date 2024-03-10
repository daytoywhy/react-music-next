import IndexList from '@/components/index-list/IndexList'
import { useState,useEffect } from 'react'
import { getSingerList } from '@/service/singer.js'
import './index.scss'
function Singer() {
  const [singers,setSingers] = useState([])
  useEffect(()=>{
    (async function fetchSingers(){
      const result = await getSingerList()
      
      setSingers(result.singers)
    })()
  },[])
  return (
    <div className="singer">
      <IndexList data={singers}></IndexList>
    </div>
  )
}

export default Singer
