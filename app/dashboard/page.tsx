"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header - Mobile Optimized */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <h1 className="text-sm font-bold">WELCOME, INVESTIGATORS!</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded flex items-center gap-1"
          >
            <span>↪</span> LOGOUT
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Welcome Message */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <p className="text-sm text-gray-400">Welcome back,</p>
          <p className="text-lg font-bold text-yellow-400">
            {user?.email || "admin@investigators.com"}
          </p>
        </div>

        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-3 gap-3">
          {/* Open Cases */}
          <div className="bg-gray-800 rounded-lg p-4 border border-green-500/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">1</div>
              <div className="text-xs text-gray-400 mt-1">Open Cases</div>
              <div className="text-green-400 text-2xl mt-2">📋</div>
            </div>
          </div>

          {/* Pending Review */}
          <div className="bg-gray-800 rounded-lg p-4 border border-yellow-500/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">1</div>
              <div className="text-xs text-gray-400 mt-1">Pending Review</div>
              <div className="text-yellow-400 text-2xl mt-2">⏱️</div>
            </div>
          </div>

          {/* Closed Cases */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-500/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-400">1</div>
              <div className="text-xs text-gray-400 mt-1">Closed Cases</div>
              <div className="text-gray-400 text-2xl mt-2">📁</div>
            </div>
          </div>
        </div>

        {/* Recent Case Files */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h2 className="text-sm font-bold mb-4 uppercase tracking-wider">
            Recent Case Files
          </h2>

          <div className="space-y-3">
            {/* Case 1 */}
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-mono text-xs">CF-001</span>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded">
                    OPEN
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-sm mb-1">THE MIDNIGHT HEIST</h3>
              <p className="text-xs text-gray-400 mb-3">
                Assigned to: Det. Sarah Chen • Last updated: 2024-01-15
              </p>
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold py-2 rounded">
                View Details
              </button>
            </div>

            {/* Case 2 */}
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-mono text-xs">CF-002</span>
                  <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded">
                    PENDING
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-sm mb-1">MISSING PERSON - JOHN DOE</h3>
              <p className="text-xs text-gray-400 mb-3">
                Assigned to: Det. Mike Torres • Last updated: 2024-01-14
              </p>
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold py-2 rounded">
                View Details
              </button>
            </div>

            {/* Case 3 */}
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-mono text-xs">CF-003</span>
                  <span className="bg-gray-500/20 text-gray-400 text-xs px-2 py-0.5 rounded">
                    CLOSED
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-sm mb-1">ART FRAUD INVESTIGATION</h3>
              <p className="text-xs text-gray-400 mb-3">
                Assigned to: Det. Sarah Chen • Last updated: 2024-01-10
              </p>
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold py-2 rounded">
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3 pb-6">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2">
            <span className="text-xl">+</span>
            <span>Create New Case File</span>
          </button>
          
          <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 border border-gray-600">
            <span className="text-xl">🔍</span>
            <span>Search Archives</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation (Optional) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-3">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center gap-1 text-yellow-400">
            <span className="text-xl">📊</span>
            <span className="text-xs">Dashboard</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white">
            <span className="text-xl">📁</span>
            <span className="text-xs">Cases</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white">
            <span className="text-xl">👥</span>
            <span className="text-xs">About</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white">
            <span className="text-xl">✉️</span>
            <span className="text-xs">Contact</span>
          </button>
        </div>
      </nav>
    </div>
  );
}