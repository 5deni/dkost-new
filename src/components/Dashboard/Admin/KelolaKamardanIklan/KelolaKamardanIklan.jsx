import React, { useEffect, useState } from 'react';
import axios from 'axios';

const KelolaKamarDanIklan = ({ setActivePage }) => {
  const [kosts, setKosts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const [roomsRes, galleryRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/rooms', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/admin/gallery', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setKosts(roomsRes.data.data || roomsRes.data || []);
      
      const galleryData = galleryRes.data.data || galleryRes.data || [];
      const cleanGallery = galleryData.map(img => ({
        ...img,
        kostId: img.kostId || img.kost?._id || img.kost?.$oid || null
      }));
      setGallery(cleanGallery);
    } catch (error) {
      console.error('Error fetching data:', error);
      setKosts([]);
      setGallery([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteKamar = async (kostId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus kamar ini?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/rooms/${kostId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert('Kamar berhasil dihapus.');
      fetchData(); // refresh data
    } catch (error) {
      console.error('Error deleting room:', error);
      alert(error.response?.data?.message || 'Terjadi kesalahan saat menghapus kamar');
    }
  };

  const formatRupiah = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);

  const getGalleryImage = (kost) => {
    const found = gallery.find(
      img =>
        img.kostId === kost._id ||
        (img.title && kost.name && img.title.toLowerCase().includes(kost.name.toLowerCase()))
    );
    return found?.mediaUrl || 'https://via.placeholder.com/400x200?text=No+Image';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#50A75F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data kamar...</p>
        </div>
      </div>
    );
  }

  return (
  <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-16 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-2xl font-bold text-gray-800">Kelola Kamar</h1>
        <button
          onClick={() => setActivePage({ page: 'TambahKamar' })}
          className="btn-primary flex items-center gap-2"
        >
          + Tambah Kamar
        </button>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {kosts.map((kost, index) => (
          <div
            key={kost._id}
            className="card-modern hover-lift animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img
              src={getGalleryImage(kost)}
              alt={kost.name}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-6 space-y-3">
              <h2 className="text-xl font-semibold text-gray-800">{kost.name}</h2>
              <p className="text-green-600 font-medium">{formatRupiah(kost.price)} / bulan</p>
              <p className="text-sm text-gray-500">
                {kost.availableRooms}/{kost.totalRooms} kamar tersedia
              </p>
              <p className="text-sm text-gray-500">
                Tingkat hunian: {kost.occupancyRate || 0}%
              </p>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setActivePage({ page: 'EditKamar', kostId: kost._id })}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-xl font-medium text-base hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteKamar(kost._id)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-xl font-medium text-base hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
};

export default KelolaKamarDanIklan;