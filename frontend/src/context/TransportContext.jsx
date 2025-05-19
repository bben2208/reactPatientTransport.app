import { createContext, useState, useContext } from "react";

export const TransportContext = createContext();

export const TransportProvider = ({ children }) => {
  const [transports, setTransports] = useState([]);

  const addTransport = (transportData) => {
    setTransports((prev) => [...prev, transportData]);
  };

  const updateTransport = (id, updatedData) => {
    setTransports((prev) =>
      prev.map((transport) =>
        transport.id === id ? { ...transport, ...updatedData } : transport
      )
    );
  };

  const removeTransport = (id) => {
    setTransports((prev) => prev.filter((transport) => transport.id !== id));
  };

  return (
    <TransportContext.Provider value={{ transports, addTransport, updateTransport, removeTransport }}>
      {children}
    </TransportContext.Provider>
  );
};
