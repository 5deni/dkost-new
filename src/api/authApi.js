import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/auth';

export const register = async (userData) => {
  const res = await axios.post(`${API_BASE}/register`, userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await axios.post(`${API_BASE}/login`, credentials);
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await axios.post(`${API_BASE}/forgot-password`, { email });
  return res.data;
};

export const resetPassword = async (resetToken, newPassword, email) => {
  const res = await axios.put(`${API_BASE}/reset-password/${resetToken}`, {
    newPassword,
    email
  });
  return res.data;
};

export const getMe = async (token) => {
  const res = await axios.get(`${API_BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
