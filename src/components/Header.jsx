import React, { useState } from 'react'

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = () => {
    setDarkMode(!darkMode);
  }

  return (
    <div className='Header'>
      <h1>Hooks</h1>
      <button type='button' onClick={handleClick}>{darkMode ? 'DarkMode' : 'LightMode'}</button>
      {/*onClick{() => setDarkMode ? 'darkMode' : 'LightMode'} --tmb se puede pasar la log dentro del button--*/}
    </div>
  )
}

export default Header
