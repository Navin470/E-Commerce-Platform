import { createContext, useState, useEffect } from "react";
import { validateToken } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const valid = await validateToken();
      if (!valid) {
        setUser(null);
        localStorage.removeItem("accessToken");
      }
    };
    checkToken();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};