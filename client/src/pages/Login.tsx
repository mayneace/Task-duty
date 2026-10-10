import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate("/myTask");
  };

  return (
    <section className="flex flex-col gap-10 mt-10 mx-auto max-w-md px-6 py-14">
      <h1 className="mb-6 font-serif text-3xl font-medium text-[#171332]/30">
        Log in to TaskDuty
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            className="w-full rounded-lg border border-[#E3E0ED] bg-white px-4 py-3 pr-16"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-sm font-medium text-[#6C4CE0] hover:underline"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-[#6C4CE0] py-3 font-semibold text-white"
        >
          Done
        </button>
        <Link to="/register" className="text-center text-sm text-[#6C4CE0]">
          Need an account? Register
        </Link>
      </form>
    </section>
  );
};

export default Login;
