import React from 'react';

// App components
import Search from './Search';
import Nav from './Nav';

const Header = props => (
  <div>
    <Search onSearch={props.onSearch} />
    <Nav onNavClick={props.onNavClick} />
  </div>

);

export default Header;
