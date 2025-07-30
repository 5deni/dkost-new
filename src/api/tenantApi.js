import axios from 'axios';

const API_BASE = '/api/admin/tenants';

export const getTenants = async (params = {}, token) => {
  const res = await axios.get(API_BASE, {
    params,
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getTenant = async (id, token) => {
  const res = await axios.get(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateTenant = async (id, data, token) => {
  const res = await axios.put(`${API_BASE}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const deleteTenant = async (id, token) => {
  const res = await axios.delete(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getTenantBookings = async (id, token) => {
  const res = await axios.get(`${API_BASE}/${id}/bookings`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
