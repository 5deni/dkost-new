import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const AlertUbahPasswordUser = ({ setActivePage }) => {
  const handleBack = () => {
    setActivePage('Pengaturan'); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white px-8 py-6 rounded-2xl shadow-xl flex flex-col items-center text-center w-96 relative">
        <FaCheckCircle className="text-[#50A75F] text-6xl mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Password Berhasil Diubah
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Silakan gunakan password baru Anda untuk login selanjutnya.
        </p>
        <button
          onClick={handleBack}
          className="w-full py-2 bg-[#50A75F] text-white font-semibold rounded-lg hover:bg-[#3c8a4b] transition-colors"
        >
          Kembali ke Pengaturan
        </button>
      </div>
    </div>
  );
};

export default AlertUbahPasswordUser;