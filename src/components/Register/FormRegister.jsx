import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import LogicAuthRegister from './LogicAuthRegister';
import { FaEye, FaEyeSlash, FaArrowLeft, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

export default function FormRegister() {
 const {
  name, email, password,
  emailError, passwordError, isSubmitting,
  handleNameChange, handleEmailChange, handlePasswordChange,
  onChange, handleSubmit, isFormValid, showPassword, togglePassword, handleBackClick,
} = LogicAuthRegister();

  const navigate = useNavigate();
  
  const handleOpenLogin = () => navigate('/');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-white relative">
          <button 
            onClick={handleBackClick} 
            className="absolute top-4 left-4 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
          >
            <FaArrowLeft size={20} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Daftar Akun</h2>
            <p className="text-green-100">Bergabung dengan D'Kost Mranggen</p>
          </div>
        </div>

        <div className="p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Nama Lengkap Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaUser className="text-green-600" size={14} />
                Nama Lengkap
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Masukkan nama lengkap sesuai identitas"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50"
                />
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Email Field */}
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
                  placeholder="Masukkan email untuk D'Kost Mranggen"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50"
                />
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              {emailError && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><span className="w-1 h-1 bg-red-500 rounded-full"></span>{emailError}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaLock className="text-green-600" size={14} />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Minimal 6 karakter"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 pr-12 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50"
                />
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <button
                  type='button'
                  onClick={togglePassword}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1'
                  tabIndex={-1}
                >
                  {showPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><span className="w-1 h-1 bg-red-500 rounded-full"></span>{passwordError}</p>}
            </div>

            {/* ReCAPTCHA */}
            <div className="flex justify-center">
              <ReCAPTCHA 
                sitekey="6LcXinkrAAAAACvy5X1NLKworT9rRXHF0LeD2zSa" 
                onChange={onChange}
                className="transform scale-85"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] flex justify-center items-center gap-2 ${
                isFormValid && !isSubmitting
                  ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}>
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Mendaftarkan...
                </>
              ) : (
                <>
                  Daftar Sekarang
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Sudah punya akun D'Kost Mranggen?{" "}
                <button
                  type="button"
                  onClick={handleOpenLogin}
                  className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors"
                >
                  Masuk di sini
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
