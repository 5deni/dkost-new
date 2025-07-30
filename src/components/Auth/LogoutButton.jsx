import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Konfirmasi logout
    const confirmLogout = window.confirm('Apakah Anda yakin ingin keluar?');
    
    if (confirmLogout) {
      // Hapus token dari localStorage
      localStorage.removeItem('token');
      
      // Redirect ke landing page
      navigate('/', { replace: true });
      
      // Optional: Show success message
      alert('Berhasil logout');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors ${className}`}
      title="Keluar"
    >
      <FaSignOutAlt />
      <span>Keluar</span>
    </button>
  );
};

export default LogoutButton;
