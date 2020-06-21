import React from 'react'
import {Link} from 'react-router-dom'
const NotFound=()=>{
  return(
    <div>
      <h2>找不到该页面</h2>
      <Link to='/home'>回家</Link>
    </div>
  )
}
export default NotFound