import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => (

  <div>
    <nav className="main-nav">
      <ul>
        <li onClick={props.onNavClick}><NavLink to='/nav/rain'>Rain</NavLink></li>
        <li onClick={props.onNavClick}><NavLink to='/nav/cats'>Cats</NavLink></li>
        <li onClick={props.onNavClick}><NavLink to='/nav/dogs'>Dogs</NavLink></li>
      </ul>
    </nav>

  </div>

);

export default Nav;
