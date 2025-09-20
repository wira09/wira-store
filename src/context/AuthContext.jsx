import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../api/fakeStoreApi";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // Untuk API fakestoreapi.com, kita menggunakan username "mor_2314" dan password "83r5^_"
      // Ini adalah credential yang tersedia di dokumentasi API
      const res = await authService.login({ username, password });
      const userData = res.data; // JWT token + id
      
      // Dapatkan detail user dari API
      const fullUser = await fetch(
        `https://fakestoreapi.com/users/${userData.id}`
      ).then((r) => r.json());

      const userWithToken = { 
        ...fullUser, 
        token: userData.token,
        // Gunakan username sebagai name jika name tidak tersedia
        name: fullUser.name || fullUser.username 
      };
      
      setUser(userWithToken);
      localStorage.setItem("user", JSON.stringify(userWithToken));
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Username atau password salah. Untuk demo, gunakan username: mor_2314 dan password: 83r5^_" };
    }
  };

  const register = async (userData) => {
    // Karena API fakestoreapi.com tidak menyediakan endpoint register,
    // kita hanya akan memberikan pesan bahwa ini simulasi
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
