import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <Link to="/" className="home-link">Back to Home</Link>
    </div>
  );
};

export default NotFound;
