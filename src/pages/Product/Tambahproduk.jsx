import { useState } from "react";
import { productService } from "../../api/fakeStoreApi";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Tambahproduk = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Nama produk wajib diisi";
    }
    
    if (!formData.price) {
      newErrors.price = "Harga produk wajib diisi";
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Harga harus berupa angka positif";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Deskripsi produk wajib diisi";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Convert price to float
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        rating: {
          rate: 0,
          count: 0
        }
      };
      
      await productService.addProduct(productData);
      
      // Redirect to products page after successful submission
      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Gagal menambahkan produk. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-8 mb-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Tambah Produk</h1>
            <Link
              to="/products"
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Kembali
            </Link>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-2"
              >
                Nama Produk
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan nama produk"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-medium mb-2"
              >
                Harga Produk
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full px-3 py-2 border rounded ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan harga produk"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-gray-700 font-medium mb-2"
              >
                Kategori
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="men's clothing">Pakaian Pria</option>
                <option value="women's clothing">Pakaian Wanita</option>
                <option value="jewelery">Perhiasan</option>
                <option value="electronics">Elektronik</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Deskripsi Produk
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`w-full px-3 py-2 border rounded ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan deskripsi produk"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-medium mb-2"
              >
                URL Gambar
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Masukkan URL gambar produk"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Tambah Produk"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tambahproduk;
