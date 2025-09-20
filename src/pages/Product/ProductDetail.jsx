import { useState, useEffect } from "react";
import { productService } from "../../api/fakeStoreApi";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getById(id);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError("Gagal memuat detail produk");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat detail produk...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Coba Lagi
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {product && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-10">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-96 max-w-full object-contain"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h1 className="text-2xl font-bold text-gray-900">
                  {product.title}
                </h1>
                <div className="mt-2 flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-gray-600">
                    {product.rating?.rate || "4.5"} ({product.rating?.count || "0"} ulasan)
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold text-blue-600">
                  ${product.price}
                </p>
                <p className="mt-6 text-gray-700">{product.description}</p>
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Kategori
                  </h2>
                  <p className="mt-2 text-gray-600 capitalize">{product.category}</p>
                </div>
                <div className="mt-8 flex space-x-4">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
                    Beli Sekarang
                  </button>
                  <button className="flex-1 border border-blue-600 text-blue-600 py-3 px-4 rounded-md hover:bg-blue-50 transition-colors duration-300">
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}