import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const AlertPembayaranKosBulanan = ({ setActivePage }) => {
  const handleBack = () => {
    setActivePage('KelolaTagihan'); // Sesuaikan halaman tujuan
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-96 rounded-2xl p-6 shadow-lg flex flex-col items-center">
        <FaCheckCircle className="text-[#50A75F] text-6xl mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Pembayaran Berhasil</h2>
        <p className="text-sm text-gray-600 italic mb-6 text-center">
          Silakan cek notifikasi secara berkala. Admin akan melakukan verifikasi dalam 1×24 jam.
        </p>
        <button
          onClick={handleBack}
          className="bg-[#50A75F] hover:bg-[#3c8a4b] transition text-white font-medium px-6 py-2 rounded-lg"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default AlertPembayaranKosBulanan;