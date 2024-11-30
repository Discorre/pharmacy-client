import React, { useContext } from 'react';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';

function Dashboard({ onLogout }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome, {user.username}!</p>
      <div className="button-container">
        <button onClick={onLogout} className="btn logout-btn">Logout</button>
        <Link to="/profile" className="btn profile-btn">View Profile</Link>
      </div>
    </div>
  );
}

export default Dashboard;