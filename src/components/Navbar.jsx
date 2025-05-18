import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="link">Home</Link>
      <Link to="/dashboard" className="link">Dashboard</Link>

      {user ? (
        <>
          <span className="username">Welcome, {user.name}</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login" className="link">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
