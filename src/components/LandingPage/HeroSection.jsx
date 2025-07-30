import React from 'react';
import BangunanKost from '../../assets/LandingPage/BangunanKost.svg';
import AlertLogin from '../Alert/AlertLogin';

const HeroSection = () => {
  const [showAlert, setShowAlert] = React.useState(false);
  
  const handleSewaClick = () => {
    setShowAlert(true);
  };

  const handleFasilitasClick = () => {
    const fasilitasSection = document.querySelector('#fasilitas-section');
    if (fasilitasSection) {
      fasilitasSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

return(
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 pt-20">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(156, 146, 172, 0.1) 2px, transparent 2px)`,
        backgroundSize: '60px 60px'
      }}></div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-8 animate-fade-in-left">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium animate-fade-in-up">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Hunian Premium dekat Kampus
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-fade-in-up">
              <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent drop-shadow-lg">
                D'Kost Mranggen
              </span>
              <br />
              <span className="text-gray-800">Solusinya!!!</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg animate-fade-in-up">
              Hunian aman dan nyaman dengan fasilitas lengkap, lokasi strategis, dan lingkungan yang eksklusif untuk mahasiswa.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
            <button 
              onClick={handleSewaClick}
              className="btn-primary animate-pulse-glow"
            >
              Ajukan Sewa Sekarang
            </button>
            <button 
              onClick={handleFasilitasClick}
              className="btn-secondary"
            >
              Lihat Fasilitas
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in-up">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">20+</div>
              <div className="text-sm text-gray-600">Penghuni Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">4.8</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative animate-fade-in-right">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-float">
            <img
              src={BangunanKost}
              alt="Kost"
              className="w-full h-[500px] object-cover"
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
                <div className="text-sm text-gray-500">Kost Resmi & Aman</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {showAlert && <AlertLogin onClose={() => setShowAlert(false)} />}
  </section>  
);
};

export default HeroSection;
