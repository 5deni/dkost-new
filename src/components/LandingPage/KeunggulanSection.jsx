import React from 'react';
import { FaCheckCircle, FaMapMarkerAlt, FaHome, FaShieldAlt, FaWifi, FaCreditCard, FaSmile } from 'react-icons/fa';

const keunggulan = [
  {
    icon: <FaMapMarkerAlt className="text-2xl" />,
    title: "Lokasi Strategis",
    desc: "Dekat kampus & jalan utama"
  },
  {
    icon: <FaHome className="text-2xl" />,
    title: "Kamar Premium",
    desc: "Bersih, luas, dan nyaman"
  },
  {
    icon: <FaShieldAlt className="text-2xl" />,
    title: "Lingkungan Aman",
    desc: "Eksklusif dan terjamin"
  },
  {
    icon: <FaWifi className="text-2xl" />,
    title: "Fasilitas Lengkap",
    desc: "Wifi kencang dan modern"
  },
  {
    icon: <FaCreditCard className="text-2xl" />,
    title: "Booking Online",
    desc: "Bebas ribet, proses mudah"
  },
  {
    icon: <FaSmile className="text-2xl" />,
    title: "Ramah Penghuni",
    desc: "Pelayanan terbaik"
  }
];

const KeunggulanSection = () => (
  <section className="py-20 bg-gradient-to-b from-white to-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Kenapa Harus <span className="text-green-600">D'Kost Mranggen</span>?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Kami memberikan pengalaman tinggal terbaik dengan fasilitas modern dan pelayanan profesional
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {keunggulan.map((item, index) => (
          <div 
            key={index} 
            className="card-modern hover-lift animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          </div>
      ))}
      </div>
    </div>
  </section>
);

export default KeunggulanSection;
