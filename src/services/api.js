const API_URL = 'http://localhost:8080/api';

const api = {
  login: async (username, password) => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      // Сохраняем ID пользователя и токен
      localStorage.setItem('user_id', data.id);
      localStorage.setItem('auth_token', data.token);
      return data.token;
    } else {
      throw new Error(data.message || 'Invalid username or password');
    }
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    return data;
  },

  getUser: async () => {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('auth_token');
    if (!userId || !token) {
      throw new Error('User ID or token not found');
    }

    const response = await fetch(`${API_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Failed to fetch user data');
    }
  },

  // Добавьте другие методы API здесь
};

export default api;