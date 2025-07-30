import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BangunanKost from '../../../assets/LandingPage/BangunanKost.svg';

const AdminDashboardSummary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/dashboard/summary', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(res.data.data);
      } catch (err) {
        setError('Gagal memuat ringkasan dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Memuat ringkasan...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 pt-10 pb-10 animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(156, 146, 172, 0.1) 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Summary Cards */}
          <div className="space-y-8 animate-fade-in-left">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent drop-shadow-lg">
                Dashboard Admin
              </span>
              <br />
              <span className="text-gray-800 text-2xl font-semibold">Ringkasan Pengelolaan Kost</span>
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white/90 shadow-xl rounded-2xl p-6 text-center border-t-2 border-green-400 hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
                <div className="text-3xl font-bold text-green-700 mb-1">{data.totalUsers}</div>
                <div className="text-sm text-gray-600">Total User</div>
              </div>
              <div className="bg-white/90 shadow-xl rounded-2xl p-6 text-center border-t-2 border-blue-300 hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
                <div className="text-3xl font-bold text-blue-600 mb-1">{data.totalKost}</div>
                <div className="text-sm text-gray-600">Total Kost</div>
              </div>
              <div className="bg-gradient-to-tr from-emerald-50 via-white to-green-100 shadow-xl rounded-2xl p-6 text-center border-t-2 border-emerald-400 hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
                <div className="text-3xl font-bold text-emerald-700 mb-1">Rp {data.pendapatanBulanan.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Pendapatan Bulan Ini</div>
              </div>
              <div className="bg-gradient-to-tr from-yellow-50 via-white to-yellow-100 shadow-xl rounded-2xl p-6 text-center border-t-2 border-yellow-300 hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
                <div className="text-3xl font-bold text-yellow-600 mb-1">{data.pembayaranTertunda}</div>
                <div className="text-sm text-gray-600">Pembayaran Tertunda</div>
              </div>
              <div className="bg-gradient-to-tr from-orange-50 via-white to-orange-100 shadow-xl rounded-2xl p-6 text-center border-t-2 border-orange-300 hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
                <div className="text-3xl font-bold text-orange-500 mb-1">{data.menungguKonfirmasi}</div>
                <div className="text-sm text-gray-600">Menunggu Konfirmasi</div>
              </div>
              <div className="bg-gradient-to-tr from-purple-50 via-white to-gray-100 shadow-xl rounded-2xl p-6 text-center border-t-2 border-purple-300 hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
                <div className="text-3xl font-bold text-purple-600 mb-1">{data.kamarTerisi}</div>
                <div className="text-sm text-gray-600">Kamar Terisi</div>
                <div className="text-xs text-gray-400">Kamar Kosong: {data.kamarKosong}</div>
              </div>
            </div>
            {/* Floating Card Style Table */}
            <div className="bg-white/90 rounded-2xl shadow-2xl p-6 mt-8 border border-gray-100 animate-fade-in-up">
              <h2 className="text-lg font-semibold mb-4 text-emerald-700">Transaksi Terakhir</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="py-2 px-4 text-green-700">User</th>
                      <th className="py-2 px-4 text-green-700">Kost</th>
                      <th className="py-2 px-4 text-green-700">Jumlah</th>
                      <th className="py-2 px-4 text-green-700">Status</th>
                      <th className="py-2 px-4 text-green-700">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.transaksiTerakhir.map((trx, idx) => (
                      <tr key={trx._id || idx}>
                        <td className="py-2 px-4">{trx.user?.name}</td>
                        <td className="py-2 px-4">{trx.kost?.name}</td>
                        <td className="py-2 px-4">Rp {trx.amount?.toLocaleString()}</td>
                        <td className="py-2 px-4">{trx.status}</td>
                        <td className="py-2 px-4">{trx.paymentDate ? new Date(trx.paymentDate).toLocaleDateString() : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Ilustrasi */}
          <div className="relative animate-fade-in-right flex justify-center items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-float w-full max-w-md">
              <img
                src={BangunanKost}
                alt="Kost Admin"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl border border-gray-100 animate-fade-in-up">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Terverifikasi</div>
                  <div className="text-sm text-gray-500">Admin Resmi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardSummary;
