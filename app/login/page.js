"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { login } from "../actions/userActions";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.success) {
        toast.success(response.success);
        router.push("/");
      } else {
        toast.error(response.error || "Login failed");
      }
    } catch (error) {
      toast.error(error.message || "Unexpected error");
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-5 mb-5">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Your email..."
              className="border rounded w-full py-2 px-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Set password ..."
              className="border rounded w-full py-2 px-3"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>

            <p>
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
