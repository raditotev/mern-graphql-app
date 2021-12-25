import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);

  const login = (token, uid, expiration) => {
    setToken(token);
    setUserId(uid);
    setExpirationTime(expiration);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setExpirationTime(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isLoggedIn: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
