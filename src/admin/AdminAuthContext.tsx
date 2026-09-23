import React, { createContext, useContext, useEffect, useState } from 'react';
import { AdminUser, getCurrentAdmin, loginAdmin } from '../services/api';

const ADMIN_TOKEN_KEY = 'chauhan_admin_token';

interface AdminAuthContextValue {
  admin: AdminUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(ADMIN_TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    let active = true;
    getCurrentAdmin(token)
      .then((response) => {
        if (active) setAdmin(response.admin);
      })
      .catch(() => {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        if (active) {
          setToken(null);
          setAdmin(null);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await loginAdmin(email, password);
    localStorage.setItem(ADMIN_TOKEN_KEY, response.token);
    setToken(response.token);
    setAdmin(response.admin);
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken(null);
    setAdmin(null);
  };

  return <AdminAuthContext.Provider value={{ admin, token, loading, login, logout }}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return context;
}
