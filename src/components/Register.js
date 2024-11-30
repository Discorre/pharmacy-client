import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    details: {
      first_name: '',
      second_name: '',
      email: '',
      phone_number: '',
      position: 'Developer',
    },
  });
  const [message, setMessage] = useState('');
  const [jsonRequest, setJsonRequest] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('details.')) {
      const detailName = name.split('.')[1];
      setUserData({
        ...userData,
        details: {
          ...userData.details,
          [detailName]: value,
        },
      });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отображаем JSON-запрос перед отправкой
      setJsonRequest(JSON.stringify(userData, null, 2));

      await api.register(userData);
      navigate('/login');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" value={userData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={userData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" name="details.first_name" value={userData.details.first_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Second Name</label>
          <input type="text" name="details.second_name" value={userData.details.second_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="details.email" value={userData.details.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="details.phone_number" value={userData.details.phone_number} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Position</label>
          <select name="details.position" value={userData.details.position} onChange={handleChange} required>
            <option value="Developer">Developer</option>
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
          </select>
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
      {message && <div className="message error">{message}</div>}
      <p>Already have an account? <a href="/login">Login</a></p>

      {/* Отображение JSON-запроса */}
      <div className="json-request">
        <h3>JSON Request</h3>
        <pre>{jsonRequest}</pre>
      </div>
    </div>
  );
}

export default Register;