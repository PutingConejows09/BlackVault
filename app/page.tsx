"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleEnter = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="text-center z-10 px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-[0_0_30px_rgba(139,0,0,0.8)]">
          BLACK VAULT
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-12 font-light tracking-wider">
          Investigators Case Files
        </p>

        <button
          onClick={handleEnter}
          className="group relative px-12 py-5 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold text-lg rounded-lg shadow-2xl shadow-red-900/50 transition-all duration-300 hover:scale-105 active:scale-95 border border-red-700"
        >
          <span className="relative z-10 flex items-center gap-3">
            ENTER INVESTIGATION ROOM
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>

        <p className="mt-8 text-sm text-gray-400 uppercase tracking-widest">
          Confidential Access Only
        </p>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-8 w-20 h-20 border-t-4 border-l-4 border-red-900/50" />
        <div className="absolute top-8 right-8 w-20 h-20 border-t-4 border-r-4 border-red-900/50" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-b-4 border-l-4 border-red-900/50" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-b-4 border-r-4 border-red-900/50" />
      </div>
    </div>
  );
}