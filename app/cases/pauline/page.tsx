"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Home, AlertTriangle, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaulineCasePage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [suspectAnswer, setSuspectAnswer] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const caseNotes = [
    {
      id: "A",
      title: "FIRST DOUBTS",
      subtitle: "1. REPORT OR RUMOR?",
      content: "The report says drowning, but the first talk around the resort hinted at something else. Which do you think is closer to the truth?",
      bgImage: "/Cases/case-note-bg.jpg"
    },
    {
      id: "B",
      title: "FIRST DOUBTS",
      subtitle: "2. LIFE WITHOUT PAULINE",
      content: "With Pauline gone, someone ended up benefiting. Who do you think is closer to the truth?",
      bgImage: "/Cases/case-note-bg.jpg"
    },
    {
      id: "C",
      title: "FIRST DOUBTS",
      subtitle: "3. STRANGE MOVES",
      content: "That night, some people acted differently. Whose words or actions don't sit right with you, and why?",
      bgImage: "/Cases/case-note-bg.jpg"
    },
    {
      id: "D",
      title: "DEEPER CONFLICTS",
      subtitle: "4. SCATTERED TRUTH",
      content: "The story of that night isn't complete. How do you explain the parts that don't seem to fit together?",
      bgImage: "/Cases/case-note-bg.jpg"
    },
    {
      id: "E",
      title: "DEEPER CONFLICTS",
      subtitle: "5. FEAR OR GUILT",
      content: "Some people looked uneasy after the incident. Was it because they were scared of what happened, or hiding something they did?",
      bgImage: "/Cases/case-note-bg.jpg"
    },
    {
      id: "F",
      title: "FINAL TENSIONS",
      subtitle: "6. HIDDEN LAYERS",
      content: "That night, not everything was in the open. What deeper reason might explain the way people acted toward Pauline?",
      bgImage: "/Cases/case-note-bg.jpg"
    },
    {
      id: "G",
      title: "FINAL TENSIONS",
      subtitle: "7. LAST PIECE",
      content: "Pieces of the night remain untold. What important detail do you think is missing, and why might it have been left out?",
      bgImage: "/Cases/case-note-bg.jpg"
    },
    {
      id: "H",
      title: "THE VERDICT",
      subtitle: "FINAL DEBATE",
      content: "All evidence has been laid out. It's time to weigh the facts and deliver your verdict. Who do you hold accountable for Pauline's fate? Present your suspect, defend your reasoning with the reports at hand, and confront opposing views. When you're certain, type your answer.",
      isVerdict: true
    }
  ];

  const validateSuspect = (answer: string) => {
    const cleanAnswer = answer.trim().toLowerCase();
    const validAnswers = [
      "marco diaz",
      "marco",
      "diaz marco",
      "diaz"
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
            Proceed to Final Investigation Report
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
              <p className="text-xl text-gray-400 font-mono">CASE NO.: 1743-9930-ZW</p>
              <p className="text-lg text-crime-red font-semibold">CLASSIFIED: HIGH PRIORITY</p>
            </div>

            {/* Suspect Profile */}
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">
                🎯 PRIMARY SUSPECT: MARCO DIAZ
              </h2>
              <div className="space-y-3 text-gray-300">
                <p><span className="font-bold text-white">Age:</span> 28 years old</p>
                <p><span className="font-bold text-white">Relationship:</span> Boyfriend of Pauline Santos</p>
                <p><span className="font-bold text-white">Occupation:</span> Business Associate</p>
                <p><span className="font-bold text-white">Status:</span> Person of Interest → PRIMARY SUSPECT</p>
              </div>
            </div>

            {/* The Incident */}
            <div className="bg-white/5 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-yellow mb-4 uppercase tracking-wide">
                📋 The Incident
              </h2>
              <div className="space-y-3 text-gray-300">
                <p><span className="font-bold text-white">Victim:</span> Pauline Santos, 26 years old</p>
                <p><span className="font-bold text-white">Date:</span> January 14, 2024</p>
                <p><span className="font-bold text-white">Location:</span> Azure Coast Resort, Batangas</p>
                <p><span className="font-bold text-white">Reported Cause:</span> Drowning</p>
                <p className="text-crime-red font-semibold"><span className="font-bold text-white">Actual Finding:</span> Foul Play Suspected</p>
              </div>
            </div>

            {/* Key Evidence */}
            <div className="bg-white/5 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-yellow mb-4 uppercase tracking-wide">
                🔍 Key Evidence Against Marco Diaz
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-crime-red mt-1">▸</span>
                  <span><span className="font-bold text-white">Financial Motive:</span> Pauline recently updated her life insurance with Marco as sole beneficiary (₱5M payout)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-crime-red mt-1">▸</span>
                  <span><span className="font-bold text-white">Timeline Inconsistency:</span> Marco claimed he was at the bar during the incident, but security footage shows him near the beach area</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-crime-red mt-1">▸</span>
                  <span><span className="font-bold text-white">Witness Statement:</span> Resort staff heard arguing between Marco and Pauline hours before the incident</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-crime-red mt-1">▸</span>
                  <span><span className="font-bold text-white">Suspicious Behavior:</span> Marco attempted to leave the resort immediately after Pauline's body was found</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-crime-red mt-1">▸</span>
                  <span><span className="font-bold text-white">Forensic Evidence:</span> Bruising on Pauline's wrists consistent with restraint, not drowning alone</span>
                </li>
              </ul>
            </div>

            {/* Motive */}
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">
                💰 Established Motive
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Marco Diaz was facing significant business debts (₱3.2M) and had recently been cut off from Pauline's family business investments. The life insurance policy, updated just two weeks before the incident, would have cleared his debts and provided substantial funds. Financial records show Marco had been pressuring Pauline to increase the policy amount.
              </p>
            </div>

            {/* Conclusion */}
            <div className="bg-white/5 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-yellow mb-4 uppercase tracking-wide">
                ⚖️ Investigator's Conclusion
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Based on the accumulated evidence, timeline analysis, witness testimonies, and forensic findings, there is sufficient probable cause to conclude that <span className="text-crime-red font-bold">Marco Diaz is responsible for the death of Pauline Santos</span>.
              </p>
              <p className="text-gray-400 text-sm italic">
                The case has been forwarded to the prosecutor's office for formal charges. Investigation status: CLOSED - SUSPECT IDENTIFIED.
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
          backgroundImage: `url('/Cases/bloody-bg.jpg')`,
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
                        <span className="font-semibold">Incorrect suspect. Try again.</span>
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
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold uppercase tracking-wider hover:bg-white/10 transition"
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