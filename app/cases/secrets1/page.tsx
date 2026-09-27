"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Home, AlertTriangle, CheckCircle, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClassOfSecretsPage() {
  const router = useRouter();
  const [accessGranted, setAccessGranted] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [suspectAnswer, setSuspectAnswer] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const CORRECT_ACCESS_CODE = "YB5-P2D";

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
      title: "ORIGINS OF SECRETS",
      subtitle: "1. THE FIVE WHO HAD EVERYTHING",
      content: "Westbridge University's five most prominent students appear to have almost perfect lives: exceptional grades, influential families, prestigious connections, and promising futures. But perfection is often carefully maintained. Behind their public reputations are conflicts, favors, betrayals, and secrets that very few people know about. The investigation begins with one question: What could possibly make someone want to expose all five of them?",
    },
    {
      id: "B",
      title: "ORIGINS OF SECRETS",
      subtitle: "2. THE PRESSURE BENEATH THE SURFACE",
      content: "From the outside, the five students seemed to have every reason to succeed. Their names carried weight, their futures appeared secure, and their achievements made them difficult to question. But privilege does not eliminate pressure; sometimes, it creates more of it. Expectations, competition, comparison, and the fear of losing everything can turn friendships into rivalries and admiration into resentment. When everyone has something to prove, who has the most to lose?",
    },
    {
      id: "C",
      title: "ORIGINS OF SECRETS",
      subtitle: "3. AN ACCOUNT WITH A PURPOSE",
      content: "An anonymous account began publishing secrets about students at Westbridge University. At first, its posts appeared almost harmless—rumors, embarrassing incidents, and private conflicts. Then the posts became increasingly specific. The person behind the account seemed to know things that were never made public. The question is no longer simply who had access to the secrets? It is: Who had a reason to make sure they were known?",
    },
    {
      id: "D",
      title: "MOTIVES UNCOVERED",
      subtitle: "4. THE COST OF BEING LEFT BEHIND",
      content: "The five students did not experience the events surrounding them equally. Some managed to protect their reputations, some had people willing to intervene on their behalf, and others were left to deal with consequences on their own. The imbalance remained even after everyone appeared to have moved on. Was it simply circumstance, or did someone have a reason to remember who escaped and who did not?",
    },
    {
      id: "E",
      title: "MOTIVES UNCOVERED",
      subtitle: "5. FIVE SECRETS, FIVE MOTIVES",
      content: "Every person exposed by the anonymous account had something to lose: reputation, family approval, academic standing, relationships, or future opportunities. Yet motive does not always belong to the person with the most to lose. Sometimes, the strongest motive belongs to the person who believes others got away with something they should have been punished for. Who had the most personal reason to bring their secrets to light?",
    },
    {
      id: "F",
      title: "MOTIVES UNCOVERED",
      subtitle: "6. THE ONE WHO KNEW TOO MUCH",
      content: "The anonymous account demonstrated an unusual understanding of the five students. The posts did not merely repeat rumors circulating around campus. Some information suggested knowledge of private conversations, personal conflicts, and events that only a limited number of people could have known about. That narrows the possibilities. Was the person behind the account simply well-informed, or were they much closer to the five than anyone realized?",
    },
    {
      id: "G",
      title: "BEHIND THE ACCOUNT",
      subtitle: "7. REVENGE OR JUSTICE?",
      content: "The account's behavior raises an uncomfortable question. Was it created to destroy people, or was it created because the person behind it believed those people deserved to be exposed? Someone seeking attention would expose anything. Someone seeking revenge would be selective. Someone seeking justice might believe every secret had a reason for being revealed. Which one describes the person behind the account?",
    },
    {
      id: "H",
      title: "BEHIND THE ACCOUNT",
      subtitle: "8. INSIDE OR OUTSIDE THE CIRCLE?",
      content: "The five students naturally become the first suspects. They know each other, they know each other's secrets, and they have plenty of reasons to turn against one another. But what if the person behind the account was never part of their circle at all? Someone outside the group could have been watching them from a distance, collecting information, and waiting for an opportunity to expose them. Is the person behind the account one of the five, or someone they never suspected?",
    },
    {
      id: "I",
      title: "BEHIND THE ACCOUNT",
      subtitle: "9. THE ACCOUNT WAS NEVER RANDOM",
      content: "The sequence of revelations suggests that the anonymous account was not simply collecting gossip. Each secret changed the balance between the five. One revelation damaged a reputation, another reopened an old conflict, and another exposed something that had been buried for months. Was the account exposing secrets one by one, or was someone deliberately constructing a story? If there was a story, someone knew exactly how it was supposed to end.",
    },
    {
      id: "J",
      title: "BEHIND THE ACCOUNT",
      subtitle: "10. WHO WANTED THEM TO FALL?",
      content: "Five students. Five secrets. One anonymous account. And a history that began long before the first post appeared. The person behind the account may not be the person everyone suspects, and the obvious motive may only be the surface of something much more personal. Someone had been watching. Someone had been keeping score. And someone finally decided that the five students who escaped the consequences once would not escape them forever. Who was behind the account, why did they create it, and what were they really trying to accomplish?",
    },
    {
      id: "K",
      title: "THE VERDICT",
      subtitle: "FINAL DEBATE",
      content: "Every post, every secret, every carefully timed revelation has led to this moment. The anonymous account was never random—it was built by someone who knew the five students better than anyone realized, someone who remembered exactly who escaped the consequences and who did not. You have seen the evidence, the timeline, and the aftermath. Now you must decide: who was truly behind the anonymous account? Type your final answer when you are certain.",
      isVerdict: true
    }
  ];

  const validateSuspect = (answer: string) => {
    const cleanAnswer = answer.trim().toLowerCase();
    const validAnswers = [
      "chloe vega",
      "chloe amara vega",
      "vega, chloe",
      "chloe",
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
                  CASE FILE: CLASS OF SECRETS
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  XTR1-YB4
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  SERIES 1
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
            You've identified who was behind the account.
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Now it's time to reveal why it was created, how it unfolded, and who was truly behind every post.
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
              <p className="text-xl text-gray-400 font-mono">CASE NO.: XTR1-YB4</p>
              <p className="text-lg text-crime-red font-semibold">CLASSIFIED: HIGHEST PRIORITY</p>
              <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider">SERIES 1</p>
            </div>

            {/* Suspect Profile */}
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">
                🎯 PRIMARY SUSPECT: Chloe Vega
              </h2>
              <div className="space-y-3 text-gray-300">
                <p><span className="font-bold text-white">Age:</span> 21 years old</p>
                <p><span className="font-bold text-white">Occupation:</span> College Student</p>
                <p><span className="font-bold text-white">Status:</span> Case Closed</p>
              </div>
            </div>

            {/* Key Evidence */}
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">
                🔍 Key Evidence Against Chloe Vega
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-white text-lg mb-2">1. Tweet dated November 12, 2013</h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Mentions only Chloe in connection with the campus fair incident.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Reveals that Chloe was the only one who faced consequences, while the others were protected by Westbridge University.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg mb-2">2. Westbridge University's Decision Letter</h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Confirms that Chloe was suspended following the campus fair incident.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Officially states that the incident involved the sale of party drugs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Suggests that the university concealed the true events to protect those involved.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg mb-2">3. Chloe's Interview Transcript</h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Reveals that Chloe had already faced the consequences of the campus fair incident.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Provides insight into what happened to her after the university's decision.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg mb-2">4. Chloe's Instagram Post dated October 14, 2013</h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Shows Chloe with Bianca and Isabel on the day the anonymous account's password was changed.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Establishes that Chloe was with the two other members of the group at the time.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg mb-2">5. MAP</h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Shows the date connected to the password change of the anonymous account.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Supports the timeline established in Evidence #4.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg mb-2">6. Deleted Facebook Memory Post</h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Reveals Chloe removing the last remaining trace of a friendship she had realized she could no longer trust.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>Suggests that something had changed between Chloe and the others.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg mb-2">7. Gym Pool Photo</h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>A hidden message can be revealed using a UV light on the back of the photograph.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crime-red mt-1">•</span>
                      <span>The message serves as Chloe's final confession, revealing what she had been keeping secret.</span>
                    </li>
                  </ul>
                </div>                                   
              </div>
            </div>

            {/* Investigation Status */}
            <div className="bg-white/5 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-yellow mb-2 uppercase tracking-wide">
                📁 Investigation Status
              </h2>
              <p className="text-gray-400 text-sm italic">
                CLOSED — CHLOE VEGA IDENTIFIED
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
                    placeholder="ENTER THE NAME OF THE PERSON BEHIND THE ACCOUNT..."
                    className="w-full max-w-md mx-auto bg-white/90 text-black px-6 py-4 rounded-lg text-center font-semibold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-crime-yellow"
                  />
                  
                  <p className="text-xs text-gray-400 max-w-lg mx-auto">
                    <span className="font-bold text-crime-yellow">NOTE:</span> If correct, you will be instructed to open the final investigation report. If wrong, an error will show, and you won't be able to proceed until you've identified who is truly behind the anonymous account.
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
                        <span className="font-semibold">Incorrect. Review the evidence.</span>
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