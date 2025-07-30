import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaClock, FaExclamationTriangle, FaEye } from 'react-icons/fa';
import axios from 'axios';

const KelolaPembayaran = () => {
  const [paymentData, setPaymentData] = useState({
    pendapatanBulanan: 0,
    pembayaranTertunda: 0,
    menungguKonfirmasi: 0,
    detailTransaksi: [],
    pembayaranTertundaList: [],
    konfirmasiSewaList: []
  });
  const [loading, setLoading] = useState(true);
  const [showDetailTransaksi, setShowDetailTransaksi] = useState(false);
  const [showDetailPembayaranTertunda, setShowDetailPembayaranTertunda] = useState(false);
  const [showDetailKonfirmasiSewa, setShowDetailKonfirmasiSewa] = useState(false);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Fetch payment data
  const fetchPaymentData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [summaryRes, statsRes] = await Promise.all([
        axios.get('/api/admin/dashboard/summary', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/api/admin/statistics', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (summaryRes.data.success && statsRes.data.success) {
        setPaymentData({
          ...statsRes.data.data,
          summary: summaryRes.data.data.summary
        });
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle payment verification
  const handleVerifyPayment = async (paymentId) => {
    if (!window.confirm('Apakah Anda yakin ingin memverifikasi pembayaran ini?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/admin/payments/${paymentId}/verify`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPaymentData(); // Refresh data
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  // Handle booking confirmation
  const handleConfirmBooking = async (bookingId) => {
    if (!window.confirm('Apakah Anda yakin ingin mengkonfirmasi pemesanan ini?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/admin/bookings/${bookingId}/confirm`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPaymentData(); // Refresh data
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#50A75F] mx-auto"></div>
      <p className="mt-4 text-gray-600">Memuat Pembayaran bulanan...</p>
    </div>
  </div>;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Kelola Pembayaran</h2>

      {/* Payment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Pendapatan Bulanan */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Pendapatan Bulan Ini</h3>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(paymentData.pendapatanBulanan || 0)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaMoneyBillWave className="text-green-600 text-xl" />
            </div>
          </div>
          <button
            onClick={() => setShowDetailTransaksi(!showDetailTransaksi)}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-xl font-semibold text-base hover:from-green-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transition-all"
          >
            <FaEye className="text-sm" />
            Lihat Detail
          </button>
        </div>

        {/* Pembayaran Tertunda */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Pembayaran Tertunda</h3>
              <p className="text-2xl font-bold text-yellow-600">{paymentData.pembayaranTertunda || 0}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FaClock className="text-yellow-600 text-xl" />
            </div>
          </div>
          <button
            onClick={() => setShowDetailPembayaranTertunda(!showDetailPembayaranTertunda)}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-xl font-semibold text-base hover:from-yellow-700 hover:to-yellow-800 shadow-lg hover:shadow-xl transition-all"
          >
            <FaEye className="text-sm" />
            Lihat Detail
          </button>
        </div>

        {/* Menunggu Konfirmasi */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Menunggu Konfirmasi</h3>
              <p className="text-2xl font-bold text-blue-600">{paymentData.menungguKonfirmasi || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaExclamationTriangle className="text-blue-600 text-xl" />
            </div>
          </div>
          <button
            onClick={() => setShowDetailKonfirmasiSewa(!showDetailKonfirmasiSewa)}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-xl font-semibold text-base hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all"
          >
            <FaEye className="text-sm" />
            Lihat Detail
          </button>
        </div>
      </div>

      {/* Detail Transaksi */}
      {showDetailTransaksi && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" />
            Detail Transaksi Bulanan
          </h3>
          <div className="overflow-x-auto">
            <table className="table-fixed w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Kamar</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paymentData?.detailTransaksi?.map((transaksi) => (
                  <tr key={transaksi.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{transaksi.nama}</td>
                    <td className="py-3 px-4">{transaksi.kamar}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">
                      Rp {transaksi.jumlah?.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">{transaksi.tanggal}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {transaksi.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Pembayaran Tertunda */}
      {showDetailPembayaranTertunda && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaExclamationTriangle className="text-yellow-600" />
            Detail Pembayaran Tertunda
          </h3>
          <div className="overflow-x-auto">
            <table className="table-fixed w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Kamar</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Jatuh Tempo</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Terlambat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paymentData?.pembayaranTertundaList?.map((pembayaran) => (
                  <tr key={pembayaran.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{pembayaran.nama}</td>
                    <td className="py-3 px-4">{pembayaran.kamar}</td>
                    <td className="py-3 px-4 font-semibold text-yellow-600">
                      Rp {pembayaran.jumlah?.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4">{pembayaran.jatuhTempo}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                        {pembayaran.hariTerlambat} hari
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Konfirmasi Sewa */}
      {showDetailKonfirmasiSewa && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaClock className="text-blue-600" />
            Detail Konfirmasi Sewa
          </h3>
          <div className="overflow-x-auto">
            <table className="table-fixed w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Kamar</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Tanggal Sewa</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Durasi</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paymentData?.konfirmasiSewaList?.map((sewa) => (
                  <tr key={sewa.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{sewa.nama}</td>
                    <td className="py-3 px-4">{sewa.kamar}</td>
                    <td className="py-3 px-4">{sewa.tanggalSewa}</td>
                    <td className="py-3 px-4">{sewa.durasi}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {sewa.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaPembayaran; 