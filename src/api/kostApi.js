import axios from 'axios';

const API_BASE = '/api/kost';

export const getAllKost = async (params = {}) => {
  const res = await axios.get(API_BASE, { params });
  return res.data;
};

export const getKost = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

export const getKostRooms = async (id, params = {}) => {
  const res = await axios.get(`${API_BASE}/${id}/rooms`, { params });
  return res.data;
};

export const searchKost = async (params = {}) => {
  const res = await axios.get(`${API_BASE}/search`, { params });
  return res.data;
};
