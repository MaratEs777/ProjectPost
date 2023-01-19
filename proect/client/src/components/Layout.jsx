import React from 'react'
import NavBar from './NavBar'

const Layout = ({children}) => {
  return (
    <React.Fragment>
      <div  className='container mx-auto'>
        <NavBar/>
        {children}
      </div>
    </React.Fragment>
  )
}

export default Layout
