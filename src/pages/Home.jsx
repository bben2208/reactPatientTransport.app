import TransportForm from "../components/TransportForm";
import TransportList from "../components/TransportList";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Patient Transport App</h1>
      <TransportForm />
      <TransportList />
      <Link to="/dashboard" className="dashboard-link">Go to Dashboard</Link>
    </div>
  );
};

export default Home;
