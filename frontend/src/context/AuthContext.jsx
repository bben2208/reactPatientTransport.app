import { createContext, useState } from "react";
import axios from "axios";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Register User
  const register = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/auth/register", { username, password });
      setUser(response.data.user);
      setAuthError(null);
    } catch (error) {
      setAuthError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Login User
  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", { username, password });
      setUser(response.data.user);
      setAuthError(null);
    } catch (error) {
      setAuthError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout User
  const logout = () => {
    setUser(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, authError, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
