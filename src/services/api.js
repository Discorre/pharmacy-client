// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Invalid username or password');
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
};

export const updateUserProfile = async (token, userData) => {
  try {
    const response = await axios.put(
      `${API_URL}/user/details`,
      userData, // Убедитесь, что userData - это объект JSON
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Убедитесь, что Content-Type установлен в application/json
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user profile');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};