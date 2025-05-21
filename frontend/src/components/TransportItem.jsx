import { useContext, useState } from "react";
import TransportEditForm from "./TransportEditForm"; // if using edit functionality
import { TransportContext } from "../context/TransportContext";
import "./TransportItem.css";

const TransportItem = ({ transport }) => {
  const { removeTransport } = useContext(TransportContext);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    removeTransport(transport._id); // assumes MongoDB _id
  };

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDuration = () => {
    if (!transport.pickupTime || !transport.dropoffTime) return "n/a";
    const start = new Date(transport.pickupTime);
    const end = new Date(transport.dropoffTime);
    const diff = Math.round((end - start) / 60000); // minutes
    return `${diff} mins`;
  };

  const getTotalMileage = () => {
    const { pickupMileage, dropoffMileage } = transport;
    if (pickupMileage != null && dropoffMileage != null) {
      return `${dropoffMileage - pickupMileage} miles`;
    }
    return "n/a";
  };

  return (
    <div className="transport-item">
      {isEditing ? (
        <TransportEditForm transport={transport} toggleEditing={toggleEditing} />
      ) : (
        <>
          <h3>{transport.name}</h3>
          <p>Mobility: {transport.mobility}</p>
          <p>Pickup: {transport.pickup}</p>
          <p>Dropoff: {transport.dropoff}</p>
          <p>Consent: {transport.consent}</p>
          <p>DNAR: {transport.dnar}</p>
          <p>Respect Form: {transport.respectForm}</p>
          <p>Bariatric: {transport.bariatric}</p>
          <p>Pickup Time: {formatDateTime(transport.pickupTime)}</p>
          <p>Dropoff Time: {formatDateTime(transport.dropoffTime)}</p>
          <p>Duration: {getDuration()}</p>
          <p>Total Mileage: {getTotalMileage()}</p>

          <div className="actions">
            <button className="edit-button" onClick={toggleEditing}>Edit</button>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransportItem;
