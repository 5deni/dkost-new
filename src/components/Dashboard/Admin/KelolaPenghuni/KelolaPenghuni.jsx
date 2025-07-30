import React, { useEffect, useState } from 'react';


// Hapus dataPenghuni dummy, gunakan state

const getStatusStyle = (status) => {
  if (status === 'Aktif') return 'bg-green-600 text-white';
  if (status.includes('hari')) return 'bg-yellow-300 text-orange-700';
  return 'bg-red-600 text-white';
};

const KelolaPenghuni = ({ setActivePage }) => {
  const [dataPenghuni, setDataPenghuni] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTenants = async () => {
      setLoading(true);
      setError('');
      try {
        // Ganti token dengan token admin yang valid (misal dari context/localStorage)
        const token = localStorage.getItem('token');
        const res = await getTenants({}, token);
        setDataPenghuni(res.data || []);
      } catch (err) {
        setError('Gagal memuat data penghuni');
      } finally {
        setLoading(false);
      }
    };
    fetchTenants();
  }, []);

  const DetailPengguna = () => {
    setActivePage('DetailPenghuni');
  };

  
  return (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-8 text-grey-800">Kelola Penghuni Kost</h1>
    <div className="space-y-6">
      {loading && <div>Memuat data penghuni...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && dataPenghuni.length === 0 && (
        <div>Tidak ada data penghuni.</div>
      )}
      {!loading && !error && dataPenghuni.map((penghuni, index) => (
        <div
          key={penghuni._id}
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-gray-200 animate-fade-in-up"
        >
          <div className="text-sm md:text-base text-gray-800 space-y-1 w-full md:w-auto flex-1">
            <p className="text-green-700 font-semibold text-lg">
              Penghuni #{index + 1}
            </p>
            <p><span className="font-medium">Nama:</span> {penghuni.name}</p>
            <p><span className="font-medium">Email:</span> {penghuni.email}</p>
            <p><span className="font-medium">Status:</span> <span className={`text-xs font-semibold px-2 py-1 rounded-xl ${getStatusStyle(penghuni.status)}`}>{penghuni.status === 'active' ? 'Aktif' : 'Tidak Aktif'}</span></p>
            <p><span className="font-medium">Nomor HP:</span> {penghuni.phoneNumber || '-'}</p>
          </div>
          <button
            onClick={DetailPengguna}
            className="flex-1 md:flex-none bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold text-sm hover:from-green-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            Detail
          </button>
        </div>
      ))}
    </div>
  </div>
);
};

export default KelolaPenghuni;