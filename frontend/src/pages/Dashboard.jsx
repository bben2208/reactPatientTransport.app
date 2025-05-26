import { useContext, useEffect, useState } from "react";
import { TransportContext } from "../context/TransportContext";
import { AuthContext } from "../context/AuthContext";
import TransportItem from "../components/TransportItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const { transports, setTransports } = useContext(TransportContext);
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch transports once on load for current user
  useEffect(() => {
    const fetchTransports = async () => {
      if (!user?._id) return;

      try {
        const response = await axios.get(
          `http://localhost:5002/api/transports?user=${user._id}`
        );

        setTransports(response.data); // ✅ Set all user’s transports
        console.log("✅ Loaded transports:", response.data);
      } catch (error) {
        console.error("❌ Failed to fetch transports:", error);
      }
    };

    fetchTransports();
  }, [user, setTransports]);

  // ✅ Filter by name
  const filteredTransports = transports.filter((t) =>
    t.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <button
        onClick={() => navigate("/transport-form")}
        className="create-transport-button"
      >
        + Create New Transport
      </button>

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
            <TransportItem key={transport._id} transport={transport} />
          ))}
        </div>
      ) : (
        <p className="no-transports-message">
          No transports found for "{searchTerm}".
        </p>
      )}
    </div>
  );
};

export default Dashboard;
