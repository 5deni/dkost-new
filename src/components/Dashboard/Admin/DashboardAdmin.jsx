import React, { useState } from 'react';
import HeaderAdmin from '../components/Dashboard/Admin/HeaderAdmin';
import SideMenu from '../components/Dashboard/Admin/SideMenu';
import DashboardSummary from '../Admin/DashboardSummary';
// ...import lainnya

const PageDashboardAdmin = () => {
  const [activePage, setActivePage] = useState('DashboardSummary');

  const renderContent = () => {
    switch (activePage) {
      case 'DashboardSummary':
        return <DashboardSummary setActivePage={setActivePage} />;
      // tambahkan yang lain sesuai kebutuhan
      default:
        return <DashboardSummary setActivePage={setActivePage} />;
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