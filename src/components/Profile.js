// components/Profile.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: '',
    password: '',
    details: {
      first_name: '',
      second_name: '',
      email: '',
      phone_number: '',
      position: '',
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getUserProfile(token);
        setUser(response);
        setEditedUser({
          username: response.username,
          password: '',
          details: {
            first_name: response.details.first_name,
            second_name: response.details.second_name,
            email: response.details.email,
            phone_number: response.details.phone_number,
            position: response.details.position,
          },
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Перенаправление на страницу входа после выхода
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await updateUserProfile(token, editedUser); // Убедитесь, что editedUser - это объект JSON
      setUser(response);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('details.')) {
      const detailName = name.split('.')[1];
      setEditedUser((prev) => ({
        ...prev,
        details: {
          ...prev.details,
          [detailName]: value,
        },
      }));
    } else {
      setEditedUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (error) {
    return <div className="container mt-5 text-center text-danger">{error}</div>;
  }

  if (!user) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">User Profile</h2>
            </div>
            <div className="card-body">
              {isEditing ? (
                <form>
                  <div className="form-group">
                    <label>Username:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={editedUser.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={editedUser.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="details.first_name"
                      value={editedUser.details.first_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Second Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="details.second_name"
                      value={editedUser.details.second_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      name="details.email"
                      value={editedUser.details.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="details.phone_number"
                      value={editedUser.details.phone_number}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Position:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="details.position"
                      value={editedUser.details.position}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="button" className="btn btn-primary mr-3" onClick={handleSave}>Save</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
              ) : (
                <>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>First Name:</strong> {user.details.first_name}</p>
                  <p><strong>Second Name:</strong> {user.details.second_name}</p>
                  <p><strong>Email:</strong> {user.details.email}</p>
                  <p><strong>Phone Number:</strong> {user.details.phone_number}</p>
                  <p><strong>Position:</strong> {user.details.position}</p>
                  <div className="text-center mt-3">
                    <button className="btn btn-primary mr-3" onClick={handleEdit}>Edit</button>
                    <Link to="/dashboard" className="btn btn-secondary mr-3">Go to Dashboard</Link>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;