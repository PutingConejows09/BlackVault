"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (login(username, password)) {
      router.push("/cases"); // CHANGED: from /dashboard to /cases
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm">
        <div className="bg-red-900/20 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-red-500/20">
          <h1 className="text-2xl font-bold text-white text-center mb-6 tracking-wider">
            ENTER CREDENTIALS
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition text-sm backdrop-blur-sm"
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
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition text-sm backdrop-blur-sm"
                required
                suppressHydrationWarning
              />
            </div>

            {error && (
              <p className="text-yellow-300 text-xs text-center bg-black/40 py-2 rounded">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-black/40 border border-white/30 text-white rounded-lg hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition font-semibold tracking-wide text-sm backdrop-blur-sm"
              suppressHydrationWarning
            >
              ACCESS VAULT
            </button>
          </form>

          <p className="text-center text-gray-300 text-xs mt-5 flex items-center justify-center gap-1">
            <span>🔒</span> Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}