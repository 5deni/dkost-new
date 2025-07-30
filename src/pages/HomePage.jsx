import React, { useRef } from 'react';
import Header from '../components/Home/HeaderHome';
import Hero from '../components/General/HeroGeneral';
import Keunggulan from '../components/LandingPage/KeunggulanSection';
import Fasilitas from '../components/LandingPage/FasilitasSection';
import Kamar from '../components/General/PilihanKamar';

const HomePage = () => {
  const KamarRef = useRef(null);


  return (
    <div className="LandingPage">
      <Header />
      <HeroSection/>
      <KeunggulanSection />
      <FasilitasSection />
      <PilihanKamar/>
      <Footer />
    </div>
  );
};

export default HomePage;
