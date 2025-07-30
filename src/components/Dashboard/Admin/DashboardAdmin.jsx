import React, { useState } from 'react';
import HeaderAdmin from '../components/Dashboard/Admin/HeaderAdmin';
import SideMenu from '../components/Dashboard/Admin/SideMenu';
import KelolaPembayaran from '../components/Dashboard/Admin/KelolaPembayaran';
// ...import lainnya

const PageDashboardAdmin = () => {
  const [activePage, setActivePage] = useState('KelolaPembayaran');

  const renderContent = () => {
    switch (activePage) {
      case 'KelolaPembayaran':
        return <KelolaPembayaran setActivePage={setActivePage} />;
      // tambahkan yang lain sesuai kebutuhan
      default:
        return <KelolaPembayaran setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header tetap di atas */}
      <HeaderAdmin />

      {/* Body berisi SideMenu dan Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <SideMenu setActivePage={setActivePage} activePage={activePage} />
        
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default PageDashboardAdmin;