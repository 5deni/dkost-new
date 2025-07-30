import React from 'react';
import logo from '../../assets/Header/DkostMranggenGreen.svg';
import AuthModal from '../Auth/FormLogin';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const[showModal, setShowModal] = React.useState(false);
  
  const navigate = useNavigate();
  const backtoHome = () => {
    navigate('/');
  }

  return(
  <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-lg">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <img 
        src={logo} 
        alt="Logo" 
        className="w-40 cursor-pointer transition-transform hover:scale-105" 
        onClick={backtoHome} 
      />
      <div className="space-x-4">
        <button 
          onClick={()=> setShowModal(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 rounded-full 
          hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105
          font-semibold shadow-lg hover:shadow-xl"
        >
          Masuk
        </button>
      </div>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </div>
  </header>
  );
};

export default Header;
