import { useContext, useState } from "react";
import { TransportContext } from "../context/TransportContext";
import TransportItem from "../components/TransportItem";
import "./Dashboard.css";

const Dashboard = () => {
  const { transports } = useContext(TransportContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransports = transports.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by patient name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="create-btn">Create a New Transport</button>
      </div>

      {filteredTransports.length > 0 ? (
        <ul className="transport-list">
          {filteredTransports.map((transport) => (
            <TransportItem key={transport.id} transport={transport} />
          ))}
        </ul>
      ) : (
        <p className="no-transports">No transports found. Create one now!</p>
      )}
    </div>
  );
};

export default Dashboard;
