import React from 'react'
import { Navigate ,Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div>
      Page Not Found
      <Link className='mt-2 d-block' to='/'>  Return to DashBoard</Link>
    </div>
  )
}

export default PageNotFound
