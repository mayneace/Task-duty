import React from "react";
import logo from "../assets/logo.png";
import displaypicture from "../assets/Group 6.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar: React.FC = () => {
  const location = useLocation();

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const allLinks = () => {
    return location.pathname === "/" ? (
      <>
        <Link
          to="/newTask"
          className="text-[#292929] font-medium text-sm sm:text-xl transform transition-all duration-300 hover:scale-105 active:translate-y-2"
        >
          New Tasks
        </Link>
        <Link
          to="./myTask"
          className="text-[#292929] font-medium text-sm sm:text-xl transform transition-all duration-300 hover:scale-105 active:translate-y-2"
        >
          All Tasks
        </Link>
      </>
    ) : location.pathname === "/myTask" ? (
      <Link
        to="/newTask"
        className="text-[#292929] font-medium text-sm sm:text-xl transform transition-all duration-300 hover:scale-105 active:translate-y-2"
      >
        New Tasks
      </Link>
    ) : location.pathname === "/newTask" ? (
      <Link
        to="/myTask"
        className="text-[#292929] font-medium text-sm sm:text-xl transform transition-all duration-300 hover:scale-105 active:translate-y-2"
      >
        All Tasks
      </Link>
    ) : location.pathname.startsWith("/editTask") ? (
      <Link
        to="/myTask"
        className="text-[#292929] font-medium text-sm sm:text-xl transform transition-all duration-300 hover:scale-105 active:translate-y-2"
      >
        All Tasks
      </Link>
    ) : null;
  };

  return (
    <nav className=" sticky z-20 w-full px-6 sm:px-[clamp(1rem,11.40vw,200px)] pt-8">
      <div className="flex items-center justify-between border-b-2 border-white bg-linear-to-b from-gray-300/10 via-gray-400/20 to-gray-300/10 backdrop-blur-xs sm:backdrop-blur-sm transition-all duration-300 rounded-4xl transform group shadow-[0_6px_25px_rgba(0,0,0,0.10)] inset-shadow-sm px-6">
        <Link to="/">
          <div className="flex items-center gap-5 py-4">
            <img src={logo} alt="" className="w-8" />

            <p className="font-semibold md:text-2xl no-underline text-[#2D0050] transform transition-all duration-300 hover:scale-103">
              TaskDuty
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-10">
          {user && allLinks()}

          {user ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer text-sm sm:text-xl font-medium text-[#292929] transition-all duration-300 hover:scale-103"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm sm:text-xl font-medium text-[#292929] transition-all duration-300 hover:scale-103"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-sm sm:text-xl font-medium text-[#292929] transition-all duration-300 hover:scale-103"
              >
                Sign up
              </Link>
            </>
          )}

          <img src={displaypicture} alt="" className="w-12" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
