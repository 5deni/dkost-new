import React, { useState, useEffect } from 'react';
import {
  FaUserCircle,
  FaBed,
  FaUsers,
  FaCog,
  FaMoneyBillWave,
  FaHome,
} from 'react-icons/fa';

const menuItems = [
  { name: 'DashboardSummary', icon: <FaHome />, label: 'Dashboard' },
  { name: 'KelolaPembayaran', icon: <FaMoneyBillWave />, label: 'Pembayaran' },
  { name: 'KelolaKamardanIklan', icon: <FaBed />, label: 'Kamar' },
  { name: 'KelolaPenghuni', icon: <FaUsers />, label: 'Penghuni' },
  { name: 'Pengaturan', icon: <FaCog />, label: 'Akun Saya' },
];

const SideMenu = ({ setActivePage, activePage }) => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.success) {
        setAdminProfile(data.data);
      } else {
        // Fallback data
        setAdminProfile({
          name: 'Admin DKost',
          email: 'admin@dkost.com',
          phoneNumber: '081234567890',
          profilePicture: null,
          role: 'admin',
          createdAt: '2024-01-01',
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setAdminProfile({
        name: 'Admin DKost',
        email: 'admin@dkost.com',
        phoneNumber: '081234567890',
        profilePicture: null,
        role: 'admin',
        createdAt: '2024-01-01',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <aside className="w-80 bg-[#F5F5F5] border-r min-h-screen p-6">
        <div className="flex items-center gap-3 mb-8">
          <FaUserCircle className="text-4xl text-[#444]" />
          <div>
            <p className="font-semibold text-xl">Loading...</p>
            <p className="text-sm text-gray-500">Admin Kost</p>
          </div>
        </div>
      </aside>
    );
  }

  const joinDate = adminProfile?.createdAt
    ? new Date(adminProfile.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <aside className="w-80 bg-[#F5F5F5] border-r p-6 overflow-y-auto h-full">
      <div className="flex items-center gap-3 mb-10">
        <FaUser className="text-4xl text-[#444]" />
        <div>
          <p className="font-semibold text-xl text-gray-700">
            {adminProfile?.name}
          </p>
          <p className="text-sm text-gray-500">Admin Kost </p>
        </div>
      </div>

      <nav className="space-y-3">
        {menuItems.map(({ name, icon, label }) => (
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
