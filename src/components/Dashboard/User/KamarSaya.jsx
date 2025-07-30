import React, { useState, useEffect } from 'react';
import { getMe } from '../../../api/authApi';
import { FaUserCircle, FaBell, FaHome, FaBed, FaUsers, FaCog } from 'react-icons/fa';


const KosSaya = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token tidak ditemukan. Silakan login kembali.');
          return;
        }

        const response = await getMe(token);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Gagal memuat data user.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Memuat data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="Kos Saya">
        <main className="flex-1 p-10">
          <h2 className="text-[#50a75F] font-semibold mb-4 text-xl">Kamar Saya</h2>
          <p className="text-gray-700 mb-6">Hai, {userData?.name || 'User'}</p>

          <form className="space-y-6 max-w-xl">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded bg-gray-50"
                value={userData?.name || ''}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border px-4 py-2 rounded bg-gray-50"
                value={userData?.email || ''}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded bg-gray-50"
                value={userData?.role || ''}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status Akun</label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded bg-gray-50"
                value={userData?.isActive ? 'Aktif' : 'Tidak Aktif'}
                readOnly
              />
            </div>

            {userData?.roomNumber && (
              <div>
                <label className="block text-sm font-medium mb-1">Nomor Kamar</label>
                <input
                  type="text"
                  className="w-full border px-4 py-2 rounded bg-gray-50"
                  value={userData.roomNumber}
                  readOnly
                />
              </div>
            )}
          </form>
        </main>
      </div>
    );

};
export default KosSaya;