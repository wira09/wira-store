import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Untuk API fakestoreapi.com, kita perlu menggunakan username "mor_2314" dan password "83r5^_"
    // atau menggunakan credential yang valid
    const result = await login(username, password);
    if (result.success) {
      navigate("/home");
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600">Wira Store Shirt</h2>
          <p className="text-gray-600 mt-2">Masuk ke akun Anda</p>
        </div>
        
        {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
        
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
          <input
            id="username"
            type="text"
            placeholder="masukkan username Anda"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            id="password"
            type="password"
            placeholder="masukkan password Anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded">
          <p className="text-sm text-gray-600">
            <strong>Catatan:</strong> Untuk demo, gunakan username: <code className="bg-gray-100 px-1 rounded">mor_2314</code> dan password: <code className="bg-gray-100 px-1 rounded">83r5^_</code>
          </p>
        </div>
      </form>
    </div>
  );
}
