import React, { forwardRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PilihanKamar = forwardRef((props, ref) => {
  const [kostList, setKostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://dkos-mranggen-clabs-production.up.railway.app/api/user/kost', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setKostList(data.data || []))
      .catch(() => setKostList([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-10">Memuat data kamar...</div>;
  }

  return (
    <section ref={ref} className="bg-white py-10 px-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Pilihan Kamar D'Kost Mranggen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {kostList.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            Tidak ada kamar kost ditemukan.
          </div>
        )}
        {kostList.map((kost) => (
          <div key={kost._id} className="bg-gray-100 rounded-lg overflow-hidden shadow">
            <div className="p-4">
              <div
                className="border-2 rounded-md w-80 h-80 bg-cover bg-center"
                style={{
                  backgroundImage: kost.images && kost.images[0]
                    ? `url(${kost.images[0]})`
                    : 'linear-gradient(#50A75F, #50A75F)',
                }}
              />
              <p className="text-gray-600">Jumlah Kamar: {kost.availableRooms}</p>
              <p className="text-gray-600">Harga: Rp {kost.price?.toLocaleString()}</p>
              <button
                onClick={() => navigate(`/detail-kamar/${kost._id}`)}
                className="mt-4 bg-[#50A75F] text-white px-4 py-2 rounded hover:bg-[#3c8a4b]"
              >
                Ajukan Sewa Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default PilihanKamar;
