import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
   
      {/* <Link to="/dashboard" className="link">Dashboard</Link> */}

      {user ? (
        <>
          <span className="username">Welcome, {user.username}</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          {/* <Link to="/login" className="link">Login</Link>
          <Link to="/register" className="link">Register</Link> */}
        </>
      )}
    </nav>
  );
};

export default Navbar;
