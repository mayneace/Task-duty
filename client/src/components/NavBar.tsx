import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import displaypicture from "../assets/Group 6.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const linkClass =
  "text-[#292929] font-medium text-xl transform transition-all duration-300 hover:scale-105";

const NavBar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/login");
  };

  // Which page links to show for users
  const getLinks = () => {
    const p = location.pathname;
    if (p === "/")
      return [
        { to: "/newTask", label: "New Tasks" },
        { to: "/myTask", label: "All Tasks" },
      ];
    if (p === "/myTask") return [{ to: "/newTask", label: "New Tasks" }];
    if (p === "/newTask" || p.startsWith("/editTask"))
      return [{ to: "/myTask", label: "All Tasks" }];
    return [];
  };
  const links = user ? getLinks() : [];

  // Close the menu whenever the page changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Stop the page behind from scrolling while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Blur overlay: mobile only, click anywhere on it to close the menu */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-10 bg-white/30 backdrop-blur-xs sm:hidden"
        />
      )}

      <nav className="sticky top-0 z-20 w-full px-6 sm:px-[clamp(1rem,11.40vw,200px)] pt-8">
        <div className="relative flex items-center justify-between border-b-2 border-white bg-linear-to-b from-gray-300/10 via-gray-400/20 to-gray-300/10 backdrop-blur-xs sm:backdrop-blur-sm transition-all duration-300 rounded-4xl shadow-[0_6px_25px_rgba(0,0,0,0.10)] inset-shadow-sm px-6">
          <Link to="/">
            <div className="flex items-center gap-5 py-4">
              <img src={logo} alt="" className="w-8" />
              <p
                className="font-semibold text-xl md:text-2xl text-[#7333a8]
               transition-all duration-300 hover:scale-103"
              >
                TaskDuty
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4 sm:gap-10">
            {/* Desktop links (hidden on mobile) */}
            <div className="hidden sm:flex items-center gap-10">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className={linkClass}>
                  {l.label}
                </Link>
              ))}

              {user ? (
                <button
                  onClick={handleLogout}
                  className={`${linkClass} cursor-pointer`}
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link to="/login" className={linkClass}>
                    Log in
                  </Link>
                  <Link to="/register" className={linkClass}>
                    Sign up
                  </Link>
                </>
              )}
            </div>

            <img src={displaypicture} alt="" className="w-9 sm:w-12" />

            {/* Hamburger (mobile only) */}
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="sm:hidden cursor-pointer text-[#292929] transition-all duration-300"
            >
              {open ? (
                <IoClose className="text-2xl text-[#7639a8]" />
              ) : (
                <GiHamburgerMenu className="text-2xl text-[#783ea7]" />
              )}
            </button>
          </div>

          {/* Mobile dropdown */}
          {open && (
            <div className="absolute left-0 right-0 top-full mt-3 flex flex-col gap-1 rounded-3xl bg-white/95 p-3 shadow-[0_10px_40px_rgba(0,0,0,0.15)] sm:hidden transition-all duration-200">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-2xl px-4 py-3 text-lg font-medium text-[#974FD0] hover:bg-[#F1EEFA]"
                >
                  {l.label}
                </Link>
              ))}

              {user ? (
                <button
                  onClick={handleLogout}
                  className="cursor-pointer rounded-2xl px-4 py-3 text-center text-lg font-medium text-orange-600 hover:bg-[#FDEEEA]"
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-2xl px-4 py-3 text-lg font-medium text-[#974FD0] hover:bg-[#F1EEFA]"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-2xl hover:bg-[#F1EEFA] px-4 py-3 text-center text-lg font-semibold text-[#974FD0]"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
