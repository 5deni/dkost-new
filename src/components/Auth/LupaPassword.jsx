import React, { useState } from 'react';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function FormForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setEmailError(val && !val.includes('@') ? 'Format email tidak valid' : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setEmailError('Masukkan email yang valid');
      return;
    }
    // Simulasikan kirim link reset
    setSubmitted(true);
  };

  const handleBackClick = () => navigate(-1); // kembali ke halaman sebelumnya

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-white relative">
          <button 
            onClick={handleBackClick} 
            className="absolute top-4 left-4 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
          >
            <FaArrowLeft size={20} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Lupa Password</h2>
            <p className="text-green-100">Masukkan email untuk mereset kata sandi</p>
          </div>
        </div>

        <div className="p-6">
          {!submitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaEnvelope className="text-green-600" size={14} />
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Masukkan email Anda"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50"
                  />
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 transition-all hover:shadow-xl"
              >
                Kirim Tautan Reset
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <h3 className="text-green-700 font-bold text-lg">Cek Email Kamu 📩</h3>
              <p className="text-gray-600">
                Kami telah mengirim tautan untuk mereset password ke <span className="font-semibold">{email}</span>
              </p>
              <button
                onClick={() => navigate('/')}
                className="text-green-600 hover:underline font-semibold"
              >
                Kembali ke Beranda
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}