import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaUser, FaSave } from 'react-icons/fa';

const GantiUsername = ({ setActivePage }) => {
  const [formData, setFormData] = useState({
    currentUsername: '',
    newUsername: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch current username when component mounts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (data.success) {
          setFormData(prev => ({
            ...prev,
            currentUsername: data.data.name || ''
          }));
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.newUsername || !formData.password) {
      setMessage({ type: 'error', text: 'Username baru dan password harus diisi' });
      return false;
    }

    if (formData.newUsername.length < 3) {
      setMessage({ type: 'error', text: 'Username minimal 3 karakter' });
      return false;
    }

    if (formData.newUsername.length > 20) {
      setMessage({ type: 'error', text: 'Username maksimal 20 karakter' });
      return false;
    }

    // Check for valid username format (alphanumeric and underscore only)
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(formData.newUsername)) {
      setMessage({ type: 'error', text: 'Username hanya boleh mengandung huruf, angka, dan underscore' });
      return false;
    }

    if (formData.currentUsername === formData.newUsername) {
      setMessage({ type: 'error', text: 'Username baru tidak boleh sama dengan username saat ini' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/change-username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          newUsername: formData.newUsername,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Username berhasil diperbarui!' });
        // Update current username
        setFormData(prev => ({
          ...prev,
          currentUsername: formData.newUsername,
          newUsername: '',
          password: ''
        }));
        // Redirect back to settings after 2 seconds
        setTimeout(() => {
          setActivePage('Pengaturan');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Gagal memperbarui username' });
      }
    } catch (error) {
      console.error('Error updating username:', error);
      setMessage({ type: 'error', text: 'Terjadi kesalahan. Silakan coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <button
          onClick={() => setActivePage('Pengaturan')}
          className="flex items-center gap-2 text-[#50A75F] hover:text-[#3c8a4b] transition-colors mb-4"
        >
          <FaArrowLeft />
          <span>Kembali ke Pengaturan</span>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Ganti Username</h2>
        <p className="text-gray-600 mt-2">Perbarui username akun Anda sesuai keinginan</p>
      </div>

      <div className="max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaUser className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Perbarui Username</h3>
              <p className="text-sm text-gray-600">Masukkan username baru dan konfirmasi dengan password</p>
            </div>
          </div>

          {message.text && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username Saat Ini
              </label>
              <input
                type="text"
                value={formData.currentUsername}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username Baru
              </label>
              <input
                type="text"
                name="newUsername"
                value={formData.newUsername}
                onChange={handleInputChange}
                placeholder="Masukkan username baru"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#50A75F] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Masukkan password untuk konfirmasi"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#50A75F] focus:border-transparent"
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Aturan Username:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Minimal 3 karakter, maksimal 20 karakter</li>
                <li>• Hanya boleh menggunakan huruf, angka, dan underscore (_)</li>
                <li>• Tidak boleh menggunakan spasi atau simbol khusus</li>
                <li>• Username bersifat unik dan tidak boleh sama dengan pengguna lain</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setActivePage('Pengaturan')}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#50A75F] text-white py-2 px-4 rounded-lg hover:bg-[#3c8a4b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Perbarui Username
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GantiUsername;