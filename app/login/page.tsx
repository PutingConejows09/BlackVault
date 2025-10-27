"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(username, password);
    if (success) {
      router.push("/cases");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" suppressHydrationWarning>
      <div className="w-full max-w-md">
        <div className="bg-red-900/20 backdrop-blur-sm border border-red-700/50 rounded-lg p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
            ACCESS CONTROL
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                required
                suppressHydrationWarning
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                required
                suppressHydrationWarning
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center bg-red-900/20 py-2 rounded border border-red-700/50">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-red-900/80 border border-red-700 text-white rounded-lg hover:bg-red-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-red-900/50"
              suppressHydrationWarning
            >
              ACCESS VAULT
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}