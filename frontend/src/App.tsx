import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';

import Clients from './pages/Clients';
import Transactions from './pages/Transactions';
import PixKeys from './pages/PixKeys';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="clients" element={<Clients />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="pix-keys" element={<PixKeys />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}
