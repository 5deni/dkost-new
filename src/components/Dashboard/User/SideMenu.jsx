import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaWallet, FaClock, FaBed, FaUsers, FaCog } from 'react-icons/fa';
import { getMe } from '../../../api/authApi';
import LogoutButton from '../../Auth/LogoutButton';

const SideMenu = ({setActivePage, activePage}) => {
  const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            setLoading(false);
            return;
          }
          
          const response = await getMe(token);
          setUserProfile(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserProfile();
    }, []);
  
    if (loading) {
      return (
        <aside className="w-80 bg-[#F5F5F5] border-r min-h-screen p-6">
          <div className="flex items-center gap-3 mb-8">
            <FaUserCircle className="text-4xl text-[#444]" />
            <div>
              <p className="font-semibold text-xl">Loading...</p>
              <p className="text-m text-gray-500">Pengguna Kost</p>
            </div>
          </div>
        </aside>
      );
    }

    return (
      <aside className="w-80 bg-[#F5F5F5] border-r min-h-screen p-6">
          <div className="flex items-center gap-3 mb-8">
            <FaUserCircle className="text-4xl text-[#444]" />
            <div>
              <p className="font-semibold text-xl">{userProfile?.name || 'User'}</p>
              <p className="text-m text-gray-500">{userProfile?.role === 'user' ? 'Penyewa Kos' : 'Pengguna'}</p>
            </div>
          </div>

          <nav className="space-y-4 text-xl">

            <button
              onClick={() => setActivePage('KosSaya')}
              className={`flex items-center gap-2 w-full text-left mb-2 px-2 py-1 hover:text-[#50A75F] ${
                activePage === 'KosSaya' ? 'font-bold text-green-600' : 'text-gray-700'
              }`}>
              <FaBed className="text-lg" />
              <span>Kamar Saya</span>
            </button>
            
            <button
              onClick={() => setActivePage('RiwayatTransaksi')}
              className={`flex items-center gap-2 w-full text-left mb-2 px-2 py-1 hover:text-[#50A75F] ${
                activePage === '' ? 'font-bold text-green-600' : 'text-gray-700'
              }`}>
              <FaClock className="text-lg" />
              <span>Riwayat Transaksi</span>
            </button>

            <button
              onClick={() => setActivePage('KelolaTagihan')}
              className={`flex items-center gap-2 w-full text-left mb-2 px-2 py-1 hover:text-[#50A75F] ${
                activePage === 'KelolaTagihan' ? 'font-bold text-green-600' : 'text-gray-700'
              }`}>
              <FaWallet className="text-lg" />
              <span>Tagihan</span>
            </button>

            <button
              onClick={() => setActivePage('Pengaturan')}
              className={`flex items-center gap-2 w-full text-left mb-2 px-2 py-1 hover:text-[#50A75F] ${
                activePage === 'Pengaturan' ? 'font-bold text-green-600' : 'text-gray-700'
              }`}>
              <FaCog className="text-lg" />
              <span>Pengaturan</span>
            </button>

            {/* Logout Button */}
            <div className="mt-8 pt-4 border-t border-gray-300">
              <LogoutButton className="w-full justify-center" />
            </div>

          </nav>
        </aside>
    );

};
export default SideMenu;