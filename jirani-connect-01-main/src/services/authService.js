import api from '../api.js';

// Register a new user
export const registerUser = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};

// Log in an existing user
export const loginUser = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

// Get logged-in user profile (with token)
export const getMe = async (token) => {
  const res = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
