import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

const EditKamar = ({ setActivePage, kostId }) => {
  const [kost, setKost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newFacility, setNewFacility] = useState('');
  const [error, setError] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!kostId) {
      setError('ID kamar tidak ditemukan.');
      setLoading(false);
      return;
    }
    
    const fetchRoom = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/admin/kosts/${kostId}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && response.data.data) {
          setKost(response.data.data);
        } else {
          setError('Kamar tidak ditemukan.');
        }
      } catch (error) {
        console.error('Error fetching room:', error);
        setError(error.response?.data?.message || 'Gagal mengambil data kamar.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoom();
  }, [kostId]);

  const handleAddFacility = () => {
    if (newFacility.trim() && !kost.facilities.includes(newFacility.trim())) {
      setKost({
        ...kost,
        facilities: [...kost.facilities, newFacility.trim()]
      });
      setNewFacility('');
    }
  };

  const handleRemoveFacility = (index) => {
    const updatedFacilities = kost.facilities.filter((_, i) => i !== index);
    setKost({
      ...kost,
      facilities: updatedFacilities
    });
  };

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const uploadImages = async (roomId) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // Append all images at once
      imageFiles.forEach((file, index) => {
        formData.append('images', file);
      });
      
      await axios.post(
        `http://localhost:5000/api/admin/gallery`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      // First update the room details
      await axios.put(
        `http://localhost:5000/api/admin/kosts/${kostId}`,
        {
          ...kost,
          price: parseInt(kost.price),
          totalRooms: parseInt(kost.totalRooms),
          availableRooms: parseInt(kost.availableRooms || kost.totalRooms)
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Then handle image uploads if there are any
      if (imageFiles.length > 0) {
        setUploading(true);
        await uploadImages(kostId);
        setUploading(false);
      }
      
      alert('Kamar berhasil diperbarui!');
      setActivePage({ page: 'KelolaKamardanIklan' });
    } catch {
      alert('Terjadi kesalahan saat memperbarui kamar.');
    }
  };

  if (loading) {
    return <div className="text-center py-10">Memuat data kamar...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }
  if (!kost) {
    return <div className="text-center text-gray-500 py-10">Data kamar tidak ditemukan.</div>;
  }

  return (
  <div className="w-full">
    {/* Header */}
    <div className="flex items-center gap-4 mb-8">
      <button
        onClick={() => setActivePage({ page: 'KelolaKamardanIklan' })}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-full hover:scale-105 transition-transform shadow"
      >
        <FaArrowLeft />
      </button>
      <h2 className="text-2xl font-bold text-gray-800">Edit Kamar Kost</h2>
    </div>

    {/* Form Container */}
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { label: "Nama Kamar", value: kost.name, key: "name" },
            { label: "Tipe Kamar", value: kost.roomType, key: "roomType" },
            { label: "Harga", value: kost.price, key: "price", type: "number" },
            { label: "Alamat", value: kost.address, key: "address" },
            { label: "Total Kamar", value: kost.totalRooms, key: "totalRooms", type: "number" },
            { label: "Kamar Tersedia", value: kost.availableRooms, key: "availableRooms", type: "number" },
          ].map(({ label, value, key, type = "text" }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
              <input
                type={type}
                value={value}
                onChange={(e) => setKost({ ...kost, [key]: e.target.value })}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 outline-none transition"
                required
              />
            </div>
          ))}

          {/* Deskripsi */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
            <textarea
              value={kost.description}
              onChange={(e) => setKost({ ...kost, description: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 outline-none transition"
              rows={3}
              required
            />
          </div>
        </div>

        {/* Fasilitas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fasilitas</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              className="flex-1 p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-200 transition"
              placeholder="Tambah fasilitas baru"
            />
            <button
              type="button"
              onClick={handleAddFacility}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition"
            >
              Tambah
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {kost.facilities.map((facility, idx) => (
              <span
                key={idx}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-xl text-sm flex items-center gap-1"
              >
                {facility}
                <button
                  type="button"
                  onClick={() => handleRemoveFacility(idx)}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Upload Gambar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Foto Kamar</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-200 transition"
          />
          {imageFiles.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {imageFiles.map((file, i) => (
                <div key={i} className="border rounded-xl p-2 bg-gray-50 shadow-sm">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${i + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <p className="text-sm mt-1 text-center">{file.name}</p>
                </div>
              ))}
            </div>
          )}
          {uploading && <div className="text-blue-600 mt-3">Mengupload gambar...</div>}
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            disabled={uploading}
          >
            <FaSave className="inline mr-2" /> Simpan Kamar
          </button>
          <button
            type="button"
            onClick={() => setActivePage({ page: 'KelolaKamardanIklan' })}
            className="flex-1 bg-gray-400 text-white py-3 px-4 rounded-xl font-semibold text-lg hover:bg-gray-500 transition-all"
            disabled={uploading}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default EditKamar; 