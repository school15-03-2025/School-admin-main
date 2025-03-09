// contexts/auth.context.tsx
"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useRouter } from "next/router";

interface AuthContextType {
  isAuthenticated: boolean;
  onAuth: (token: string) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  onAuth: () => {},
  onLogout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Commenting out authentication check for dashboard

  useEffect(() => {
    if (isLoading) return;

    const requiresAuth = document.querySelector('meta[name="x-require-auth"]');
    const isProtectedRoute = router.pathname.startsWith("/dashboard");

    if (isProtectedRoute && !isAuthenticated) {
      // Store the intended destination
      localStorage.setItem("redirectAfterLogin", router.asPath);
      router.push("/auth/login");
    }

    // Optional: Redirect away from auth pages if already authenticated
    if (isAuthenticated && router.pathname.startsWith("/auth")) {
      const redirectPath =
        localStorage.getItem("redirectAfterLogin") || "/dashboard";
      localStorage.removeItem("redirectAfterLogin");
      router.push(redirectPath);
    }
  }, [isAuthenticated, isLoading, router.pathname]);
  //comment end
  const onAuth = async (token: string) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);

    // Redirect to stored path or default to dashboard
    const redirectPath =
      localStorage.getItem("redirectAfterLogin") || "/dashboard";
    localStorage.removeItem("redirectAfterLogin");
    router.push(redirectPath);
  };

  const onLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    router.push("/auth/login");
  };

  // Show nothing while checking initial auth status
  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, onAuth, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
