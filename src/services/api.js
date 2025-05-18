import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Register User
export const registerUser = async (username, password) => {
  try {
    const response = await api.post("/auth/register", { username, password });
    return response.data;
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error;
  }
};

// Login User
export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch Transports
export const fetchTransports = async () => {
  try {
    const response = await api.get("/transports");
    return response.data;
  } catch (error) {
    console.error("Fetch Transports Error:", error.response?.data || error.message);
    throw error;
  }
};

// Add Transport
export const addTransport = async (transportData) => {
  try {
    const response = await api.post("/transports", transportData);
    return response.data;
  } catch (error) {
    console.error("Add Transport Error:", error.response?.data || error.message);
    throw error;
  }
};

// Delete Transport
export const deleteTransport = async (id) => {
  try {
    const response = await api.delete(`/transports/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete Transport Error:", error.response?.data || error.message);
    throw error;
  }
};

// Update Transport
export const updateTransport = async (id, transportData) => {
  try {
    const response = await api.put(`/transports/${id}`, transportData);
    return response.data;
  } catch (error) {
    console.error("Update Transport Error:", error.response?.data || error.message);
    throw error;
  }
};

export default api;
