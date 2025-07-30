import React from 'react';
import { FaWifi, FaBed, FaChair, FaShower, FaClock } from 'react-icons/fa';
import { PiFanFill } from "react-icons/pi";

const fasilitas = [
  { 
    icon: <FaBed className="text-3xl" />, 
    label: 'Tempat Tidur', 
    desc: 'Kasur premium dengan kualitas terbaik'
  },
  { 
    icon: <FaChair className="text-3xl" />, 
    label: 'Meja dan Kursi', 
    desc: 'Furnitur ergonomis untuk belajar'
  },
  { 
    icon: <PiFanFill className="text-3xl" />, 
    label: 'Kipas Angin', 
    desc: 'Pendingin ruangan yang nyaman'
  },
  { 
    icon: <FaShower className="text-3xl" />, 
    label: 'Toilet Dalam', 
    desc: 'Kamar mandi pribadi bersih'
  },
  { 
    icon: <FaClock className="text-3xl" />, 
    label: 'Akses 24 Jam', 
    desc: 'Kebebasan masuk kapan saja'
  },
  { 
    icon: <FaWifi className="text-3xl" />, 
    label: 'Internet Kencang', 
    desc: 'WiFi stabil untuk kebutuhan online'
  }
];

const FasilitasSection = () => (
  <section id="fasilitas-section" className="py-20 bg-gradient-to-br from-green-600 via-green-500 to-green-700 relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)`,
        backgroundSize: '60px 60px'
      }}></div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="text-4xl font-bold text-white mb-4">
          Fasilitas <span className="text-green-200">D'Kost Mranggen</span>
        </h2>
        <p className="text-xl text-green-100 max-w-2xl mx-auto">
          Nikmati kenyamanan maksimal dengan fasilitas modern yang kami sediakan
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fasilitas.map((item, index) => (
          <div 
            key={index} 
            className="glass rounded-2xl p-8 hover-lift animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{item.label}</h3>
            <p className="text-green-100 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      
    </div>
  </section>
);

export default FasilitasSection;
