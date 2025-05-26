import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login, authError } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending login data:", { username, password });

    try {
      await login(username, password);
      setMessage("Login successful ✅");
      navigate('/dashboard');
    } catch (err) {
      console.error("Login failed:", err);
      setMessage("Login failed ❌");
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome to Patient Transport</h1> {/* ✅ moved here */}
      <h2>Login</h2>
      
      {message && <div className="message-box">{message}</div>}
      {authError && <div className="error-message">{authError}</div>}
      
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <Link to="/register" className="register-button">Register</Link>
    </div>
  );
}
