import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ReCAPTCHA from "react-google-recaptcha";
import useAuthForm from './LogicAuthLogin';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';

const AuthModal = ({ onClose }) => {
  const navigate = useNavigate();

  const {
    email, emailError, password, passwordError, showPassword,
    handleEmailChange, handlePasswordChange, onChange, handleSubmit, isFormValid, togglePassword
  } = useAuthForm();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleRegisterClick = () => {
    onClose();
    navigate('/register');
  };

  const modalContent = (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '420px',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #22c55e 0%, #059669 100%)',
          padding: '32px 24px 24px 24px',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Close Button */}
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'white',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            ×
          </button>

          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            margin: '0 0 8px 0'
          }}>
            Masuk ke D'Kost Mranggen
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px',
            margin: 0
          }}>
            Akses akun Anda dengan aman
          </p>
        </div>

        {/* Form Content */}
        <div style={{ padding: '32px 24px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Email */}
            <div>
              <label style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FaEnvelope size={14} color="#22c55e" />
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={handleEmailChange}
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                    background: '#f9fafb'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#22c55e';
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.background = '#f9fafb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <FaEnvelope 
                  size={16} 
                  color="#9ca3af" 
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                />
              </div>
              {emailError && (
                <p style={{ 
                  color: '#ef4444', 
                  fontSize: '12px', 
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ width: '4px', height: '4px', background: '#ef4444', borderRadius: '50%' }}></span>
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FaLock size={14} color="#22c55e" />
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Minimal 6 karakter"
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    paddingRight: '44px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                    background: '#f9fafb'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#22c55e';
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.background = '#f9fafb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <FaLock 
                  size={16} 
                  color="#9ca3af" 
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9ca3af',
                    padding: '4px',
                    borderRadius: '4px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#6b7280';
                    e.target.style.background = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#9ca3af';
                    e.target.style.background = 'transparent';
                  }}
                >
                  {showPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                </button>
              </div>
              {passwordError && (
                <p style={{ 
                  color: '#ef4444', 
                  fontSize: '12px', 
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ width: '4px', height: '4px', background: '#ef4444', borderRadius: '50%' }}></span>
                  {passwordError}
                </p>
              )}
            </div>

            {/* ReCAPTCHA */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
              <div style={{ transform: 'scale(0.85)' }}>
                <ReCAPTCHA 
                  sitekey='6LcXinkrAAAAACvy5X1NLKworT9rRXHF0LeD2zSa' 
                  onChange={onChange} 
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '16px',
                border: 'none',
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                background: isFormValid 
                  ? 'linear-gradient(135deg, #22c55e 0%, #059669 100%)' 
                  : '#e5e7eb',
                color: isFormValid ? 'white' : '#9ca3af',
                transition: 'all 0.2s',
                boxShadow: isFormValid 
                  ? '0 4px 14px 0 rgba(34, 197, 94, 0.25)' 
                  : 'none'
              }}
              onMouseEnter={(e) => {
                if (isFormValid) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 6px 20px 0 rgba(34, 197, 94, 0.35)';
                }
              }}
              onMouseLeave={(e) => {
                if (isFormValid) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 14px 0 rgba(34, 197, 94, 0.25)';
                }
              }}
            >
              Masuk
            </button>

            {/* Links */}
            <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f3f4f6' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>
                  Belum punya akun?{' '}
                </span>
                <button 
                  type="button"
                  onClick={handleRegisterClick} 
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#22c55e',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#059669';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#22c55e';
                  }}
                >
                  Daftar Sekarang
                </button>
              </div>
              
              <div>
                <button 
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#22c55e',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#059669';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#22c55e';
                  }}
                  onClick={() => {
                    onClose();
                    navigate('LupaPassword');
                  }}
                  className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors"
                
                >

                  Lupa Password?
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default AuthModal;