import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { register, authError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registering with:", { username, password });

    try {
      await register(username, password);
      setMessage("Registration successful ✅");
      navigate('/dashboard');
    } catch (err) {
      console.error("Registration failed:", err);
      setMessage("Registration failed ❌");
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <p>Your username must be unique, and your password should be at least 8 characters long.</p>
      {message && (
        <div className={`message-box ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      {authError && <div className="error-message">{authError}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a id='loginButton' href="/login">Login here</a>.</p>
    </div>
  );
}
