import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

let expirationTimer;

const AuthContextProvider: React.FC = ({ children }) => {
  const isLoggedIn = !!token;

  const login = (token, uid, expiration) => {
    setToken(token);
    setUserId(uid);
    const expirationTime = new Date().getTime() + expiration * 60 * 60 * 1000;
    localStorage.setItem('__easy_event__token__', token);
    localStorage.setItem('__easy_event__uid__', uid);
    localStorage.setItem('__easy_event___expiration_time__', expirationTime);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('__easy_event__token__');
    localStorage.removeItem('__easy_event__uid__');
    localStorage.removeItem('__easy_event___expiration_time__');
  };

  useEffect(() => {
    const token = localStorage.getItem('__easy_event__token__');
    if (!token) {
      return;
    }
    const uid = localStorage.getItem('__easy_event__uid__');
    const expirationTime = localStorage.getItem(
      '__easy_event___expiration_time__'
    );
    const remainingTime = expirationTime - new Date().getTime();

    if (remainingTime < 10000) {
      logout();
    }
    expirationTimer = setTimeout(logout, remainingTime);

    setToken(token);
    setUserId(uid);

    return () => {
      clearTimeout(expirationTimer);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
