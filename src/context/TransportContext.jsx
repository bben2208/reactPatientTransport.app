import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const TransportContext = createContext();

export const TransportProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [transports, setTransports] = useState([]);

  const calculateMileage = (pickupMileage, dropoffMileage) => {
    const start = parseFloat(pickupMileage);
    const end = parseFloat(dropoffMileage);
    return !isNaN(start) && !isNaN(end) ? Math.abs(end - start) : 0;
  };

  const calculateDuration = (pickupTime, dropoffTime) => {
    if (pickupTime && dropoffTime) {
      const start = new Date(pickupTime);
      const end = new Date(dropoffTime);
      return Math.round((end - start) / 60000);
    }
    return 0;
  };

  const addTransport = (transportData) => {
    const {
      name,
      mobility,
      pickup,
      dropoff,
      pickupMileage,
      dropoffMileage,
      pickupTime,
      dropoffTime,
      consent,
      dnar,
      respectForm,
      bariatric,
    } = transportData;

    const mileage = calculateMileage(pickupMileage, dropoffMileage);
    const duration = calculateDuration(pickupTime, dropoffTime);

    const newTransport = {
      id: Date.now(),
      name,
      mobility,
      pickup,
      dropoff,
      pickupMileage,
      dropoffMileage,
      totalMileage: mileage,
      pickupTime,
      dropoffTime,
      duration,
      consent,
      dnar,
      respectForm,
      bariatric,
    };

    setTransports((prev) => [...prev, newTransport]);
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
