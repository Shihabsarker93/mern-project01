// client/src/components/PrivateAdminRoute.jsx
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateAdminRoute() {
  const { currentAdmin } = useSelector((state) => state.admin);
  
  return currentAdmin ? <Outlet /> : <Navigate to="/admin/signin" />;
}