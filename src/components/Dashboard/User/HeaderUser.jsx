import React, { useState, useRef, useEffect } from 'react';
import logo from '../../../assets/Header/DkostMranggenGreen.svg';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeaderUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex h-20">
        {/* Sidebar Space - matches sidebar width */}
        <div className="w-80 flex items-center px-6">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="D'Kost Logo" 
              className="h-10" 
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-between px-6">
          {/* Centered Title */}
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-gray-800">Dashboard Penghuni</h1>
            <p className="text-sm text-gray-500">Kelola kost Anda</p>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUserCircle className="text-2xl text-blue-600" />
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-800">Penghuni</p>
                <p className="text-xs text-gray-500">Pengguna Kost</p>
              </div>
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profil Saya
                </button>
                <hr className="border-gray-100" />
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                  onClick={handleLogout}
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;
