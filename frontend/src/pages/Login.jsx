// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/auth.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', { username, password });
      console.log(response.data);
      setMessage('Login successful');
    } catch (err) {
      setMessage('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      {message && <div className="error-message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
      </form>
      <a href="/register" className="register-button">Register</a>
      </div>
  );
}