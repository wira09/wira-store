import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 relative shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-blue-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon hamburger */}
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                // Icon close
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Logo & Desktop menu */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/home">
                <img
                  // src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
                  src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                  alt="Logo"
                  className="h-8 w-auto text-white"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/home"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Products
                </Link>
                <Link
                  to="/categories"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Categories
                </Link>
              </div>
            </div>
          </div>

          {/* User menu */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user ? (
              <div className="relative ml-3">
                <div className="flex items-center space-x-3">
                  <span className="text-white text-sm font-medium hidden md:block">
                    Hi, {user.name || user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:bg-blue-700 px-3 py-1 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/"
                  className="text-white hover:bg-blue-700 px-3 py-1 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:bg-blue-700 px-3 py-1 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/home"
            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
          >
            Products
          </Link>
          <Link
            to="/categories"
            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
          >
            Categories
          </Link>
          {user ? (
            <>
              <span className="block px-3 py-2 text-base font-medium text-white">
                Hi, {user.name || user.username}
              </span>
              <button
                onClick={handleLogout}
                className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
