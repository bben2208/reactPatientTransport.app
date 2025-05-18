import { useContext, useState } from "react";
import TransportEditForm from "./TransportEditForm";
import "./TransportItem.css";
import { TransportContext } from "../context/TransportContext";

const TransportItem = ({ transport }) => {
  const { removeTransport } = useContext(TransportContext);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    removeTransport(transport.id);
  };

  return (
    <li className="transport-item">
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
          <p>Pickup Time: {transport.pickupTime}</p>
          <p>Dropoff Time: {transport.dropoffTime}</p>
          <p>Duration: {transport.duration} mins</p>
          <p>Total Mileage: {transport.totalMileage} miles</p>

          <div className="actions">
            <button className="edit-button" onClick={toggleEditing}>Edit</button>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
};

export default TransportItem;
