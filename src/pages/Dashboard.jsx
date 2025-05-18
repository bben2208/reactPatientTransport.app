import { useContext, useState } from "react";
import { TransportContext } from "../context/TransportContext";
import { AuthContext } from "../context/AuthContext";
import TransportItem from "../components/TransportItem";
import "./Dashboard.css";

const Dashboard = () => {
  const { transports, feedback } = useContext(TransportContext);
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  const userTransports = transports.filter((t) => t.user === user?.name);

  const filteredTransports = userTransports.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {feedback && (
        <div className="feedback-container">
          <p className="feedback-message">{feedback}</p>
        </div>
      )}

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
            <TransportItem key={transport.id} transport={transport} />
          ))}
        </div>
      ) : (
        <p className="no-transports-message">No transports found for "{searchTerm}".</p>
      )}
    </div>
  );
};

export default Dashboard;
