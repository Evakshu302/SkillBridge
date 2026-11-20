import { useState } from 'react';
import { AuthContext } from './authContext';

const readStorage = () => {
  const token = localStorage.getItem('sb_token');
  const raw = localStorage.getItem('sb_user');
  const user = raw ? JSON.parse(raw) : null;
  return { user, token };
};

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(() => ({ ...readStorage(), loading: false }));

  const login = (userData, userToken) => {
    localStorage.setItem('sb_token', userToken);
    localStorage.setItem('sb_user', JSON.stringify(userData));
    setState({ user: userData, token: userToken, loading: false });
  };

  const logout = () => {
    localStorage.removeItem('sb_token');
    localStorage.removeItem('sb_user');
    setState({ user: null, token: null, loading: false });
  };

  const updateUser = (userData) => {
    localStorage.setItem('sb_user', JSON.stringify(userData));
    setState((prev) => ({ ...prev, user: userData }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
