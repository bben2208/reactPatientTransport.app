// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/auth.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5002/api/auth/register', { username, password });
      console.log(response.data);
      setMessage('Registration successful');
    } catch (err) {
      setMessage('Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <p>Your username must be unique, and your password should be at least 8 characters long.</p>
      {message && <div className="error-message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a id='loginButton' href="/login">Login here</a>.</p>
    </div>
  );
}
