import axios from 'axios';

const API_BASE = '/api/admin/gallery';

export const getGallery = async (token) => {
  const res = await axios.get(API_BASE, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const uploadGalleryImage = async (formData, token) => {
  const res = await axios.post(API_BASE, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const deleteGalleryImage = async (id, token) => {
  const res = await axios.delete(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
