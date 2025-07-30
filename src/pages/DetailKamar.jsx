import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailKamar = () => {
  const { id } = useParams();
  const [kamar, setKamar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`https://dkos-mranggen-clabs-production.up.railway.app/api/user/kost/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setKamar(data.data))
      .catch(() => setKamar(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-10">Memuat detail kamar...</div>;
  if (!kamar) return <div className="text-center text-gray-500 py-10">Kamar tidak ditemukan.</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">{kamar.name}</h2>
      <img src={kamar.images && kamar.images[0]} alt={kamar.name} className="w-full h-64 object-cover rounded mb-4" />
      <p className="mb-2">Tipe: {kamar.roomType}</p>
      <p className="mb-2">Harga: Rp {kamar.price?.toLocaleString()}</p>
      <p className="mb-2">Jumlah Kamar Tersedia: {kamar.availableRooms}</p>
      <p className="mb-2">Alamat: {kamar.address}</p>
      <p className="mb-2">Fasilitas: {kamar.facilities?.join(', ')}</p>
      <p className="mb-2">Deskripsi: {kamar.description}</p>
      {/* Tambahkan tombol ajukan sewa, dsb jika perlu */}
    </div>
  );
};

export default DetailKamar; 