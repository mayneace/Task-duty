import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "../services/api";
import type { User } from "../types/task";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updateUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem("token");

    if (!saved) {
      setloading(false);
      return;
    }

    try {
      const savedUser: User = JSON.parse(saved);

      // Ask the server if this token is still good before trusting it
      api
        .get("/auth/me")
        .then(() => setUser(savedUser))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setloading(false));
    } catch {
      localStorage.removeItem("token");
      setloading(false);
    }
  }, []);

  //   ---- LOGIN ----
  // Returns true if login succeeded, false if it failed
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await api.post<User>("/auth/login", { email, password });

      setUser(data);
      localStorage.setItem("token", JSON.stringify(data));

      toast.success(`Welcome back, ${data.name}! 📝`);
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return false;
    }
  };

  //   register
  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const { data } = await api.post<User>("/auth/register", {
        name,
        email,
        password,
      });

      setUser(data);
      localStorage.setItem("token", JSON.stringify(data));

      toast.success(`Welcome to TaskDuty, ${data.name}! 🎧`);
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return false;
    }
  };

  //   --- LOGOUT ---
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  };

  const updateUser = (updatedData: Partial<User>): void => {
    if (user) {
      const updated = { ...user, ...updatedData };
      setUser(updated);
      localStorage.setItem("token", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};

export default AuthContext;
