import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Register
  const register = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5002/api/auth/register", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      setAuthError(null);
      return response.data; // Allow redirect after
    } catch (error) {
      setAuthError(error.response?.data?.message || "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5002/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      setAuthError(null);
      return response.data;
    } catch (error) {
      setAuthError(error.response?.data?.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout, authError, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
