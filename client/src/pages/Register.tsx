import React from "react";
import { useState } from "react";
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
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/myTask");
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Login failed");
    }
  };

  return (
    <section className="flex flex-col gap-10 mt-10 mx-auto max-w-md px-6 py-14">
      <h1 className="mb-6 font-serif text-3xl font-medium text-[#171332]/30">
        Get started on TaskDuty
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="rounded-lg border border-[#E3E0ED] bg-white px-4 py-3"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="rounded-lg border border-[#E3E0ED] bg-white px-4 py-3"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-lg border border-[#E3E0ED] bg-white px-4 py-3 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#8B87A3] hover:text-[#171332]"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="w-full rounded-lg border border-[#E3E0ED] bg-white px-4 py-3 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#8B87A3] hover:text-[#171332]"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {error && <p className="text-sm text-[#974FD0]">{error}</p>}
        <button
          type="submit"
          className="rounded-lg bg-[#6C4CE0] py-3 font-semibold text-white"
        >
          Done
        </button>
        <Link to="/login" className="text-center text-sm text-[#6C4CE0]">
          Have an account? Login
        </Link>
      </form>
    </section>
  );
};

export default Register;
