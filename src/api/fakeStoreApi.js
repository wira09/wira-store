import axios from "axios";
// api fake store
const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const productService = {
  // Get all products
  getAll: () => api.get("/products"),
  //   Get products by category
  getByCategory: (category) => api.get(`/products/category/${category}`),
  //   Get product by id
  getById: (id) => api.get(`/products/${id}`),
  // Add new product
  // addProduct: (productData) => {
  //   // Note: Fake Store API doesn't actually support adding products
  //   // This is a mock implementation for demonstration
  //   console.warn("Fake Store API doesn't support adding products. This is a mock implementation.");
  //   return Promise.resolve({
  //     data: {
  //       id: Date.now(),
  //       ...productData
  //     }
  //   });
  // },
};
// login
export const authService = {
  login: (credentials) => api.post("/auth/login", credentials),
};
// register
export const userService = {
  register: (userData) => api.post("/users", userData),
};
