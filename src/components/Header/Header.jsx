import React, { useEffect } from 'react';

import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import themeSlice from '../../redux/themeSlice';

const Header = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.theme);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  return (
    <header>
      <div className="logoBx">
        <h2>Invocee</h2>
      </div>
      {/* dark light mode */}
      <div className="theme-toggler" onClick={() => dispatch(themeSlice.actions.toggleTheme())}>
        {isDarkTheme ? <i class="fa-solid fa-sun"></i> : <i class="fa-solid fa-moon"></i>}
      </div>
    </header>
  )
}

export default Header;