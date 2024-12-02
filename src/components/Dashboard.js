// components/Dashboard.js
import React from 'react';
import { Link } from'react-router-dom';

const Dashboard = ({ onLogout }) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Dashboard</h2>
            </div>
            <div className="card-body">
              <p>Welcome to your dashboard!</p>
              <Link to="/profile" className="btn btn-primary mr-3">Go to Profile</Link>
              <button className="btn btn-danger" onClick={onLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;