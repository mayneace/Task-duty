import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const success = await register(name, email, password);
    if (success) navigate("/myTask");
  };

  return (
    <section className="flex flex-col gap-3 mt-5 sm:mt-20 mx-auto max-w-md sm:max-w-2xl px-6 py-14">
      <h1 className="text-lg sm:text-2xl text-start font-bold text-[#974FD0]/90">
        Get started on TaskDuty with an Account
      </h1>

      <p className="text-sm sm:text-lg text-start font-medium tracking-tight sm:tracking-wide text-[#974FD0]/80">
        A TaskDuty Account lets you access multiple TaskDuty tech, such as full
        access to the webApp, easily and securely.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="rounded-xl border border-[#E3E0ED] bg-white px-4 py-3 placeholder:text-[#974FD0]/70"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="rounded-xl border border-[#E3E0ED] bg-white px-4 py-3 placeholder:text-[#974FD0]/70"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-xl border border-[#E3E0ED] bg-white px-4 py-3 pr-12 placeholder:text-[#974FD0]/70"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#974FD0]"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="w-full rounded-xl border border-[#E3E0ED] bg-white px-4 py-3 pr-12 placeholder:text-[#974FD0]/70"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#974FD0]"
          >
            {showConfirm ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <button
          type="submit"
          className="rounded-full bg-[#974FD0] py-3 font-semibold text-white hover:bg-[#974FD0]/80"
        >
          Submit
        </button>
        <Link to="/login" className="py-2 text-center text-sm text-[#974FD0] ">
          Have an account? Login
        </Link>
      </form>
    </section>
  );
};

export default Register;
