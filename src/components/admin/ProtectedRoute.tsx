import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../admin/AdminAuthContext';

export function ProtectedRoute() {
  const { admin, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f2efe8] text-[0.7rem] uppercase tracking-[0.18em] text-[#6f695f]">Checking authentication...</div>;
  }

  if (!admin) {
    return <Navigate to="/admin" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
