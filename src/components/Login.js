import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [jsonRequest, setJsonRequest] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отображаем JSON-запрос перед отправкой
      const loginData = {
        username,
        password,
      };
      setJsonRequest(JSON.stringify(loginData, null, 2));

      const token = await api.login(username, password);
      onLogin(token);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      {errorMessage && <div className="message error">{errorMessage}</div>}
      <p>Don't have an account? <a href="/register">Register</a></p>

      {}
      <div className="json-request">
        <h3>JSON Request</h3>
        <pre>{jsonRequest}</pre>
      </div>
    </div>
  );
}

export default Login;