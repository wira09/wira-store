import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi password
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }
    
    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Untuk API fakestoreapi.com, kita tidak bisa benar-benar mendaftar
      // Jadi kita akan menampilkan pesan bahwa ini hanya simulasi
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi API call
      alert("Pendaftaran berhasil! Karena menggunakan API demo, Anda akan dialihkan ke halaman login.");
      navigate("/");
    } catch (err) {
      setError("Gagal mendaftar. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600">Wira Store Shirt</h2>
          <p className="text-gray-600 mt-2">Buat akun baru</p>
        </div>
        
        {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Nama Lengkap</label>
          <input
            id="name"
            type="text"
            placeholder="masukkan nama lengkap Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            id="email"
            type="email"
            placeholder="masukkan email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            id="password"
            type="password"
            placeholder="masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Konfirmasi Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="konfirmasi password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Daftar"}
        </button>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Sudah punya akun?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Masuk sekarang
            </Link>
          </p>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded">
          <p className="text-sm text-gray-600">
            <strong>Catatan:</strong> Karena menggunakan API demo, pendaftaran hanya bersifat simulasi. Silakan gunakan halaman login untuk mengakses aplikasi.
          </p>
        </div>
      </form>
    </div>
  );
}
