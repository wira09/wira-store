import { motion } from "framer-motion";
import ProductMarquee from "../components/ProductMarquee";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { productService } from "../api/fakeStoreApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAll().then((res) => {
      setProducts(res.data.slice(0, 8));
      setLoading(false);
    });
  }, []);

  return (
    <div className="mb-10">
      <Navbar />
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Wira Store
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-blue-100 mt-4"
          >
            Store modern untuk gaya hidupmu
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <Link
              to="/products"
              className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-blue-50 transition-colors duration-300"
            >
              Belanja Sekarang
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductMarquee />

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Produk Terbaru
          </h2>
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-12">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-lg font-semibold text-blue-600">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
