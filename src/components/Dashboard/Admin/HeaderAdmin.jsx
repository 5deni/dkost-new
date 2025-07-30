import React, { useState, useRef, useEffect } from 'react';
import logo from '../../../assets/Header/DkostMranggenGreen.svg';
import {FaUserCircle, FaBell} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeaderAdmin = () => {
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

  const handleProfile = () => {
    setDropdownOpen(true);
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.clear();
    setDropdownOpen(true);
    navigate('/');
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-400/90 via-emerald-500/90 to-green-600/80 bg-opacity-80 backdrop-blur-xl border-b-2 border-green-700 shadow-2xl shadow-green-300/30 ring-1 ring-green-300/20 transition-all duration-300">
      <div className="absolute inset-0 pointer-events-none rounded-b-3xl shadow-inner shadow-white/10" />
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-40" 
        />
        <div className="space-x-4 flex items-center">
          <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105" onClick={() => setDropdownOpen((prev) => !prev)}>
            <FaUserCircle className="text-2xl" />
            <span className="hidden md:inline">Admin</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow z-50">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleProfile}
              >
                Profil
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Keluar
              </button>
            </div>
          )}
          <button className="flex items-center space-x-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:from-green-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105">
            <FaBell className="text-2xl" />
            <span className="hidden md:inline">Notifikasi</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;