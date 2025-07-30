import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const AlertLogin = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm mx-auto p-6 rounded-2xl shadow-2xl border border-gray-100 animate-fade-in">
        <div className="flex flex-col items-center text-center space-y-4">
          <FaExclamationCircle className="text-yellow-500 text-5xl" />
          <h2 className="text-xl font-semibold text-gray-800">Belum Login</h2>
          <p className="text-sm text-gray-600">
            Untuk melanjutkan, silakan login terlebih dahulu ke akun D'Kost Mranggen.
          </p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertLogin;