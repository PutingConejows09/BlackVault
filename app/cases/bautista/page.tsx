"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Home, AlertTriangle, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BautistaCasePage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [suspectAnswer, setSuspectAnswer] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const caseNotes = [
    {
      id: "A",
      title: "FIRST IMPRESSIONS",
      subtitle: "1. THE CALM BEFORE MIDNIGHT",
      content: "The night looked normal at first. But what small things from that evening might actually be important?",
      bgImage: "/Cases/case-note-bg.jpg"
    },
    {
      id: "B",
      title: "FIRST IMPRESSIONS",
      subtitle: "2. ARTURO'S ABSENCE",
      content: "With Arturo gone, someone will surely benefit. Who do you think gains most from his absence?",
      bgImage: "/Cases/case-note-bg.jpg"
    },
    {
      id: "C",
      title: "FIRST IMPRESSIONS",
      subtitle: "3. THE PRICE OF TRUST",
      content: "In families tied to money and power, trust is fragile. Where can you see signs that trust was already broken?",
      bgImage: "/Cases/case-note-bg.jpg"
    },
    {
      id: "D",
      title: "HIDDEN CONNECTIONS",
      subtitle: "4. SHADOWS OF THE PAST",
      content: "Old choices don't just disappear. How might past actions have influenced what happened now?",
      bgImage: "/Cases/case-note-bg.jpg"
    },
    {
      id: "E",
      title: "HIDDEN CONNECTIONS",
      subtitle: "5. TIES THAT BIND, TIES THAT BREAK",
      content: "Families can hold both loyalty and resentment. Which relationships look the most strained to you?",
      bgImage: "/Cases/case-note-bg.jpg"
    },
    {
      id: "F",
      title: "WHAT LIES WITHIN",
      subtitle: "6. HIDDEN LAYERS",
      content: "Big fights don't happen overnight. What clues suggest someone finally lost control?",
      bgImage: "/Cases/case-note-bg.jpg"
    },
    {
      id: "G",
      title: "WHAT LIES WITHIN",
      subtitle: "7. BENEATH THE SURFACE",
      content: "This case isn't just about land or money. What deeper truth do you think lies at the center of it all?",
      bgImage: "/Cases/case-note-bg.jpg"
    },
    {
      id: "H",
      title: "THE VERDICT",
      subtitle: "FINAL DEBATE",
      content: "All evidence has been laid out. It's time to weigh the facts and deliver your verdict. Who do you hold accountable for Arturo's fate? Present your suspect, defend your reasoning with the reports at hand, and confront opposing views. When you're certain, type your answer.",
      isVerdict: true
    }
  ];

  const validateSuspect = (answer: string) => {
    const cleanAnswer = answer.trim().toLowerCase();
    const validAnswers = [
      "ramon bautista",
      "ramon",
      "bautista ramon",
      "bautista, ramon"
    ];
    
    return validAnswers.some(valid => cleanAnswer === valid);
  };

  const handleSubmit = () => {
    if (validateSuspect(suspectAnswer)) {
      setShowSuccess(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
      }, 2000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleNext = () => {
    if (currentPage < caseNotes.length) {
      setCurrentPage(currentPage + 1);
      setShowError(false);
      setShowSuccess(false);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleHome = () => {
    router.push("/cases");
  };

  // Success Page
  if (showSuccess && currentPage === caseNotes.length - 1) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wider">
            EXCELLENT WORK, INSPECTOR!
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            You've cracked the puzzle.
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Now it's time to reveal why it happened, how it unfolded, and when it all began.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-crime-yellow hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg text-lg uppercase tracking-wider"
          >
            Proceed to the final investigation report inside the case file
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Final Investigation Report
  if (currentPage === caseNotes.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center border-b border-crime-yellow pb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-crime-yellow mb-2 uppercase tracking-widest">
                Final Investigation Report
              </h1>
              <p className="text-xl text-gray-400 font-mono">CASE NO.: BX25-02</p>
              <p className="text-lg text-crime-red font-semibold">CLASSIFIED: HIGHEST PRIORITY</p>
            </div>

            {/* Suspect Profile */}
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">
                🎯 PRIMARY SUSPECT: RAMON BAUTISTA
              </h2>
              <div className="space-y-3 text-gray-300">
                <p><span className="font-bold text-white">Age:</span> 42 years old</p>
                <p><span className="font-bold text-white">Relationship:</span> Brother of Arturo Bautista</p>
                <p><span className="font-bold text-white">Occupation:</span> Business Partner & Co-owner of family land</p>
                <p><span className="font-bold text-white">Status:</span> Under investigation for fratricide</p>
              </div>
            </div>

            {/* Key Evidence */}
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">
                📋 Key Evidence
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-crime-red mt-1">▸</span>
                  <span><span className="font-bold text-white">Financial Records:</span> Ramon had mounting debts (₱85M) and stood to inherit Arturo's share of the family estate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-crime-red mt-1">▸</span>
                  <span><span className="font-bold text-white">Witness Accounts:</span> Multiple witnesses reported heated arguments between the brothers in the weeks before Arturo's death</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-crime-red mt-1">▸</span>
                  <span><span className="font-bold text-white">Timeline:</span> Ramon had no verifiable alibi for the time of death and was last seen near Arturo's residence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-crime-red mt-1">▸</span>
                  <span><span className="font-bold text-white">Physical Evidence:</span> Forensic analysis linked Ramon to the scene through fiber evidence and fingerprints on key items</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-crime-red mt-1">▸</span>
                  <span><span className="font-bold text-white">Motive Documentation:</span> Email correspondence showed Ramon desperately trying to convince Arturo to sell the family land</span>
                </li>
              </ul>
            </div>

            {/* Motive */}
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">
                💰 Established Motive
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Ramon Bautista was facing financial ruin from failed business ventures and mounting gambling debts totaling ₱85 million. Arturo had consistently refused to sell their jointly-owned family land, which was worth over ₱200 million. With Arturo gone, Ramon would inherit his brother's share and have full control to sell the property. The pressure from loan sharks and the imminent foreclosure of Ramon's other assets created a perfect storm of desperation. Family members reported that Ramon had become increasingly volatile and unstable in recent months, often making threatening remarks about "solving the problem once and for all."
              </p>
            </div>

            {/* Conclusion */}
            <div className="bg-white/5 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-yellow mb-4 uppercase tracking-wide">
                ⚖️ Investigator's Conclusion
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Based on forensic evidence, financial analysis, witness statements, and timeline reconstruction, there is overwhelming evidence that <span className="text-crime-red font-bold">Ramon Bautista murdered his brother, Arturo Bautista</span>, to gain full control of the family estate and resolve his crippling financial crisis. The crime was premeditated, driven by greed and desperation, and executed with calculated precision.
              </p>
              <p className="text-gray-400 text-sm italic">
                Case forwarded to National Bureau of Investigation. Arrest warrant issued. Investigation status: CLOSED - SUSPECT IDENTIFIED AND CHARGED.
              </p>
            </div>

            {/* Home Button */}
            <div className="text-center pt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleHome}
                className="bg-crime-yellow hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg text-lg uppercase tracking-wider flex items-center gap-2 mx-auto"
              >
                <Home className="w-5 h-5" />
                Return to Cases
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentNote = caseNotes[currentPage];

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/ABOUT US/BLOODY BG.PNG')`,
          filter: 'brightness(0.3)'
        }}
      />

      {/* Blood splatters overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-crime-red rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-crime-red rounded-full blur-3xl" />
      </div>

      {/* Home Button */}
      <button
        onClick={handleHome}
        className="absolute top-6 right-6 text-white hover:text-crime-yellow transition z-50 text-sm uppercase tracking-wider font-semibold"
      >
        HOME
      </button>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl w-full text-center space-y-8"
          >
            {/* Case Note Header */}
            <div className="space-y-2">
              <h2 className="text-base md:text-lg text-gray-400 tracking-widest uppercase">
                CASE NOTE {currentNote.id}: {currentNote.title}
              </h2>
              <h1 className="text-3xl md:text-5xl font-bold tracking-wider uppercase">
                {currentNote.subtitle}
              </h1>
            </div>

            {/* Content */}
            <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-8 md:p-12">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                {currentNote.content}
              </p>

              {/* Verdict Input */}
              {currentNote.isVerdict && (
                <div className="mt-8 space-y-4">
                  <input
                    type="text"
                    value={suspectAnswer}
                    onChange={(e) => setSuspectAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="FULL NAME..."
                    className="w-full max-w-md mx-auto bg-white/90 text-black px-6 py-4 rounded-lg text-center font-semibold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-crime-yellow"
                  />
                  
                  <p className="text-xs text-gray-400 max-w-lg mx-auto">
                    <span className="font-bold text-crime-yellow">NOTE:</span> If correct, you will be instructed to open the final investigation report. If wrong, an error will show, and you won't be able to proceed until you've identified the right suspect.
                  </p>

                  {/* Error Message */}
                  <AnimatePresence>
                    {showError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-crime-red/20 border border-crime-red text-crime-red px-6 py-3 rounded-lg flex items-center justify-center gap-2 max-w-md mx-auto"
                      >
                        <AlertTriangle className="w-5 h-5" />
                        <span className="font-semibold">Incorrect suspect. Review the evidence.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold uppercase tracking-wider transition ${
                  currentPage === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-white/10'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {currentNote.isVerdict ? (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-crime-yellow hover:bg-yellow-500 text-black rounded-lg font-bold uppercase tracking-wider transition"
                >
                  SUBMIT
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold uppercase tracking-wider hover:bg-white/10 transition text-white"
                >
                  <span className="hidden sm:inline">Next Case Note</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}