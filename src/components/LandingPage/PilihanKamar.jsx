import React, { useState, useEffect, useRef } from 'react';
import AlertLogin from '../Alert/AlertLogin';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PilihanKamar = ({ user }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [kamar, setKamar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchKamar = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/kosts/public');
        const data = await res.json();
        setKamar(data.data || data); // tergantung struktur respons
      } catch (err) {
        console.error('Gagal memuat data kamar:', err);
        setKamar([]);
      } finally {
        setLoading(false);
      }
    };

    fetchKamar();
  }, []);

  const handleSewaClick = () => {
    if (user?.role === 'guest' || !user) {
      setShowAlert(true);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % kamar.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + kamar.length) % kamar.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl text-gray-600">
        Memuat kamar...
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Pilihan Kamar <span className="text-green-600">D'Kost Mranggen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pilih kamar yang sesuai dengan kebutuhan dan budget Anda
          </p>
        </div>

        {/* Slider */}
        <div className="relative max-w-6xl mx-auto">
          <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition hover:scale-110">
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition hover:scale-110">
            <FaChevronRight className="w-5 h-5" />
          </button>

          <div className="overflow-hidden rounded-2xl">
            <div ref={sliderRef} className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {kamar.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="card-modern hover-lift animate-fade-in-up max-w-2xl mx-auto">
                    <div className="relative h-64 overflow-hidden">
                      <img src={item.mediaUrl || 'https://via.placeholder.com/600x300'} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm font-semibold text-gray-800">{item.rating || 4.5}</span>
                        <span className="text-xs text-gray-500">({item.reviews || 10})</span>
                      </div>

                      <div className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full">
                        <div className="text-sm font-medium">Rp {item.price?.toLocaleString('id-ID') || '0'}</div>
                        <div className="text-xs opacity-90">/bulan</div>
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.name}</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{item.description || '-'}</p>

                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {item.features?.length > 0 ? item.features.map((f, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {f}
                          </div>
                        )) : (
                          <div className="col-span-2 text-gray-400 text-sm italic">Tidak ada fitur</div>
                        )}
                      </div>

                      <button onClick={handleSewaClick} className="w-full btn-primary">
                        Ajukan Sewa Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {kamar.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-green-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>

        {/* Help Box */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Butuh Bantuan Memilih Kamar?</h3>
            <p className="text-gray-600 mb-6">Tim kami siap membantu Anda memilih kamar yang paling sesuai dengan kebutuhan</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/082227153016?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20kamar" target="_blank" rel="noopener noreferrer" className="btn-primary text-center">Hubungi Kami</a>
              <a href="https://maps.app.goo.gl/8tip17F2zzoGdWg76" target="_blank" rel="noopener noreferrer" className="btn-secondary text-center">Lihat Lokasi</a>
            </div>
          </div>
        </div>
      </div>

      {showAlert && <AlertLogin onClose={() => setShowAlert(false)} />}
    </section>
  );
};

export default PilihanKamar;
