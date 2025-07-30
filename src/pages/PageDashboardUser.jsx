import React, { useState } from 'react';
import HeaderUser from '../components/Dashboard/User/HeaderUser';
import SideMenu from '../components/Dashboard/User/SideMenu';
import KamarSaya from '../components/Dashboard/User/KamarSaya';
import RiwayatTransaksi from '../components/Dashboard/User/RiwayatTransaksi/RiwayatTransaksi';
import KelolaTagihan from '../components/Dashboard/User/KelolaTagihan/KelolaTagihan';
import Pengaturan from '../components/Dashboard/User/Pengaturan/Pengaturan';
import FormBayarKos from '../components/Dashboard/User/KelolaTagihan/FormBayarKos';
import GantiPassword from '../components/Dashboard/User/Pengaturan/GantiPassword';


const PageDashboardUser = () => {
  const [activePage,setActivePage] = useState('KosSaya');

  const renderContent = () => {
    switch(activePage) {
      case 'KosSaya':
        return <KamarSaya/>;
      case 'RiwayatTransaksi':
        return <RiwayatTransaksi/>
      case 'KelolaTagihan':
        return <KelolaTagihan setActivePage={setActivePage} />;
      case 'Pengaturan':
        return <Pengaturan setActivePage={setActivePage}/>
      case 'FormBayarKos':
        return <FormBayarKos setActivePage={setActivePage} />;
      case 'GantiPassword':
        return <GantiPassword setActivePage={setActivePage} />;
      default:
        return <KamarSaya />; // fallback untuk safety

    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderUser />
      <div className="flex pt-20">
        {/* Sidebar */}
        <div className="bg-white shadow h-[calc(100vh-80px)]">
          <SideMenu setActivePage={setActivePage} activePage={activePage} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDashboardUser;
