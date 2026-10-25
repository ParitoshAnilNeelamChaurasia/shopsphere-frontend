import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import axios from 'axios';
import type { AuthUser } from '../types/models';

interface BackendUser {
  id: number;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
}

interface AuthResponse {
  token: string;
  user: BackendUser;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const readUser = (): AuthUser | null => {
  try {
    const value = localStorage.getItem('shopsphere-user');
    return value ? (JSON.parse(value) as AuthUser) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readUser);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('shopsphere-token')
  );

  const saveSession = (response: AuthResponse) => {
    const nextUser: AuthUser = {
      id: String(response.user.id),
      name: response.user.name,
      email: response.user.email,
      role: response.user.role,
    };

    setUser(nextUser);
    setToken(response.token);

    localStorage.setItem('shopsphere-user', JSON.stringify(nextUser));
    localStorage.setItem('shopsphere-token', response.token);
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post<AuthResponse>(
      `${API_BASE_URL}/auth/login`,
      { email: email.trim(), password }
    );

    saveSession(response.data);
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    const response = await axios.post<AuthResponse>(
      `${API_BASE_URL}/auth/register`,
      { name: name.trim(), email: email.trim(), password }
    );

    saveSession(response.data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('shopsphere-user');
    localStorage.removeItem('shopsphere-token');
  };

  const value = useMemo(
    () => ({ user, token, login, register, logout }),
    [user, token]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}