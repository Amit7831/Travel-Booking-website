import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

import { FiAlignRight } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();

  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const getInitials = (name) => name?.charAt(0).toUpperCase() || "U";

  const navLink = (path) =>
  `relative text-sm font-semibold text-gray-600 transition-all duration-300
   hover:text-blue-600 
   after:content-[''] after:absolute after:left-0 after:-bottom-1
   after:h-[2px] after:w-0 after:bg-blue-600
   after:transition-all after:duration-300
   hover:after:w-full
   ${location.pathname === path ? "text-blue-600 after:w-full" : ""}`;


  return (
    <nav className="fixed  top-5 left-0 right-0 z-50 px-4 sm:px-10 ">
      <div className="flex justify-between  items-center  max-w-7xl mx-auto bg-white/70 backdrop-blur-md rounded-xl shadow-lg px-6 py-2 h-16 border border-white/20">

        {/* Logo */}
        <div className="flex-1 flex justify-start">

          <Link
            to="/"
            className="flex flex-col leading-none">
            <span className="text-sm font-black text-slate-800 tracking-tighter">TRAVEL</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">the world</span>
          </Link>
        </div>

        {/*Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link to="/" className={`text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors ${navLink("/")}`}>
            Home
          </Link>

          <Link to="/about" className={`text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors ${navLink("/about")}`}>
            About us
          </Link>

          <Link to="/service" className={`text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors ${navLink("/service")}`}>
            Services
          </Link>


          <Link to="/contact" className={`text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors ${navLink("/contact")}`}>
            Contact
          </Link>

          
          
        </div>


        {/*User Auth   */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {user?.role === 'user' && (
            <Link to="/my-bookings" className={`text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors ${navLink("/my-bookings")}`}>
              My Bookings
            </Link>
          )}

          {user && (
            <Link to="/profile" className="">
              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white text-sm font-bold
                 shadow-sm group-hover:bg-slate-700 transition ">
                
                {getInitials(user.name)}
              </div>
             
            </Link>

          )}

          {user?.role === "admin" && (
            <Link to="/admin"  className={`text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors ${navLink("/admin")}`}>
              Admin Panel
            </Link>
          )}

          {user ? (
            <>
              <span className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                Hi, {user.name}
              </span>

              <button
                onClick={logout}
                className="hidden sm:block  bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-red-600  hover:text-white transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm font-semibold text-gray-600 px-4 hover:text-blue-600 transition-colors">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white rounded-xl px-1 py-1 text-xs sm:px-6 sm:py-2 sm:text-sm text-center font-semibold hover:bg-slate-800 shadow-md transition"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/*Hamburger Icon for Mobile */}
        <div className="flex ml-2 sm:hidden items-center justify-end">
          {/* Hamburger */}
          <button onClick={() => setVisible(true)}
            className="md:hidden p-1  transition">
            <FiAlignRight className="w-10 h-10" />
          </button>
        </div>

      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-white/90 w-100 z-[70] shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${visible ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full font-semibold text-gray-800">


          <div
            onClick={() => setVisible(false)}
            className="p-4 cursor-pointer border-b hover:bg-gray-400 hover:text-white"
          >
            ← Back
          </div>

          <Link
            onClick={() => setVisible(false)}
            to="/"
            className="p-4 border-b hover:bg-gray-400 hover:text-white"
          >
            Home
          </Link>

          <Link
            onClick={() => setVisible(false)}
            to="/about"
            className="p-4 border-b hover:bg-gray-400  hover:text-white"
          >
            About
          </Link>

          <Link
            onClick={() => setVisible(false)}
            to="/service"
            className="p-4 border-b hover:bg-gray-400  hover:text-white"
          >
            Services
          </Link>


          <Link
            onClick={() => setVisible(false)}
            to="/contact"
            className="p-4 border-b hover:bg-gray-400 hover:text-white"
          >
            Contact
          </Link>

          {user?.role === "user" && (

            <Link
              onClick={() => setVisible(false)}
              to="/my-bookings"
              className="p-4 border-b hover:bg-gray-400 hover:text-white"
            >
              My Bookings
            </Link>
          )}
          {user &&(
            <Link
              onClick={() => setVisible(false)}
              to="/profile"
              className="p-4 border-b hover:bg-gray-400 hover:text-white"
            >
              Profile
            </Link>

          )}

          {user?.role === "admin" && (
            <Link
              onClick={() => setVisible(false)}
              to="/admin"
              className="p-4 border-b hover:bg-gray-400 text-blue-600 hover:text-white"
            >
              Admin Panel
            </Link>
          )}

          <div className="mt-auto p-4">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setVisible(false);
                }}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  onClick={() => setVisible(false)}
                  to="/login"
                  className="text-center border py-2 rounded hover:bg-gray-100"
                >
                  Login
                </Link>

                <Link
                  onClick={() => setVisible(false)}
                  to="/register"
                  className="text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav >
  );
};

export default Navbar;
