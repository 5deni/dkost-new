import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const DetailPenghuni = ({ setActivePage }) => {
  const [tab, setTab] = useState('kirim');
  const [paymentId] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    setActivePage('KelolaPenghuni');
  };

  const handleVerifikasiPembayaran = async () => {
    if (!paymentId) return alert('ID pembayaran tidak tersedia');

    setIsLoading(true);
    try {
      const response = await fetch(`https://dkos-mranggen-clabs-production.up.railway.app/api/admin/payments/${paymentId}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert('Pembayaran berhasil diverifikasi!');
      } else {
        alert(`Gagal verifikasi: ${data.message || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      alert('Terjadi kesalahan koneksi ke server');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="w-full px-4 py-6 bg-white rounded-2xl shadow-lg space-y-6 text-gray-800">
    {/* Back Button */}
    <div className="flex items-center gap-3 text-gray-500 hover:text-green-700 transition cursor-pointer">
      <button onClick={handleBack} className="text-lg">
        <FaArrowLeft />
      </button>
      <span className="font-medium">Kembali ke daftar penghuni</span>
    </div>

    {/* Informasi Penghuni */}
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-gray-800">Detail Penghuni</h2>
      <p><span className="font-medium">Nama:</span> Muhammad Umar Hatta</p>
      <p><span className="font-medium">Tipe Kamar:</span> A</p>
      <p><span className="font-medium">Durasi Sewa:</span> 1 Bulan</p>
      <p><span className="font-medium">Mulai Sewa:</span> 1 Januari 2025</p>
      <p><span className="font-medium">Berlaku Sampai:</span> 28 Februari 2025</p>
      <p>
        <span className="font-medium">Status:</span>{' '}
        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
          Aktif
        </span>
      </p>
      <p><span className="font-medium">No HP:</span> 0123456789</p>
    </div>

    {/* Tab Navigation */}
    <div className="flex flex-wrap gap-3">
      {['kirim', 'konfirmasi', 'riwayat'].map((type) => (
        <button
          key={type}
          onClick={() => setTab(type)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm
            ${tab === type
              ? type === 'kirim'
                ? 'bg-red-100 text-red-700 border border-red-400'
                : type === 'konfirmasi'
                ? 'bg-yellow-100 text-yellow-700 border border-yellow-400'
                : 'bg-green-100 text-green-700 border border-green-400'
              : 'bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
        >
          {type === 'kirim' && 'Kirim Tagihan'}
          {type === 'konfirmasi' && 'Konfirmasi Pembayaran'}
          {type === 'riwayat' && 'Riwayat Pembayaran'}
        </button>
      ))}
    </div>

    {/* Tab Content */}
    <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-green-50 shadow-inner space-y-4 w-full">
      {tab === 'kirim' && (
        <>
          <h3 className="text-lg font-semibold text-red-600">Kirim Tagihan</h3>
          <p className="text-gray-800 font-medium">Tagihan bulan ke–2</p>
          <p className="text-gray-700">
            Jatuh tempo <strong>10 Juli 2025</strong>
          </p>
          <p className="text-black text-lg font-bold">Rp 900.000</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500 italic">Tenggat 21 hari lagi</span>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-800 transition shadow-lg">
              Kirim Tagihan
            </button>
          </div>
        </>
      )}

      {tab === 'konfirmasi' && (
        <>
          <h3 className="text-lg font-semibold text-yellow-600">Konfirmasi Pembayaran</h3>
          <p className="text-gray-800 font-medium">Pembayaran bulan ke–2</p>
          <p className="text-black text-lg font-bold">Rp 900.000</p>
          <p className="text-xs text-gray-500">14 Juni 2025, 10.00</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleVerifikasiPembayaran}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-800 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Memverifikasi...' : 'Verifikasi'}
            </button>
            <button className="border border-gray-300 px-5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
              Tandai Sudah Dibayar
            </button>
          </div>
        </>
      )}

      {tab === 'riwayat' && (
        <>
          <h3 className="text-lg font-semibold text-green-700">Sudah Dibayar</h3>
          <p className="text-gray-800 font-medium">Pembayaran bulan ke–1</p>
          <p className="text-black text-lg font-bold">Rp 900.000</p>
          <p className="text-sm text-gray-600">Terbayar pada 9 Juli 2025</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs italic text-gray-500">
              Terkonfirmasi admin pada 9 Juli 2025, 10:30 WIB
            </span>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-800 transition shadow-lg">
              Unduh Bukti
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);
};

export default DetailPenghuni;