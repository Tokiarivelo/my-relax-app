import React from 'react'
import Logo from './Logo'
import NavSearch from './NavSearch'
import DarkMode from './DarkMode'
import LinkDropDown from './LinksDropDown'

const Navbar = () => {
  return (
    <nav className='border-b'>
      <div className='container flex flex-col sm:flex-row sm:justify-between 
        sm:items-centerflex-wrap gap-4 py-8'>
        <Logo />
        <div className='flex gap-4 items-center'>
          <NavSearch />
          <DarkMode />
          <LinkDropDown />
        </div>
      </div>
    </nav>
  )
}

export default Navbar