import React, { useContext } from 'react';
import { UserContext } from '../App';

function Profile() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>First Name: {user.details.first_name}</p>
      <p>Second Name: {user.details.second_name}</p>
      <p>Email: {user.details.email}</p>
      <p>Phone Number: {user.details.phone_number}</p>
      <p>Position: {user.details.position}</p>
    </div>
  );
}

export default Profile;