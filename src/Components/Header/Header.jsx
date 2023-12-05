import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className='w-100 px-5 py-4 d-flex'>
      <img
        src='https://cdn.dribbble.com/users/2224455/screenshots/4433127/talk.gif'
        height='70'
        alt=''
        loading='lazy'
        className='pb-1 pe-1'
      />
      <h1>MernChat</h1>
    </div>
  )
}

export default Header