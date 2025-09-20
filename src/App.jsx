import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductsPage from "./pages/Product/ProductsPage";
import ProductDetail from "./pages/Product/ProductDetail";
import Tambahproduk from "./pages/Product/Tambahproduk";
import CategoriesPage from "./pages/Category/CategoriesPage";
import CategoryDetail from "./pages/Category/CategoryDetail";
import Chatbot from "./components/Chatbot";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/tambahproduk" element={<Tambahproduk />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:category" element={<CategoryDetail />} />
        </Routes>
        <Chatbot />
      </Router>
    </AuthProvider>
  );
}

export default App;
