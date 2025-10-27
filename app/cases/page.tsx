"use client";

import { motion } from "framer-motion";
import ProtectedRoute from "@/app/components/ProtectedRoute";

function CasesContent() {
  const cases = [
    {
      id: 1,
      name: "Last Trip for Pauline",
      code: "1743-9930-ZW",
      image: "/Cases/pauline-polaroid.png",
      status: "Active",
      priority: "High"
    },
    {
      id: 2,
      name: "The Bautista Legacy",
      code: "BX25-02",
      image: "/Cases/bautista-polaroid.png",
      status: "Active",
      priority: "Medium"
    },
    {
      id: 3,
      name: "Next Case Loading...",
      code: "COMING SOON",
      image: "/Cases/comingsoon-polaroid.png",
      status: "Pending",
      priority: "Low"
    },
  ];

  return (
    <div className="relative min-h-screen w-full text-white">
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 px-4 pt-32 sm:pt-40 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-widest uppercase bg-red-900/80 backdrop-blur-md inline-block mx-auto px-6 sm:px-10 py-3 sm:py-4 rounded-xl shadow-lg mb-8 sm:mb-12"
        >
          Active Investigations
        </motion.h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-24">
          {cases.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05, rotate: i === 1 ? -1.5 : 1.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-crime-yellow transition-all duration-300 hover:shadow-[0_0_25px_#facc15aa]"
            >
              <div className="w-full h-[280px] sm:h-[320px] md:h-[380px] flex items-center justify-center bg-black/40 p-4">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-contain rounded-t-2xl"
                />
              </div>

              <div className="p-4 sm:p-6 bg-black/80 backdrop-blur-md rounded-b-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
                    c.status === 'Active' 
                      ? 'bg-green-900/50 text-green-400 border border-green-700' 
                      : 'bg-gray-700 text-gray-400 border border-gray-600'
                  }`}>
                    {c.status}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
                    c.priority === 'High' 
                      ? 'bg-red-900/50 text-red-400 border border-red-700'
                      : c.priority === 'Medium'
                      ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-700'
                      : 'bg-blue-900/50 text-blue-400 border border-blue-700'
                  }`}>
                    {c.priority}
                  </span>
                </div>

                <h2 className="text-crime-yellow text-lg sm:text-xl font-bold uppercase tracking-widest mb-2">
                  {c.name}
                </h2>
                <p className="text-gray-400 text-sm tracking-widest mb-4">
                  Case No.: <span className="text-crime-yellow font-mono">{c.code}</span>
                </p>

                {c.status === 'Active' && (
                  <button className="w-full bg-crime-red hover:bg-crime-red/80 text-white py-2 sm:py-3 rounded-lg transition-all duration-300 uppercase tracking-wider text-sm font-semibold hover:shadow-[0_0_15px_rgba(127,29,29,0.5)]">
                    View Case File
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CasesPage() {
  return (
    <ProtectedRoute>
      <CasesContent />
    </ProtectedRoute>
  );
}