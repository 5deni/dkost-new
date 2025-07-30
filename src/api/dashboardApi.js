import axios from 'axios';

const API_BASE = '/api/admin';

export const getDashboardSummary = async (token) => {
  const res = await axios.get(`${API_BASE}/dashboard/summary`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getPaymentStatistics = async (token) => {
  const res = await axios.get(`${API_BASE}/statistics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const confirmBooking = async (bookingId, token) => {
  const res = await axios.put(`${API_BASE}/bookings/${bookingId}/confirm`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const verifyPayment = async (paymentId, token) => {
  const res = await axios.put(`${API_BASE}/payments/${paymentId}/verify`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
