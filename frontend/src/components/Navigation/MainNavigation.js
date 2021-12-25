import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/auth-hook';

import './MainNavigation.css';

const MainNavigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className="main-header">
      <div className="main-header__logo">
        <h1>EasyEvent</h1>
      </div>
      <div className="main-header__items">
        <nav>
          <ul>
            {isLoggedIn ? null : (
              <li>
                <NavLink to="/auth">Authenticate</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MainNavigation;
