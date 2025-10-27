"use client";

import { motion } from "framer-motion";
import { Users, Heart, Gamepad2, BookOpen, Shield, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/components/ProtectedRoute";

function AboutContent() {
  const router = useRouter();

  const features = [
    {
      icon: Gamepad2,
      title: "First of Its Kind",
      description: "The Philippines' first detective case game featuring Filipino-inspired crime stories"
    },
    {
      icon: BookOpen,
      title: "Crafted Stories",
      description: "Every case, clue, and twist carefully designed to reflect Filipino society"
    },
    {
      icon: Heart,
      title: "Passionate Team",
      description: "Storytellers, developers, and mystery enthusiasts giving our very best"
    },
    {
      icon: Sparkles,
      title: "Immersive Experience",
      description: "A world where every detail matters and every choice reveals the truth"
    }
  ];

  const values = [
    {
      title: "Authenticity",
      description: "Filipino culture and society at the heart of every story",
      emoji: "🇵🇭"
    },
    {
      title: "Excellence",
      description: "Committed to delivering the best in writing and design",
      emoji: "⭐"
    },
    {
      title: "Innovation",
      description: "Breaking new ground in Filipino game development",
      emoji: "💡"
    },
    {
      title: "Integrity",
      description: "Respectful storytelling with fictional narratives",
      emoji: "🤝"
    }
  ];

  const handleStartInvestigating = () => {
    router.push("/cases");
  };

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-red-900/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-red-900/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <Users className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 mx-auto" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-widest uppercase text-red-500 mb-4">
            About Us
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent max-w-md mx-auto"
          />
        </motion.div>

        {/* Main Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-10 border border-gray-700 mb-12"
        >
          <div className="space-y-6 text-gray-200 text-base sm:text-lg leading-relaxed">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              We are a <span className="text-red-500 font-semibold">passionate team of storytellers, game developers, and mystery enthusiasts</span> based in the Philippines, dedicated to bringing Filipino-inspired crime stories to life through immersive and thought-provoking gameplay.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Our detective case game is <span className="text-red-500 font-semibold">the first of its kind in the Philippines</span>—a thrilling fusion of mystery, culture, and investigation inspired by real Filipino crimes and legends, <span className="text-red-400 font-semibold">yet entirely fictional</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Every case, clue, and twist is carefully crafted to reflect the depth of Filipino society—its secrets, untold stories, and resilience—while drawing players into a world where <span className="text-red-500 font-semibold">every detail matters and every choice could reveal the truth</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              We are committed to giving our very best in everything we do—from the writing to the design—to deliver not just a game, but <span className="text-red-500 font-semibold">an experience that challenges your mind, sharpens your instincts, and immerses you in the heart of Filipino crime-solving</span> like never before.
            </motion.p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-12 h-12 text-red-500 mb-4" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-10 border border-gray-700 mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-red-500 mb-8 text-center uppercase tracking-wider">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + (0.1 * index) }}
                whileHover={{ scale: 1.05 }}
                className="bg-black/30 rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl">{value.emoji}</span>
                  <h3 className="text-xl font-bold text-red-500 uppercase tracking-wide">
                    {value.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="bg-red-900/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-red-900/30"
        >
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3 uppercase tracking-wide">
                Important Disclaimer
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                <span className="font-semibold text-white">This game is a work of fiction.</span> Names, characters, businesses, places, events, and incidents are either the products of the creators' imagination or are used in a fictitious manner. Any resemblance to actual persons, living or dead, or actual events is <span className="font-semibold text-red-500">purely coincidental</span>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-center mt-12"
        >
          <motion.p
            className="text-gray-400 text-lg mb-6"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Ready to solve the mystery?
          </motion.p>
          <motion.button
            onClick={handleStartInvestigating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-900 hover:bg-red-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,0,0,0.5)] uppercase tracking-wider border-2 border-red-700"
          >
            Start Investigating
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <ProtectedRoute>
      <AboutContent />
    </ProtectedRoute>
  );
}