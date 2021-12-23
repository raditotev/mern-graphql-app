import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';

const MainNavigation = () => (
  <header className="main-header">
    <div className="main-header__logo">
      <h1>EasyEvent</h1>
    </div>
    <div className="main-header__items">
      <nav>
        <ul>
          <li>
            <NavLink to="/auth">Authenticate</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default MainNavigation;
