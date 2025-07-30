import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AlertSuccesPayment = () => {
  const navigate = useNavigate();

  const handleKembaliKeHome = () => {
    navigate('/HomePage');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-8 text-center relative animate-fade-in">
        <FaCheckCircle className="text-[#50A75F] text-6xl mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Pembayaran Berhasil</h2>
        <p className="text-sm text-gray-600 italic mb-6">
          Silakan cek notifikasi secara berkala. Admin akan memverifikasi dalam 1 x 24 jam.
        </p>
        <button
          onClick={handleKembaliKeHome}
          className="w-full py-2 bg-[#50A75F] hover:bg-[#3c8a4b] text-white rounded-xl font-medium transition"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default AlertSuccesPayment;
