"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Home, AlertTriangle, CheckCircle, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MartinezCasePage() {
  const router = useRouter();
  const [accessGranted, setAccessGranted] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [suspectAnswer, setSuspectAnswer] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const CORRECT_ACCESS_CODE = "LQZ7-TG0";

  const handleAccessSubmit = () => {
    if (accessCode.trim().toUpperCase() === CORRECT_ACCESS_CODE) {
      setAccessGranted(true);
      setAccessError(false);
    } else {
      setAccessError(true);
      setTimeout(() => setAccessError(false), 3000);
    }
  };

  const caseNotes = [
    {
      id: "A",
      title: "FRACTURED NARRATIVES",
      subtitle: "1. THE INVESTIGATION THAT GREW",
      content: "As Clara's investigation expanded, every new discovery seemed to reveal another crime, another conflict, or another person connected to the case. Instead of narrowing the search, each breakthrough widened it. At what point does a growing investigation stop revealing the truth and start hiding it beneath too many possibilities?",
    },
    {
      id: "B",
      title: "FRACTURED NARRATIVES",
      subtitle: "2. INFORMATION THAT MOVED",
      content: "Confidential information repeatedly surfaced outside the people who were originally trusted with it. By the time investigators reconstructed the sequence of events, several individuals appeared to know things before they reasonably should have. If information continued to spread without being noticed, where should investigators begin looking—the first person who received it, or the first person who could have passed it on?",
    },
    {
      id: "C",
      title: "FRACTURED NARRATIVES",
      subtitle: "3. THE BREAKTHROUGH",
      content: "One interview dramatically changed the direction of Clara's investigation. The information appeared convincing enough to influence every step that followed, even though it was only one part of a much larger story. When one discovery changes the course of an entire investigation, how much should depend on accepting that discovery at face value?",
    },
    {
      id: "D",
      title: "HIDDEN CONNECTIONS",
      subtitle: "4. PIECES OF THE SAME STORY",
      content: "Political corruption, financial transactions, leaked information, personal relationships, and past investigations all surfaced throughout the case. At first, they appeared to be separate problems unfolding at the same time. How do investigators determine whether several crimes exist independently... or whether they all belong to the same story?",
    },
    {
      id: "E",
      title: "HIDDEN CONNECTIONS",
      subtitle: "5. WHAT WAS NEVER SAID",
      content: "Several important moments in Clara's investigation happened between documented events. Investigators were able to establish where people had been before and after those moments, but not always what happened in between. When the beginning and ending of an event are known, how much can still be hidden inside the moments no one witnessed?",
    },
    {
      id: "F",
      title: "SHIFTING PRIORITIES",
      subtitle: "6. THE FINISH LINE",
      content: "Those closest to Clara knew she intended to finish what she had started before moving on with the next chapter of her life. As the investigation progressed, that decision became increasingly significant. When the outcome of an investigation begins to affect someone's future, whose future changes the most if that investigation is never completed?",
    },
    {
      id: "G",
      title: "SHIFTING PRIORITIES",
      subtitle: "7. THE REPEATING PATTERN",
      content: "Certain names, places, and events appeared repeatedly throughout the investigation, often in completely different contexts. Individually, none seemed unusual. Together, they suggested that unrelated discoveries might not be unrelated at all. When the same connections continue appearing from different directions, what makes them more than coincidence?",
    },
    {
      id: "H",
      title: "THE HIDDEN STORY",
      subtitle: "8. THE PUBLIC VERSION",
      content: "Much of the case unfolded through official reports, interviews, and public records. Together, they formed a convincing explanation of what had happened. If every document supports the same conclusion, does that strengthen the conclusion... or simply show that everyone relied on the same version of events?",
    },
    {
      id: "I",
      title: "THE HIDDEN STORY",
      subtitle: "9. THE FINAL HOURS",
      content: "Investigators successfully reconstructed most of Clara's final day through interviews, records, and recovered evidence. Even so, the most important moments occurred during a period when no independent witness could confirm what truly happened. How much of the truth can disappear when the final conversation is known only to one surviving person?",
    },
    {
      id: "J",
      title: "THE COMPLETE PICTURE",
      subtitle: "10. THE FINAL THEORY",
      content: "By the end of the investigation, every statement, timeline, and piece of evidence appears to fit together into a single explanation. Yet even the strongest theory is built upon assumptions that investigators choose to accept. If one assumption in your entire theory proved to be wrong, which part of the case would change the most?",
    },
    {
      id: "K",
      title: "THE VERDICT",
      subtitle: "FINAL DEBATE",
      content: "All the evidence has now been presented. This is your moment to examine every detail, question every assumption, and determine who you believe is responsible for the Clara Reyes case. Choose your suspect, support your reasoning using the reports and events you've seen, and be ready to challenge any conflicting interpretations. When you are certain of your conclusion, type your final answer.",
      isVerdict: true
    }
  ];

  const validateSuspect = (answer: string) => {
    const cleanAnswer = answer.trim().toLowerCase();
    const validAnswers = [
      "james gomez",
      "gomez, james",
      "james",
    ];
    return validAnswers.includes(cleanAnswer);
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

  // ACCESS CODE SCREEN
  if (!accessGranted) {
    return (
      <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/ABOUT US/BLOODY BG.PNG')`,
            filter: 'brightness(0.3) blur(8px)'
          }}
        />

        {/* Home Button */}
        <button
          onClick={handleHome}
          className="absolute top-6 right-6 text-white hover:text-crime-yellow transition z-50 text-sm uppercase tracking-wider font-semibold"
        >
          HOME
        </button>

        {/* Access Code Form */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full"
          >
            <div className="bg-gradient-to-b from-red-900/90 to-black/90 backdrop-blur-sm border border-red-700 rounded-lg p-8 shadow-2xl">
              {/* Lock Icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-red-900/50 p-4 rounded-full">
                  <Lock className="w-12 h-12 text-crime-yellow" />
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">
                  ACCESS RESTRICTED
                </h1>
                <p className="text-gray-300 uppercase tracking-wider text-sm">
                  VERIFICATION REQUIRED
                </p>
              </div>

              {/* Input Field */}
              <div className="space-y-4">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAccessSubmit()}
                  placeholder="Enter Code Access"
                  className="w-full bg-black/50 text-white border border-red-700/50 px-4 py-3 rounded-lg text-center font-mono uppercase tracking-wider focus:outline-none focus:border-crime-yellow focus:ring-1 focus:ring-crime-yellow"
                />

                {/* Error Message */}
                <AnimatePresence>
                  {accessError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2"
                    >
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-semibold text-sm">Invalid access code. Please try again.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  onClick={handleAccessSubmit}
                  className="w-full bg-crime-yellow hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg uppercase tracking-wider transition-all duration-300"
                >
                  PROCEED
                </button>
              </div>

              {/* Footer Note */}
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  CASE FILE: MARTINEZ FAMILY
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  S1P0-9X
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

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
              <p className="text-xl text-gray-400 font-mono">CASE NO.: S2WT-0V</p>
              <p className="text-lg text-crime-red font-semibold">CLASSIFIED: HIGHEST PRIORITY</p>
            </div>

            {/* Suspect Profile */}
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">
                🎯 PRIMARY SUSPECT: JAMES GOMEZ
              </h2>
              <div className="space-y-3 text-gray-300">
                <p><span className="font-bold text-white">Age:</span> 39 years old</p>
                <p><span className="font-bold text-white">Relationship:</span> Romantic Partner</p>
                <p><span className="font-bold text-white">Occupation:</span> Businessman</p>
                <p><span className="font-bold text-white">Status:</span> Case closed</p>
              </div>
            </div>

            {/* The Incident */}
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">
                📋 The Incident
              </h2>
              <div className="space-y-3 text-gray-300">
                <p><span className="font-bold text-white">Victims:</span> Clara Reyes</p>
                <p><span className="font-bold text-white">Date:</span> September 11, 2021</p>
                <p><span className="font-bold text-white">Location:</span> Brookside Condominium, Basement 2 Parking</p>
                <p><span className="font-bold text-white">Reported Cause:</span> Homicide</p>
              </div>
            </div>

            {/* Key Evidence */}
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">
                🔍 Key Evidence Against James Gomez
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-white text-lg mb-2">1. Clara Reyes Anniversary Post </h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Shows the tattoo on the back of James' neck.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg mb-2">2. Image of Ryan Velasco</h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Ryan's arm shows the same tattoo as James.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Connects Ryan to James.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg mb-2">3. Photocopy of Ryan Velasco's ID</h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Ryan's emergency contact number is the same number connected to the owner of the White Van.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg mb-2"> 4. Text Messages Between James & Clara </h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Shows the message was sent from SIM 2 of James' phone.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>The number matches Ryan's emergency contact number and the number connected to the White Van.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Links James → Ryan → White Van.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg mb-2"> 5. Clara's Journal Video </h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Clara says James wanted her to stop investigating.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>James claims he was supportive of her investigation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Proves James lied about supporting Clara.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg mb-2"> 6. James Donation Photo </h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Ryan is visible in the background wearing glasses.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Shows that James and Ryan knew each other and had a connection.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg mb-2"> 7. James' ₱500,000 Deposit Slip </h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Shows James paid ₱500,000 to Joan in exchange for her selling him Clara's case files.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Proves James was secretly obtaining Clara’s confidential files.</span>
                    </li>
                  </ul>
                </div>                                   
              </div>
            </div>

            {/* Motive */}
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">
                💰 Established Motive
              </h2>
              <p className="text-gray-300 leading-relaxed">
                James Gomez was the mastermind behind the drug-dealing operation and deliberately used his relationship with Clara Reyes as a shield to remain hidden in plain sight. He manipulated Clara into believing that he genuinely loved and supported her, knowing that she would never suspect the person closest to her. As Clara began investigating the drug network, James used her trust and his position as her partner to gain access to confidential information, investigation files, and other evidence, allowing him to monitor her progress and protect his operation. When Clara’s investigation began getting too close to the truth, James was forced to eliminate her to prevent her from exposing him.
              </p>
            </div>

            {/* Investigator's Note */}
            <div className="bg-white/5 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-yellow mb-2 uppercase tracking-wide">
                📁 Investigation Status
              </h2>
              <p className="text-gray-400 text-sm italic">
                CLOSED — SUSPECT IDENTIFIED
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