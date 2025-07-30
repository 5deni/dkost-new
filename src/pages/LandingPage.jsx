import React, {useState} from 'react';
import Header from '../components/LandingPage/Header';
import HeroSection from '../components/LandingPage/HeroSection';
import KeunggulanSection from '../components/LandingPage/KeunggulanSection';
import FasilitasSection from '../components/LandingPage/FasilitasSection';
import PilihanKamar from '../components/LandingPage/PilihanKamar';
import Footer from '../components/LandingPage/Footer';

const LandingPage = () => {
    const [user] = useState({ role: 'guest' });



  return (
    <div className="LandingPage">
      <Header />
      <HeroSection user={user} />
      <KeunggulanSection />
      <FasilitasSection />
      <PilihanKamar user={user}/>
      <Footer />
    </div>
  );
};

export default LandingPage;
