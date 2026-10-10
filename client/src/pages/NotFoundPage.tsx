import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Main content */}
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
        {/* Large 404 */}
        <h1 className="font-bold text-[120px] md:text-[200px] text-gray-300 leading-none select-none animate-pulse">
          404
        </h1>

        <div className="-mt-8 md:-mt-12 flex flex-col items-center gap-6">
          <h2 className="font-bold text-[28px] md:text-[40px] tracking-[1.5px] uppercase text-black">
            Page Not Found
          </h2>
          <p className="text-[15px] leading-relaxed text-black/50 max-w-120">
            Oops! Looks like the page you're looking for doesn't exist or has
            been moved. Let's get you back.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => navigate(-1)}
              className="border border-black text-black font-bold text-[13px] tracking-[1px] uppercase 
           px-8 py-4 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer rounded-4xl"
            >
              Go Back
            </button>
            <Link to="/">
              <button
                className="bg-[#974FD0] text-white font-bold text-[13px] tracking-[1px] uppercase 
           px-8 py-4 hover:bg-[#bc7af2] transition-colors duration-200 cursor-pointer rounded-4xl"
              >
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
