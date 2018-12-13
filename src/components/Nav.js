// A Nav component for the navigation menu

import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => (

  <div>
    <nav className="main-nav">
      <ul>
        <li onClick={props.onNavClick}><NavLink exact to='/rain'>Rain</NavLink></li>
        <li onClick={props.onNavClick}><NavLink exact to='/cats'>Cats</NavLink></li>
        <li onClick={props.onNavClick}><NavLink exact to='/dogs'>Dogs</NavLink></li>
      </ul>
    </nav>

  </div>

);

export default Nav;
