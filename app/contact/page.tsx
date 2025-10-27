"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import ProtectedRoute from "@/app/components/ProtectedRoute";

function ContactContent() {
  const contactInfo = [
    {
      icon: Mail,
      label: "EMAIL",
      value: "inv.blackvault@gmail.com",
      href: "mailto:inv.blackvault@gmail.com"
    },
    {
      icon: Phone,
      label: "PHONE",
      value: "+63 985 403 2959",
      href: "tel:+639854032959"
    }
  ];

  return (
    <div className="relative min-h-screen w-full text-white flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-widest uppercase text-yellow-400 mb-3">
            CONTACT US
          </h1>
          <p className="text-gray-300 text-sm sm:text-lg">
            Get in touch with Black Vault Investigations
          </p>
        </motion.div>

        <div className="space-y-4">
          {contactInfo.map((info, i) => {
            const Icon = info.icon;
            return (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="block bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-gray-700 hover:border-yellow-400 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-400/20 p-4 rounded-full flex-shrink-0">
                    <Icon className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      {info.label}
                    </h3>
                    <p className="text-base sm:text-lg text-white font-semibold break-all">
                      {info.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 text-xs sm:text-sm flex items-center justify-center gap-2">
            <span>🔒</span>
            <span>All inquiries are strictly confidential</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <ProtectedRoute>
      <ContactContent />
    </ProtectedRoute>
  );
}