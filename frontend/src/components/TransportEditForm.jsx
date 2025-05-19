import { useState, useContext } from "react";
import { TransportContext } from "../context/TransportContext";
import "./TransportEditForm.css";

const TransportEditForm = ({ transport, toggleEditing }) => {
  const { updateTransport } = useContext(TransportContext);
  const [editedName, setEditedName] = useState(transport.name);
  const [editedPickup, setEditedPickup] = useState(transport.pickup);
  const [editedDropoff, setEditedDropoff] = useState(transport.dropoff);
  const [editedPickupTime, setEditedPickupTime] = useState(transport.pickupTime);
  const [editedDropoffTime, setEditedDropoffTime] = useState(transport.dropoffTime);
  const [consent, setConsent] = useState(transport.consent);
  const [dnar, setDnar] = useState(transport.dnar);
  const [respectForm, setRespectForm] = useState(transport.respectForm);
  const [bariatric, setBariatric] = useState(transport.bariatric);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      name: editedName,
      pickup: editedPickup,
      dropoff: editedDropoff,
      pickupTime: editedPickupTime,
      dropoffTime: editedDropoffTime,
      consent,
      dnar,
      respectForm,
      bariatric,
    };

    updateTransport(transport.id, updatedData);
    toggleEditing();
  };

  return (
    <form className="edit-form" onSubmit={handleUpdate}>
      <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
      <input type="text" value={editedPickup} onChange={(e) => setEditedPickup(e.target.value)} />
      <input type="text" value={editedDropoff} onChange={(e) => setEditedDropoff(e.target.value)} />
      <input type="datetime-local" value={editedPickupTime} onChange={(e) => setEditedPickupTime(e.target.value)} />
      <input type="datetime-local" value={editedDropoffTime} onChange={(e) => setEditedDropoffTime(e.target.value)} />

      <div className="toggle-group">
        <label>Consent:</label>
        <div className="toggle-btn">
          <div className={`option ${consent === "yes" ? "active" : ""}`} onClick={() => setConsent("yes")}>Yes</div>
          <div className={`option ${consent === "no" ? "active" : ""}`} onClick={() => setConsent("no")}>No</div>
        </div>
      </div>

      <div className="toggle-group">
        <label>DNAR:</label>
        <div className="toggle-btn">
          <div className={`option ${dnar === "yes" ? "active" : ""}`} onClick={() => setDnar("yes")}>Yes</div>
          <div className={`option ${dnar === "no" ? "active" : ""}`} onClick={() => setDnar("no")}>No</div>
        </div>
      </div>

      <div className="toggle-group">
        <label>Respect Form:</label>
        <div className="toggle-btn">
          <div className={`option ${respectForm === "yes" ? "active" : ""}`} onClick={() => setRespectForm("yes")}>Yes</div>
          <div className={`option ${respectForm === "no" ? "active" : ""}`} onClick={() => setRespectForm("no")}>No</div>
        </div>
      </div>

      <div className="toggle-group">
        <label>Bariatric:</label>
        <div className="toggle-btn">
          <div className={`option ${bariatric === "yes" ? "active" : ""}`} onClick={() => setBariatric("yes")}>Yes</div>
          <div className={`option ${bariatric === "no" ? "active" : ""}`} onClick={() => setBariatric("no")}>No</div>
        </div>
      </div>

      <div className="actions">
        <button type="submit" className="edit-button">Save</button>
        <button type="button" className="cancel-button" onClick={toggleEditing}>Cancel</button>
      </div>
    </form>
  );
};

export default TransportEditForm;
