import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-green-600 via-green-500 to-green-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4 animate-fade-in-left">
            <h3 className="text-2xl font-bold text-green-200 transition-all duration-200">
              D'Kost Mranggen
            </h3>
            <p className="text-white/80 leading-relaxed">
              Hunian premium yang nyaman dan aman untuk mahasiswa. 
              Lokasi strategis dengan fasilitas lengkap.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/dkostmranggen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110"
                title="Facebook D'Kost Mranggen"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://www.instagram.com/dkostmranggen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110"
                title="Instagram D'Kost Mranggen"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://wa.me/082227153016?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20kamar"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110"
                title="WhatsApp D'Kost Mranggen"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Navigation & Services */}
          <div className="space-y-4 animate-fade-in-up">
            <h4 className="text-lg font-semibold text-green-200">Menu & Layanan</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('hero-section')}
                  className="text-white/80 hover:text-white hover:font-bold transition-colors text-left"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('fasilitas-section')}
                  className="text-white/80 hover:text-white hover:font-bold transition-colors text-left"
                >
                  Fasilitas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pilihan-kamar-section')}
                  className="text-white/80 hover:text-white hover:font-bold transition-colors text-left"
                >
                  Sewa Kamar
                </button>
              </li>
              <li>
                <a 
                  href="https://wa.me/082227153016?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20pembayaran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white hover:font-bold transition-colors"
                >
                  Pembayaran Online
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 animate-fade-in-right">
            <h4 className="text-lg font-semibold text-green-200">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 hover:text-white transition-colors">
                <FaMapMarkerAlt className="text-green-200" />
                <span className="text-white/80 text-sm hover:text-white">
                  Jl. Imogiri Barat, Bakung, Bangunharjo, Kec. Sewon, Bantul, DIY
                </span>
              </div>
              <div className="flex items-center space-x-3 hover:text-white transition-colors">
                <FaPhone className="text-green-200" />
                <span className="text-white/80 text-sm hover:text-white">0822-2715-3016</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-white transition-colors">
                <FaEnvelope className="text-green-200" />
                <span className="text-white/80 text-sm hover:text-white">dmranggenkost@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-400 mt-12 pt-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2025 D'Kost Mranggen. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="https://wa.me/082227153016?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20kebijakan%20privasi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white hover:font-bold text-sm transition-colors"
              >
                Kebijakan Privasi
              </a>
              <a 
                href="https://wa.me/082227153016?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20syarat%20dan%20ketentuan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white hover:font-bold text-sm transition-colors"
              >
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 