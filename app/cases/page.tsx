"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CasesPage() {
  const cases = [
    {
      id: "pauline",
      name: "Pauline Diaz",
      title: "Last Trip for Pauline",
      caseNumber: "1743-9930-ZW",
      status: "Active Investigation",
      description: "Suspicious drowning incident at beach resort",
      image: "/Cases/pauline-polaroid.png",
      priority: "HIGH",
      isLocked: false,
    },
    {
      id: "bautista",
      name: "Arturo Bautista",
      title: "The Bautista Legacy",
      caseNumber: "BX25-02",
      status: "Active Investigation",
      description: "Mysterious death of business tycoon - poisoning suspected",
      image: "/Cases/bautista-polaroid.png",
      priority: "CRITICAL",
      isLocked: false,
    },
    {
      id: "coming-soon",
      name: "Classified",
      title: "Next Case Loading...",
      caseNumber: "???-???-??",
      status: "Coming Soon",
      description: "New investigation files being prepared",
      image: "/Cases/comingsoon-polaroid.png",
      priority: "PENDING",
      isLocked: true,
    },
  ];

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg uppercase tracking-wider"
          >
            Active Investigations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300"
          >
            Select a case to begin investigation
          </motion.p>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseFile, index) => (
            <motion.div
              key={caseFile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {caseFile.isLocked ? (
                // Locked Case (Coming Soon)
                <div className="group bg-black/60 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden shadow-2xl cursor-not-allowed opacity-75">
                  <div className="relative h-64 overflow-hidden bg-black">
                    <img
                      src={caseFile.image}
                      alt={caseFile.name}
                      className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    
                    {/* Lock Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <p className="text-gray-400 font-bold uppercase tracking-wider">Coming Soon</p>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-gray-700 border border-gray-600 text-gray-400 text-xs font-bold uppercase tracking-wider rounded">
                        {caseFile.priority}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                        Case No: {caseFile.caseNumber}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-500 mb-2">
                      {caseFile.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm mb-4">
                      {caseFile.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 uppercase tracking-wider">
                        {caseFile.status}
                      </span>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm font-semibold uppercase">Locked</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Active Case
                <Link href={`/cases/${caseFile.id}`}>
                  <div className="group bg-black/40 backdrop-blur-sm border border-red-900/50 rounded-lg overflow-hidden hover:border-red-700 transition-all duration-300 shadow-2xl hover:shadow-red-900/50 cursor-pointer">
                    <div className="relative h-64 overflow-hidden bg-black">
                      <img
                        src={caseFile.image}
                        alt={caseFile.name}
                        className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 border text-white text-xs font-bold uppercase tracking-wider rounded ${
                          caseFile.priority === 'CRITICAL' 
                            ? 'bg-red-900 border-red-700' 
                            : 'bg-red-900/90 border-red-700'
                        }`}>
                          {caseFile.priority}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-xs text-red-400 font-mono uppercase tracking-wider">
                          Case No: {caseFile.caseNumber}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                        {caseFile.title}
                      </h3>
                      
                      <h4 className="text-lg text-gray-400 mb-2">
                        {caseFile.name}
                      </h4>
                      
                      <p className="text-gray-400 text-sm mb-4">
                        {caseFile.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          {caseFile.status}
                        </span>
                        
                        <div className="flex items-center gap-2 text-red-500 group-hover:text-red-400 transition-colors">
                          <span className="text-sm font-semibold uppercase">Open File</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-500 uppercase tracking-wider">
            More files coming soon...
          </p>
        </motion.div>
      </div>
    </div>
  );
}