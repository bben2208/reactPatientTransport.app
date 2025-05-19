import { useContext, useState } from "react";
import { TransportContext } from "../context/TransportContext";
import { AuthContext } from "../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { transports } = useContext(TransportContext);
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  const userTransports = user ? transports.filter((t) => t.user === user.username) : [];

  const filteredTransports = userTransports.filter((t) =>
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
      </div>

      {filteredTransports.length > 0 ? (
        <div className="transport-list">
          {filteredTransports.map((transport) => (
            <div key={transport.id} className="transport-item">
              {transport.name}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-transports">No transports found.</p>
      )}
    </div>
  );
};

export default Dashboard;
