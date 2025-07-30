import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LandingPage from './pages/LandingPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LupaPassword from './pages/ForgotPassword.jsx';
import HomePage from './pages/HomePage.jsx';
import PilihanKamar from './components/General/PilihanKamar.jsx';
import Form from './pages/PageFormSewaKamar.jsx';
import PagePembayaran from './pages/PagePembayaran.jsx';
import PageDashboardAdmin from './pages/PageDashboardAdmin.jsx';
import PageDashboardUser from './pages/PageDashboardUser.jsx';
import FormBayarKos from './components/Dashboard/User/KelolaTagihan/FormBayarKos.jsx';
import DetailKamar from './pages/DetailKamar.jsx';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/LupaPassword" element={<LupaPassword />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/PilihanKamar" element={<PilihanKamar />} />
        <Route path="/detail-kamar/:id" element={<DetailKamar />} />
        <Route path="/PageFormSewaKamar" element={<Form />} />
        <Route path="/PagePembayaran" element={<PagePembayaran />} />
        <Route path="/PageDashboardAdmin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageDashboardAdmin />
          </ProtectedRoute>
        } />
        <Route path="/PageDashboardUser" element={
          <ProtectedRoute allowedRoles={['user']}>
            <PageDashboardUser />
          </ProtectedRoute>
        } />
        <Route path="/FormBayarKos" element={<FormBayarKos />} />
        {/* Tambahkan rute lain sesuai kebutuhan */}
      </Routes>

      {/* Tambahkan ToastContainer di luar Routes */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  </React.StrictMode>
);
