import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='min-h-screen min-w-screen bg-background flex flex-col justify-center items-center gap-2'>
      <h3 className='text-xl text-accent'>Page not found</h3>
      <h3 className='text-[200px]  font-bold' style={{textShadow:'2px 2px 0 rgba(255, 255, 255, 0.2)'}}>404</h3>
      <h4 className='text-2xl'>Go to the <NavLink to={'/'} className={'border-b-2 border-blue-500'}>Home page</NavLink></h4>
    </div>
  )
}

export default PageNotFound
