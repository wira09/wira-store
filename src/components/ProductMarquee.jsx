import Marquee from "./animata/container/Marquee";
import { productService } from "../api/fakeStoreApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductMarquee() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getAll().then((res) => setProducts(res.data.slice(0, 10)));
  }, []);

  return (
    <div className="my-12 bg-gradient-to-r from-blue-50 to-indigo-50 py-8 rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
        🔥 Produk Terlaris
      </h2>
      <Marquee
        pauseOnHover={true} className="max-w-full [--duration:40s]"
        reverse={false}
      >
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="flex-shrink-0 w-48 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-32 flex items-center justify-center p-2">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="p-3">
              <h3 className="text-xs font-medium text-gray-900 line-clamp-2 h-10">
                {product.title}
              </h3>
              <p className="mt-1 text-sm font-bold text-blue-600">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </Marquee>
    </div>
  );
}
