import axios from 'axios';

const API_BASE = '/api/bookings';

export const createBooking = async (bookingData, token) => {
  const res = await axios.post(API_BASE, bookingData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getUserBookings = async (token) => {
  const res = await axios.get(API_BASE, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getBooking = async (id, token) => {
  const res = await axios.get(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const cancelBooking = async (id, cancelReason, token) => {
  const res = await axios.put(`${API_BASE}/${id}/cancel`, 
    { cancelReason }, 
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return res.data;
};

export const uploadPaymentProof = async (id, formData, token) => {
  const res = await axios.post(`${API_BASE}/${id}/payment-proof`, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};
