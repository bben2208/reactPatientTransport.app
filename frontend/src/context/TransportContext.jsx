import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const TransportContext = createContext();

export const TransportProvider = ({ children }) => {
  const [transports, setTransports] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTransports = async () => {
      if (!user?._id) return;

      try {
        const response = await axios.get(`http://localhost:5002/api/transports?user=${user._id}`);
        setTransports(response.data);
        console.log("Fetched transports:", response.data);
      } catch (err) {
        console.error("Failed to load transports:", err);
      }
    };

    fetchTransports();
  }, [user]);

  const addTransport = async (transportData) => {
    try {
      const response = await axios.post("http://localhost:5002/api/transports", transportData);
      const savedTransport = response.data;
      setTransports((prev) => [...prev, savedTransport]);
      console.log("Saved transport:", savedTransport);
    } catch (err) {
      console.error("Failed to save transport:", err);
    }
  };

  const updateTransport = (id, updatedData) => {
    setTransports((prev) =>
      prev.map((transport) =>
        transport._id === id ? { ...transport, ...updatedData } : transport
      )
    );
  };

  const removeTransport = (id) => {
    setTransports((prev) =>
      prev.filter((transport) => transport._id !== id)
    );
  };

  return (
    <TransportContext.Provider
      value={{
        transports,
        setTransports,
        addTransport,
        updateTransport,
        removeTransport,
      }}
    >
      {children}
    </TransportContext.Provider>
  );
};
