import { createContext, useState } from "react";
import { registerUser, loginUser } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  const register = async (username, password) => {
    try {
      const newUser = await registerUser(username, password);
      setUser(newUser);
      setAuthError(null);
    } catch (error) {
      setAuthError(error.response?.data?.error || "Registration failed");
    }
  };

  const login = async (username, password) => {
    try {
      const loggedInUser = await loginUser(username, password);
      setUser(loggedInUser);
      setAuthError(null);
    } catch (error) {
      setAuthError(error.response?.data?.error || "Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, authError }}>
      {children}
    </AuthContext.Provider>
  );
};
