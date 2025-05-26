import { useState, useContext } from "react";
import { TransportContext } from "../context/TransportContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./TransportForm.css";

const TransportForm = () => {
  const { addTransport } = useContext(TransportContext);
  const { user } = useContext(AuthContext); // ✅ get current user
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobility, setMobility] = useState("own chair");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupMileage, setPickupMileage] = useState("");
  const [dropoffMileage, setDropoffMileage] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [consent, setConsent] = useState("yes");
  const [dnar, setDnar] = useState("yes");
  const [respectForm, setRespectForm] = useState("yes");
  const [bariatric, setBariatric] = useState("yes");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransport = {
      name,
      mobility,
      pickup,
      dropoff,
      pickupTime,
      dropoffTime,
      pickupMileage: parseFloat(pickupMileage) || 0,
      dropoffMileage: parseFloat(dropoffMileage) || 0,
      consent,
      dnar,
      respectForm,
      bariatric,
      user: user?._id || user?.id || user?.username || "unknown", // ✅ FOR SURE
      id: crypto.randomUUID(),
    };
    
    console.log("Submitting transport for user:", newTransport.user);
    addTransport(newTransport);
    
    // Reset form
    setName("");
    setPickup("");
    setDropoff("");
    setPickupMileage("");
    setDropoffMileage("");
    setPickupTime("");
    setDropoffTime("");
    setConsent("yes");
    setDnar("yes");
    setRespectForm("yes");
    setBariatric("yes");

    navigate("/dashboard");
  };

  const toggleOption = (setter, value) => {
    setter(value);
  };

  return (
    <div className="form-container">
      <h1>Create Transport</h1>
      <button onClick={() => navigate("/dashboard")} className="back-button">
        ← Back to Dashboard
      </button>
      <form className="transport-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Mobility Type:</label>
          <select value={mobility} onChange={(e) => setMobility(e.target.value)}>
            <option value="own chair">Own Chair</option>
            <option value="str">Stretcher</option>
            <option value="walker">Walker</option>
            <option value="none">None</option>
          </select>
        </div>

        {["Consent", "DNAR", "Respect Form", "Bariatric"].map((label, index) => {
          const stateSetters = [setConsent, setDnar, setRespectForm, setBariatric];
          const stateValues = [consent, dnar, respectForm, bariatric];

          return (
            <div className="form-group toggle-group" key={label}>
              <label>{label}:</label>
              <div className="toggle-btn">
                <div
                  className={`option yes ${stateValues[index] === "yes" ? "active" : ""}`}
                  onClick={() => toggleOption(stateSetters[index], "yes")}
                >
                  Y
                </div>
                <div
                  className={`option no ${stateValues[index] === "no" ? "active" : ""}`}
                  onClick={() => toggleOption(stateSetters[index], "no")}
                >
                  N
                </div>
              </div>
            </div>
          );
        })}

        <div className="form-group">
          <label>Pickup Address:</label>
          <input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Dropoff Address:</label>
          <input type="text" value={dropoff} onChange={(e) => setDropoff(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Pickup Mileage:</label>
          <input type="number" value={pickupMileage} onChange={(e) => setPickupMileage(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Dropoff Mileage:</label>
          <input type="number" value={dropoffMileage} onChange={(e) => setDropoffMileage(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Pickup Time:</label>
          <input type="datetime-local" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Dropoff Time:</label>
          <input type="datetime-local" value={dropoffTime} onChange={(e) => setDropoffTime(e.target.value)} required />
        </div>

        <button type="submit" className="submit-btn">Create Transport</button>
      </form>
    </div>
  );
};

export default TransportForm;
