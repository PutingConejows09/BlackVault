"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        {/* Main Title - Mobile Optimized */}
        <h1 className="text-5xl sm:text-7xl font-bold text-white mb-4 tracking-widest animate-fadeIn">
          COLD CASES
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-sm sm:text-lg mb-10 tracking-wide">
          Unsolved Mysteries • Criminal Investigations
        </p>

        {/* Call to Action Button */}
        <Link 
          href="/login" 
          className="inline-block bg-red-900/60 backdrop-blur-lg hover:bg-red-800/70 text-white px-8 py-3 rounded-full text-sm sm:text-base font-semibold transition border-2 border-white/40 hover:border-yellow-400 hover:scale-105 tracking-wider"
        >
          ENTER INVESTIGATION ROOM
        </Link>

        {/* Tagline */}
        <p className="text-gray-500 text-xs sm:text-sm mt-10 italic tracking-wider">
          "Where Every Detail Matters"
        </p>
      </div>
    </div>
  );
}