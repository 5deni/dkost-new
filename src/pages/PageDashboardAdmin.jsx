import React, { useState } from 'react';
import HeaderAdmin from '../components/Dashboard/Admin/HeaderAdmin';
import DashboardSummary from '../components/Dashboard/Admin/DashboardSummary';
import SideMenu from '../components/Dashboard/Admin/SideMenu';
import KelolaPembayaran from '../components/Dashboard/Admin/KelolaPembayaran';
import KelolaKamardanIklan from '../components/Dashboard/Admin/KelolaKamardanIklan/KelolaKamardanIklan';
import KelolaPenghuni from '../components/Dashboard/Admin/KelolaPenghuni/KelolaPenghuni';
import Pengaturan from '../components/Dashboard/Admin/Pengaturan/Pengaturan';
import DetailPenghuni from '../components/Dashboard/Admin/KelolaPenghuni/DetailPenghuni';
import GantiPassword from '../components/Dashboard/Admin/Pengaturan/GantiPassword';
import EditKamar from '../components/Dashboard/Admin/KelolaKamardanIklan/EditKamar';
import TambahKamar from '../components/Dashboard/Admin/KelolaKamardanIklan/TambahKamar';
import GantiUsername from '../components/Dashboard/Admin/Pengaturan/GantiUsername';

const PageDashboardAdmin = () => {
  const [activePage, setActivePage] = useState('DashboardSummary');

  const getPage = () => {
    if (typeof activePage === 'string') return activePage;
    if (typeof activePage === 'object' && activePage.page) return activePage.page;
    return 'DashboardSummary';
  };

  const renderContent = () => {
    const page = getPage();
    if (page === 'EditKamar') {
      return <EditKamar setActivePage={setActivePage} kostId={activePage.kostId} />;
    }
    if (page === 'TambahKamar') {
      return <TambahKamar setActivePage={setActivePage} />;
    }
    switch(page) {
      case 'DashboardSummary':
        return <DashboardSummary setActivePage={setActivePage}/>;
      case 'KelolaPembayaran':
        return <KelolaPembayaran setActivePage={setActivePage}/>;
      case 'KelolaKamardanIklan':
        return <KelolaKamardanIklan setActivePage={setActivePage}/>;
      case 'KelolaPenghuni':
        return <KelolaPenghuni setActivePage={setActivePage}/>;
      case 'Pengaturan':
        return <Pengaturan setActivePage={setActivePage}/>;
      case 'DetailPenghuni':
        return <DetailPenghuni setActivePage={setActivePage}/>;
      case 'GantiPassword':
        return <GantiPassword setActivePage={setActivePage}/>;
      case 'GantiUsername':
        return <GantiUsername setActivePage={setActivePage}/>;
      default:
        return <DashboardSummary setActivePage={setActivePage}/>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderAdmin />
      <div className="flex pt-20">
        {/* Sidebar */}
        <div className="bg-white shadow h-[calc(100vh-64px)]">
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

export default PageDashboardAdmin;