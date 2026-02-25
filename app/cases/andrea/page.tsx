"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Home, AlertTriangle, CheckCircle, Lock, X, ZoomIn } from "lucide-react";
import { useRouter } from "next/navigation";

// ─── Evidence Gallery Types ───────────────────────────────────────────────────
interface EvidencePhoto {
  id: string;
  src: string;
  caption: string;
}

interface EvidenceGroup {
  id: string;
  label: string;
  tag: string;
  color: string;          // Tailwind border/text accent class
  photos: EvidencePhoto[];
}

// ─── Evidence Data ─────────────────────────────────────────────────────────────
const evidenceGroups: EvidenceGroup[] = [
  {
    id: "social",
    label: "The Victim's Digital Life",
    tag: "Social Media",
    color: "pink",
    photos: [
      {
        id: "X6",
        src: "/Cases/evidence/X6.jpg",
        caption: "Andrea's IG story — 'Happy alone. Merry Christmas 🎄' (Dec 2015)",
      },
      {
        id: "X1",
        src: "/Cases/evidence/X1.jpg",
        caption: "Andrea's IG story — 'Issa date ❤️' at Luna Verre (Jan 26, 2016)",
      },
    ],
  },
  {
    id: "dating",
    label: "Dating App Activity",
    tag: "MatchUp Profiles & History",
    color: "orange",
    photos: [
      {
        id: "X7",
        src: "/Cases/evidence/X7.jpg",
        caption: "Match history — Ralph (Dec 11), Joaquin (Jan 20), Sean (Feb 2), Carlo & Patrick (Feb 2016)",
      },
      {
        id: "X8",
        src: "/Cases/evidence/X8.jpg",
        caption: "Sean's Profile"
      },
      {
        id: "X10",
        src: "/Cases/evidence/X10.jpg",
        caption: "Joaquin's Profile",
      },
      {
        id: "X11",
        src: "/Cases/evidence/X11.jpg",
        caption: "Ralph's Profile",
      },      
    ],
  },
  {
    id: "chats",
    label: "Private Conversations",
    tag: "MatchUp Chats",
    color: "red",
    photos: [
      {
        id: "X3",
        src: "/Cases/evidence/X3.jpg",
        caption: "Chat with Joaquin — matched Jan 20, 2016. Phone number exchanged.",
      },
      {
        id: "X4",
        src: "/Cases/evidence/X4.jpg",
        caption: "Chat with Ralph — matched Dec 11, 2015. Phone number exchanged.",
      },
      {
        id: "X5",
        src: "/Cases/evidence/X5.jpg",
        caption: "Chat with Sean — matched Feb 2, 2016. Phone number exchanged.",
      },
    ],
  },
  {
    id: "scene",
    label: "Location & Scene",
    tag: "Maps and Location",
    color: "yellow",
    photos: [
      {
        id: "X9",
        src: "/Cases/evidence/X9.jpg",
        caption: "Meridian Crest Residences — Ground Floor plan. Note: hallway, back exit, trash & fire exit. ",
      },
      {
        id: "X12",
        src: "/Cases/evidence/X12.jpg",
        caption: "City map — key locations including Meridian Crest Residences, Luna Verre, and Philara Police Station.",
      },
    ],
  },
  {
    id: "background",
    label: "Childhood Connection",
    tag: "Historical Background Evidence",
    color: "blue",
    photos: [
      {
        id: "X2",
        src: "/Cases/evidence/X2.jpg",
        caption: "St. Gabriel Academy class photo — SY 1998-1999. Both T. Delgado and A. Morales listed as classmates.",
      },
    ],
  },
];

// ─── Color maps (Tailwind safe-list friendly) ─────────────────────────────────
const colorMap: Record<string, { border: string; text: string; bg: string; badge: string }> = {
  pink:   { border: "border-pink-500",   text: "text-pink-400",   bg: "bg-pink-500/10",   badge: "bg-pink-500/20 text-pink-300 border-pink-500/40" },
  orange: { border: "border-orange-500", text: "text-orange-400", bg: "bg-orange-500/10", badge: "bg-orange-500/20 text-orange-300 border-orange-500/40" },
  red:    { border: "border-red-500",    text: "text-red-400",    bg: "bg-red-500/10",    badge: "bg-red-500/20 text-red-300 border-red-500/40" },
  yellow: { border: "border-yellow-400", text: "text-yellow-400", bg: "bg-yellow-400/10", badge: "bg-yellow-400/20 text-yellow-300 border-yellow-400/40" },
  blue:   { border: "border-blue-400",   text: "text-blue-400",   bg: "bg-blue-400/10",   badge: "bg-blue-400/20 text-blue-300 border-blue-400/40" },
};

// ─── Evidence Gallery Screen ───────────────────────────────────────────────────
function EvidenceGallery({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const [lightbox, setLightbox] = useState<EvidencePhoto | null>(null);
  const [activeGroup, setActiveGroup] = useState<string>(evidenceGroups[0].id);

  const currentGroup = evidenceGroups.find((g) => g.id === activeGroup)!;
  const colors = colorMap[currentGroup.color];

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/ABOUT US/BLOODY BG.PNG')`, filter: "brightness(0.25)" }}
      />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 bg-red-700 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-red-700 rounded-full blur-3xl" />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 22 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 z-10 bg-red-600 hover:bg-red-500 rounded-full p-1.5 transition"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="w-full rounded-lg shadow-2xl border border-white/10 object-contain max-h-[80vh]"
              />
              <p className="mt-3 text-sm text-gray-300 text-center leading-relaxed px-2">
                {lightbox.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 py-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-2">Case File Evidence</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-wider uppercase text-white mb-1">
            Additional Evidence
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto">
            Review all recovered materials before delivering your verdict. Click any photo to examine it in detail.
          </p>
        </motion.div>

        {/* Group Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {evidenceGroups.map((group) => {
            const gc = colorMap[group.color];
            const isActive = group.id === activeGroup;
            return (
              <button
                key={group.id}
                onClick={() => setActiveGroup(group.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-200 ${
                  isActive
                    ? `${gc.border} ${gc.text} ${gc.bg}`
                    : "border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300"
                }`}
              >
                {group.tag}
              </button>
            );
          })}
        </motion.div>

        {/* Active Group */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {/* Group Header */}
            <div className={`flex items-center gap-3 mb-5 pb-3 border-b ${colors.border} border-opacity-40`}>
              <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${colors.badge}`}>
                {currentGroup.tag}
              </span>
              <h2 className={`text-lg font-bold ${colors.text}`}>{currentGroup.label}</h2>
              <span className="ml-auto text-xs text-gray-600">{currentGroup.photos.length} item{currentGroup.photos.length !== 1 ? "s" : ""}</span>
            </div>

            {/* Photo Grid */}
            <div className={`grid gap-4 ${
              currentGroup.photos.length === 1
                ? "grid-cols-1 max-w-sm mx-auto"
                : currentGroup.photos.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
            }`}>
              {currentGroup.photos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setLightbox(photo)}
                  className={`group relative cursor-pointer rounded-lg overflow-hidden border border-gray-800 hover:${colors.border} transition-all duration-200 hover:shadow-lg hover:shadow-black/50`}
                >
                  {/* Image */}
                  <div className="aspect-[3/4] overflow-hidden bg-gray-900">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Zoom overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                    <ZoomIn className={`w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${colors.text}`} />
                  </div>

                  {/* Evidence tag */}
                  <div className="absolute top-2 left-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${colors.badge} backdrop-blur-sm`}>
                      {photo.id}
                    </span>
                  </div>

                  {/* Caption bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                    <p className="text-[10px] text-gray-300 leading-snug line-clamp-2">{photo.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-800">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold uppercase tracking-wider hover:bg-white/10 transition text-white text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-600 uppercase tracking-widest">Evidence Reviewed</p>
            <p className="text-xs text-gray-500 mt-0.5">Proceed when ready</p>
          </div>

          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wider bg-red-700 hover:bg-red-600 transition text-white text-sm"
          >
            <span className="hidden sm:inline">Deliver Verdict</span>
            <span className="sm:hidden">Verdict</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AndreaCasePage() {
  const router = useRouter();
  const [accessGranted, setAccessGranted] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [suspectAnswer, setSuspectAnswer] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const CORRECT_ACCESS_CODE = "BW9-DREI-GT2";

  // Indexes:
  //  0–9   → Case Notes A–J  (caseNotes[0..9])
  // 10     → Evidence Gallery (NEW)
  // 11     → Case Note K / Verdict (caseNotes[10])
  // After submit success → Success screen → Final Report

  const caseNotes = [
    { id: "A", title: "THE NIGHT IT HAPPENED",   subtitle: "1. Staged Illness",         content: "The scene feels composed, almost respectful, despite the violence that occurred. There are no obvious signs of panic, struggle, or rushed escape. Who had enough time to create calm inside the unit — or did the crime even happen there at all?", bgImage: "/Cases/case-note-bg.jpg" },
    { id: "B", title: "THE NIGHT IT HAPPENED",   subtitle: "2. Intimacy Without Labels", content: "The victim had been actively meeting and communicating with multiple romantic connections through a dating app. Her attention was divided, but not necessarily committed. Who benefits the most from her death?", bgImage: "/Cases/case-note-bg.jpg" },
    { id: "C", title: "THE NIGHT IT HAPPENED",   subtitle: "3. Controlled Chaos",        content: "Some details suggest sudden conflict, while others required planning and physical effort. The timeline indicates a narrow window between contact and silence. How does the estimated time of death align with each suspect's stated whereabouts?", bgImage: "/Cases/case-note-bg.jpg" },
    { id: "D", title: "THE NIGHT IT HAPPENED",   subtitle: "4. The Suitcase Decision",   content: "The body was placed inside a suitcase and relocated within the same building. This required strength, time, and confidence in not being seen. Which suspect had the strength, privacy, and opportunity to move it without assistance?", bgImage: "/Cases/case-note-bg.jpg" },
    { id: "E", title: "MOTIVE UNDER PRESSURE",   subtitle: "5. Jealousy is Convenient",  content: "Multiple dating app connections create an easy emotional explanation. Jealousy is believable, dramatic, and simple to understand. Who appears suspicious simply because jealousy is the easiest story to tell?", bgImage: "/Cases/case-note-bg.jpg" },
    { id: "F", title: "MOTIVE UNDER PRESSURE",   subtitle: "6. The Returned Weapon",     content: "The suspected knife was found inside the suitcase with the victim. It was not discarded, hidden far away, or removed from the scene. What does leaving the weapon with the body suggest about the killer's priorities after the act?", bgImage: "/Cases/case-note-bg.jpg" },
    { id: "G", title: "MOTIVE UNDER PRESSURE",   subtitle: "7. Undressed Discovery",     content: "When the body was retrieved, the victim was completely naked. Her clothing was not found on her inside the suitcase. Was this done out of rage, humiliation, sexual assault, control — or to remove evidence that should never be found?", bgImage: "/Cases/case-note-bg.jpg" },
    { id: "H", title: "WHEN STORIES COLLIDE",    subtitle: "8. Silence in a Shared Building", content: "No neighbors reported hearing a struggle during the estimated time of death. The building remained undisturbed throughout the critical window. How does each suspect explain the complete absence of disturbance?", bgImage: "/Cases/case-note-bg.jpg" },
    { id: "I", title: "WHEN STORIES COLLIDE",    subtitle: "9. A Pregnancy Unconfirmed", content: "The victim was pregnant, and paternity had not been established. The truth of the father would permanently tie two lives together. Who had the most to lose if the child's father became known?", bgImage: "/Cases/case-note-bg.jpg" },
    { id: "J", title: "WHEN STORIES COLLIDE",    subtitle: "10. Selective Truth",         content: "Each suspect admits to part of the story — a meeting, a message, a feeling, a secret. None provide a complete account of the entire night. Which shared detail between the suspects doesn't feel like a coincidence?", bgImage: "/Cases/case-note-bg.jpg" },
    { id: "K", title: "THE VERDICT",             subtitle: "FINAL DEBATE",                content: "All evidence has been laid out. It's time to weigh the facts and deliver your verdict. Who do you hold accountable for Andrea's fate? Present your suspect, defend your reasoning with the reports at hand, and confront opposing views. When you're certain, type your answer.", isVerdict: true },
  ];

  // page 10 is the evidence gallery; pages 0–9 map to caseNotes[0–9]; page 11 maps to caseNotes[10]
  const EVIDENCE_PAGE = 10;
  const VERDICT_PAGE  = 11;
  const REPORT_PAGE   = 12;

  const getNoteForPage = (page: number) => {
    if (page < EVIDENCE_PAGE) return caseNotes[page];           // A–J
    if (page === VERDICT_PAGE) return caseNotes[10];             // K
    return null;
  };

  const handleAccessSubmit = () => {
    if (accessCode.trim().toUpperCase() === CORRECT_ACCESS_CODE) {
      setAccessGranted(true);
      setAccessError(false);
    } else {
      setAccessError(true);
      setTimeout(() => setAccessError(false), 3000);
    }
  };

  const validateSuspect = (answer: string) => {
    const clean = answer.trim().toLowerCase();
    return ["tristan", "tristan delgado", "delgado tristan", "delgado, tristan"].includes(clean);
  };

  const handleSubmit = () => {
    if (validateSuspect(suspectAnswer)) {
      setShowSuccess(true);
      setTimeout(() => setCurrentPage(REPORT_PAGE), 2000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleNext = () => {
    setCurrentPage((p) => p + 1);
    setShowError(false);
    setShowSuccess(false);
  };

  const handlePrev = () => {
    setCurrentPage((p) => Math.max(0, p - 1));
  };

  const handleHome = () => router.push("/cases");

  // ── ACCESS GATE ──────────────────────────────────────────────────────────────
  if (!accessGranted) {
    return (
      <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/ABOUT US/BLOODY BG.PNG')`, filter: "brightness(0.3) blur(8px)" }} />
        <button onClick={handleHome} className="absolute top-6 right-6 text-white hover:text-crime-yellow transition z-50 text-sm uppercase tracking-wider font-semibold">HOME</button>
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
            <div className="bg-gradient-to-b from-red-900/90 to-black/90 backdrop-blur-sm border border-red-700 rounded-lg p-8 shadow-2xl">
              <div className="flex justify-center mb-6">
                <div className="bg-red-900/50 p-4 rounded-full">
                  <Lock className="w-12 h-12 text-crime-yellow" />
                </div>
              </div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">ACCESS RESTRICTED</h1>
                <p className="text-gray-300 uppercase tracking-wider text-sm">VERIFICATION REQUIRED</p>
              </div>
              <div className="space-y-4">
                <input type="text" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAccessSubmit()} placeholder="Enter Code Access" className="w-full bg-black/50 text-white border border-red-700/50 px-4 py-3 rounded-lg text-center font-mono uppercase tracking-wider focus:outline-none focus:border-crime-yellow focus:ring-1 focus:ring-crime-yellow" />
                <AnimatePresence>
                  {accessError && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-semibold text-sm">Invalid access code. Please try again.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button onClick={handleAccessSubmit} className="w-full bg-crime-yellow hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg uppercase tracking-wider transition-all duration-300">PROCEED</button>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-xs uppercase tracking-wider">CASE FILE: ANDREA MORALES</p>
                <p className="text-gray-600 text-xs mt-1">GW81-JQ004</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── EVIDENCE GALLERY (page 10) ────────────────────────────────────────────────
  if (currentPage === EVIDENCE_PAGE) {
    return <EvidenceGallery onNext={handleNext} onPrev={handlePrev} />;
  }

  // ── SUCCESS SCREEN ────────────────────────────────────────────────────────────
  if (showSuccess && currentPage === VERDICT_PAGE) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }} transition={{ duration: 1 }} className="mb-8">
            <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wider">EXCELLENT WORK, INSPECTOR!</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">You've cracked the puzzle.</p>
          <p className="text-lg text-gray-400 mb-8">Now it's time to reveal why it happened, how it unfolded, and when it all began.</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentPage(REPORT_PAGE)} className="bg-crime-yellow hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg text-lg uppercase tracking-wider">
            Proceed to the final investigation report inside the case file
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // ── FINAL REPORT (page 12) ────────────────────────────────────────────────────
  if (currentPage === REPORT_PAGE) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="text-center border-b border-crime-yellow pb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-crime-yellow mb-2 uppercase tracking-widest">Final Investigation Report</h1>
              <p className="text-xl text-gray-400 font-mono">CASE NO.: GW81-JQ004</p>
              <p className="text-lg text-crime-red font-semibold">CLASSIFIED: HIGHEST PRIORITY</p>
            </div>
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">🎯 PRIMARY SUSPECT: TRISTAN DELGADO</h2>
              <div className="space-y-3 text-gray-300">
                <p><span className="font-bold text-white">Age:</span> 27 years old</p>
                <p><span className="font-bold text-white">Relationship:</span> Best Friend</p>
                <p><span className="font-bold text-white">Occupation:</span> Virtual Assistant</p>
                <p><span className="font-bold text-white">Status:</span> Primary Suspect</p>
              </div>
            </div>
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">📋 The Incident</h2>
              <div className="space-y-3 text-gray-300">
                <p><span className="font-bold text-white">Victim:</span> Andrea Morales</p>
                <p><span className="font-bold text-white">Date:</span> February 15, 2016</p>
                <p><span className="font-bold text-white">Location:</span> Meridian Crest Residences</p>
                <p><span className="font-bold text-white">Actual Finding:</span> Homicide.</p>
              </div>
            </div>
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">🔍 Key Evidence Against Tristan Delgado</h2>
              <div className="space-y-6">
                {[
                  { title: "Zenipay Receipt", points: ["The payment was sent to a store owned by Myrna B., identified as 'Myrna Store 24/7,' which appears in the background of Ralph's Facebook post—linking Ralph to the transaction."] },
                  { title: "Message Conversations", points: ["Tristan and Ralph share identical typing patterns, including spacing before punctuation. Both sent the exact message: 'Magpahinga ka na, alam ko pagod ka .'."] },
                  { title: "Old Class Picture", points: ["Tristan's name appears in a class photo with an address that matches Ralph's current street address, indicating they likely grew up together.", "This aligns with Tristan's profile stating he only moved out two years ago."] },
                  { title: "Tristan's Suspect Profile", points: ["Indicates a history of depression following his parents' death. This suggests a deep emotional dependence on Andrea, as they were best friends since childhood."] },
                  { title: "Evidence Box (Found in Tristan's Unit)", points: ["Contains a beige scrunchie worn by Andrea during her first meeting with Ralph, implying Tristan may have been the last person with her that night."] },
                  { title: "Love Letter of Ralph", points: ["States: 'Matagal na kitang mahal, Andrea.' Since Ralph and Andrea were newly acquainted, this suggests someone else was behind the letter."] },
                ].map(({ title, points }) => (
                  <div key={title}>
                    <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                    <ul className="space-y-2 text-gray-300 ml-4">
                      {points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2"><span className="text-crime-red mt-1">•</span><span>{pt}</span></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-crime-red/10 border border-crime-red/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-red mb-4 uppercase tracking-wide">💰 Established Motive</h2>
              <p className="text-gray-300 leading-relaxed">Tristan's motive appears deeply rooted in obsession and emotional fixation on Andrea. Childhood friends with a history of intense attachment, Tristan's unresolved grief from the death of his parents left him emotionally vulnerable, creating a profound fear of losing the one person he felt connected to. Evidence such as the scrunchie found in his unit—implying he was the last person with Andrea—and the love letter falsely attributed to Ralph, reveal a disturbing pattern of possessiveness and manipulation. His identical messaging patterns with Ralph further suggest calculated control over her relationships. Altogether, these factors paint a picture of a man driven by obsession, jealousy, and a desperate need to maintain dominance over Andrea, escalating to actions with potentially lethal consequences.</p>
            </div>
            <div className="bg-white/5 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-crime-yellow mb-4 uppercase tracking-wide">⚖️ Investigator's Note</h2>
              <p className="text-gray-300 leading-relaxed mb-4">Now it's time to reveal why it happened, how it unfolded, and when it all began. Proceed to the Final Investigation Report inside the case file.</p>
              <p className="text-gray-400 text-sm italic">Investigation status: CLOSED - SUSPECT IDENTIFIED</p>
            </div>
            <div className="text-center pt-6">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleHome} className="bg-crime-yellow hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg text-lg uppercase tracking-wider flex items-center gap-2 mx-auto">
                <Home className="w-5 h-5" />
                Return to Cases
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── CASE NOTE CAROUSEL (pages 0–9 and 11) ────────────────────────────────────
  const currentNote = getNoteForPage(currentPage)!;

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/ABOUT US/BLOODY BG.PNG')`, filter: "brightness(0.3)" }} />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-crime-red rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-crime-red rounded-full blur-3xl" />
      </div>
      <button onClick={handleHome} className="absolute top-6 right-6 text-white hover:text-crime-yellow transition z-50 text-sm uppercase tracking-wider font-semibold">HOME</button>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div key={currentPage} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }} className="max-w-3xl w-full text-center space-y-8">
            <div className="space-y-2">
              <h2 className="text-base md:text-lg text-gray-400 tracking-widest uppercase">CASE NOTE {currentNote.id}: {currentNote.title}</h2>
              <h1 className="text-3xl md:text-5xl font-bold tracking-wider uppercase">{currentNote.subtitle}</h1>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-8 md:p-12">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">{currentNote.content}</p>

              {currentNote.isVerdict && (
                <div className="mt-8 space-y-4">
                  <input type="text" value={suspectAnswer} onChange={(e) => setSuspectAnswer(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSubmit()} placeholder="FULL NAME..." className="w-full max-w-md mx-auto bg-white/90 text-black px-6 py-4 rounded-lg text-center font-semibold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-crime-yellow" />
                  <p className="text-xs text-gray-400 max-w-lg mx-auto"><span className="font-bold text-crime-yellow">NOTE:</span> If correct, you will be instructed to open the final investigation report. If wrong, an error will show, and you won't be able to proceed until you've identified the right suspect.</p>
                  <AnimatePresence>
                    {showError && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-crime-red/20 border border-crime-red text-crime-red px-6 py-3 rounded-lg flex items-center justify-center gap-2 max-w-md mx-auto">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="font-semibold">Incorrect suspect. Review the evidence.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button onClick={handlePrev} disabled={currentPage === 0} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold uppercase tracking-wider transition ${currentPage === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10"}`}>
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {currentNote.isVerdict ? (
                <button onClick={handleSubmit} className="px-8 py-3 bg-crime-yellow hover:bg-yellow-500 text-black rounded-lg font-bold uppercase tracking-wider transition">SUBMIT</button>
              ) : (
                <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold uppercase tracking-wider hover:bg-white/10 transition text-white">
                  {/* Show "Review Evidence" label on the last note before gallery */}
                  <span className="hidden sm:inline">{currentPage === EVIDENCE_PAGE - 1 ? "Review Evidence" : "Next Case Note"}</span>
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