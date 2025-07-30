import axios from 'axios';

const API_BASE = '/api/admin';

export const getProfile = async (token) => {
  const res = await axios.get(`${API_BASE}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateProfile = async (formData, token) => {
  const res = await axios.put(`${API_BASE}/profile`, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const changePassword = async (passwordData, token) => {
  const res = await axios.put(`${API_BASE}/profile/password`, passwordData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
