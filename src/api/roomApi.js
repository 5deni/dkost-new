import axios from 'axios';

const API_BASE = '/api/admin/rooms';

export const getRooms = async (token) => {
  const res = await axios.get(API_BASE, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getRoom = async (id, token) => {
  const res = await axios.get(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const createRoom = async (formData, token) => {
  const res = await axios.post(API_BASE, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const updateRoom = async (id, formData, token) => {
  const res = await axios.put(`${API_BASE}/${id}`, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const deleteRoom = async (id, token) => {
  const res = await axios.delete(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
