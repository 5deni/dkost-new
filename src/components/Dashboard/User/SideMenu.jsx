import React, { useState, useEffect } from 'react';
import {
  FaUserCircle,
  FaWallet,
  FaClock,
  FaBed,
  FaBullhorn,
  FaUserCog,
} from 'react-icons/fa';
import { getMe } from '../../../api/authApi';

const userMenuItems = [
  { name: 'KosSaya', icon: <FaBed />, label: 'Kamar Saya' },
  { name: 'RiwayatTransaksi', icon: <FaClock />, label: 'Riwayat Pembayaran' },
  { name: 'TagihanSaya', icon: <FaWallet />, label: 'Tagihan' },
  { name: 'Pengaturan', icon: <FaUserCog />, label: 'Akun Saya' },
];

const SideMenu = ({ setActivePage, activePage }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await getMe(token);
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <aside className="w-80 bg-[#F5F5F5] border-r min-h-screen p-6">
        <div className="flex items-center gap-3 mb-8">
          <FaUserCircle className="text-4xl text-[#444]" />
          <div>
            <p className="font-semibold text-xl">Loading...</p>
            <p className="text-sm text-gray-500">Penyewa Kost</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-[#F5F5F5] border-r p-6 overflow-y-auto h-full">
      <div className="flex items-center gap-3 mb-10">
        <FaUserCircle className="text-4xl text-[#444]" />
        <div>
          <p className="font-semibold text-xl text-gray-700">
            {userProfile?.name || 'User'}
          </p>
          <p className="text-sm text-gray-500">
            {userProfile?.role === 'user' ? 'Penyewa Kost' : 'Pengguna'}
          </p>
        </div>
      </div>

      <nav className="space-y-3">
        {userMenuItems.map(({ name, icon, label }) => (
          <button
            key={name}
            onClick={() => setActivePage(name)}
            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-all
              ${
                activePage === name
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 font-semibold'
                  : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
              }`}
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SideMenu;