import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaCamera, FaArrowRight } from 'react-icons/fa';

const Pengaturan = ({ setActivePage }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);// Tambahkan state ini

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
              const response = await fetch('http://localhost:5000/api/admin/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
      const data = await response.json();
      
      if (data.success) {
        setUserData(data.data);
      } else {
        // Fallback data
        setUserData({
          name: 'Admin DKost',
          email: 'admin@dkost.com',
          phoneNumber: '081234567890',
          profilePicture: null,
          role: 'admin',
          createdAt: '2024-01-01'
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Fallback data jika terjadi error
      setUserData({
        name: 'Admin DKost',
        email: 'admin@dkost.com',
        phoneNumber: '081234567890',
        profilePicture: null,
        role: 'admin',
        createdAt: '2024-01-01'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (menu) => {
    setActivePage(menu);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#50A75F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data profil...</p>
        </div>
      </div>
    );
  }

  return (
  <div className="w-full px-6 py-8 bg-white rounded-2xl shadow-xl space-y-8 text-gray-800 animate-fade-in-up">
    {/* Header */}
    <div>
      <h2 className="text-3xl font-bold text-grey-800">Pengaturan</h2>
    </div>

    {/* Profile Overview */}
    <div className="flex items-center gap-6">
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
          {userData?.profilePicture ? (
            <img 
              src={userData.profilePicture} 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
            />
          ) : (
            userData?.name?.charAt(0).toUpperCase() || 'A'
          )}
        </div>
        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full shadow">
          <FaCamera className="text-xs" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-green-600">{userData?.name}</h3>
        <p className="text-gray-600">{userData?.email}</p>
        <p className="text-sm text-gray-500 mt-1">
          {userData?.role === 'admin' ? 'Administrator' : 'User'} • Bergabung sejak {new Date(userData?.createdAt).toLocaleDateString('id-ID')}
        </p>
      </div>
    </div>

    {/* Settings Menu */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        onClick={() => handleMenuClick('GantiPassword')}
        className="bg-gradient-to-br from-white to-green-50 p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 cursor-pointer transition-all group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <FaLock className="text-red-600 text-xl" />
          </div>
          <FaArrowRight className="text-gray-400 group-hover:text-green-600 transition-colors" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Ganti Password</h3>
        <p className="text-gray-600 text-sm">
          Perbarui password akun Anda untuk keamanan yang lebih baik
        </p>
      </div>
      <div 
        onClick={() => handleMenuClick('GantiUsername')}
        className="bg-gradient-to-br from-white to-green-50 p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 cursor-pointer transition-all group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <FaUser className="text-gray-600 text-xl" />
          </div>
          <FaArrowRight className="text-gray-400 group-hover:text-green-600 transition-colors" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Ganti Username</h3>
        <p className="text-gray-600 text-sm">
          Perbarui username akun Anda sesuai kemauan
        </p>
      </div>
    </div>
  </div>
);
};

export default Pengaturan;