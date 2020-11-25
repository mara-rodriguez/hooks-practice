import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext';

function Header() {
  const {darkMode, setDarkMode} = useContext(ThemeContext);
  const handleClick = () => {
      setDarkMode(!darkMode);
  }

  return (
      <div className="Header" >
          <h1>React Hooks</h1>
          <button type="button" onClick={handleClick}>{darkMode ? 'Dark Mode' : 'Light Mode'}</button>

      </div>
  )
}

export default Header
