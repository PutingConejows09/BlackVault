"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, AlertTriangle, Star, FileText, User, Users, Eye,
  BookOpen, ClipboardList, Scale, ChevronDown, ChevronUp, CheckCircle, X, ZoomIn, Play
} from "lucide-react";
import { useRouter } from "next/navigation";

type Tab = "overview"|"victim"|"suspects"|"witness"|"evidences"|"reports"|"casenotes"|"finaldebate";

function CrimeTape() {
  return (
    <div className="w-full bg-yellow-400 overflow-hidden py-1.5 shrink-0">
      <div className="flex whitespace-nowrap animate-marquee">
        {Array.from({length:16}).map((_,i)=>(
          <span key={i} className="text-black font-black text-xs tracking-[0.18em] uppercase px-6">
            CRIME SCENE — DO NOT CROSS &nbsp;•&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

function TabBtn({label,icon:Icon,active,onClick}:{label:string;icon:React.ElementType;active:boolean;onClick:()=>void}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 py-3 px-2 flex-1 min-w-0 border-b-2 transition-all duration-200 ${
        active ? "bg-red-600 border-red-600 text-white" : "bg-[#111] border-transparent text-gray-500 hover:text-white hover:bg-[#1a1a1a]"
      }`}
    >
      <Icon className="w-4 h-4 shrink-0"/>
      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider leading-tight text-center hidden sm:block">{label}</span>
    </button>
  );
}

function ReportAccordion({title,children}:{title:string;children:React.ReactNode}) {
  const [open,setOpen]=useState(false);
  return (
    <div className="border-l-4 border-yellow-500 bg-[#1a1a1a] rounded-r">
      <button onClick={()=>setOpen(!open)} className="w-full flex items-center justify-between px-4 sm:px-5 py-4 text-left gap-3">
        <span className="text-yellow-400 font-bold text-sm sm:text-base">{title}</span>
        {open?<ChevronUp className="w-4 h-4 text-gray-500 shrink-0"/>:<ChevronDown className="w-4 h-4 text-gray-500 shrink-0"/>}
      </button>
      <AnimatePresence>
        {open&&(
          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
            <div className="px-4 sm:px-5 pb-5 pt-3 text-gray-300 text-sm leading-relaxed space-y-3 border-t border-[#2a2a2a]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EvidenceCard({num,label,desc,img,audio,onClick}:{num:number;label:string;desc:string;img?:string;audio?:string;onClick?:()=>void}) {
  const clickable = !!(img||audio);
  return (
    <div
      onClick={clickable?onClick:undefined}
      className={`flex items-start gap-4 bg-[#141414] border border-[#222] rounded-lg p-4 ${clickable?"cursor-pointer hover:border-yellow-600/50 transition-colors group":""}`}
    >
      {img ? (
        <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded border border-[#333]">
          <img src={img} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"/>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity"/>
          </div>
        </div>
      ) : audio ? (
        <div className="relative w-20 h-20 shrink-0 rounded border border-[#333] bg-[#1a1a1a] flex items-center justify-center group-hover:bg-[#1f1f1f] transition-colors">
          <div className="w-9 h-9 rounded-full bg-yellow-600/20 group-hover:bg-yellow-600/30 flex items-center justify-center transition-colors">
            <Play className="w-4 h-4 text-yellow-500 fill-yellow-500 ml-0.5"/>
          </div>
        </div>
      ) : (
        <div className="w-20 h-20 rounded border border-[#333] bg-[#1a1a1a] flex items-center justify-center shrink-0">
          <FileText className="w-6 h-6 text-gray-600"/>
        </div>
      )}
      <div className="min-w-0">
        <span className="text-yellow-500 font-black text-[10px] uppercase tracking-widest">Evidence #{num.toString().padStart(2,"0")}</span>
        <p className="text-white font-semibold text-sm mt-0.5 mb-1">{label}</p>
        <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function EvidenceLightbox({evidence,onClose}:{evidence:{num:number;label:string;desc:string;img?:string;audio?:string}|null;onClose:()=>void}) {
  const audioRef=useRef<HTMLAudioElement|null>(null);
  const wasBgMusicPlaying=useRef(false);

  useEffect(()=>{
    if(!evidence) return;
    const handleKey=(e:KeyboardEvent)=>{ if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown",handleKey);
    return ()=>window.removeEventListener("keydown",handleKey);
  },[evidence,onClose]);

  // Pause the site-wide background music the moment an audio evidence opens,
  // and remember whether it was playing so we can resume it correctly on close.
  useEffect(()=>{
    if(evidence&&evidence.audio){
      const bgMusic=document.getElementById("global-bg-music") as HTMLAudioElement|null;
      if(bgMusic){
        wasBgMusicPlaying.current=!bgMusic.paused;
        bgMusic.pause();
      }
    }
  },[evidence]);

  const resumeBgMusic=()=>{
    if(wasBgMusicPlaying.current){
      const bgMusic=document.getElementById("global-bg-music") as HTMLAudioElement|null;
      if(bgMusic){
        bgMusic.play().catch(()=>{});
      }
      wasBgMusicPlaying.current=false;
    }
  };

  // Stop any playing evidence audio whenever the lightbox closes or switches evidence,
  // and resume the background music if it was paused for this evidence.
  useEffect(()=>{
    return ()=>{
      if(audioRef.current){
        audioRef.current.pause();
        audioRef.current.currentTime=0;
      }
      resumeBgMusic();
    };
  },[evidence]);

  const handleClose=()=>{
    if(audioRef.current){
      audioRef.current.pause();
      audioRef.current.currentTime=0;
    }
    resumeBgMusic();
    onClose();
  };

  return (
    <AnimatePresence>
      {evidence&&(evidence.img||evidence.audio)&&(
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          onClick={handleClose}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6"/>
          </button>
          <motion.div
            initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}}
            onClick={e=>e.stopPropagation()}
            className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
          >
            <div className="bg-[#141414] border border-[#333] rounded-lg overflow-hidden flex flex-col max-h-[90vh] w-full sm:w-[480px]">
              {evidence.img ? (
                <div className="overflow-auto flex items-center justify-center bg-black/30 p-2 sm:p-4">
                  <img src={evidence.img} alt={evidence.label} className="max-w-full max-h-[65vh] object-contain rounded"/>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center bg-black/30 p-8 sm:p-10 gap-4">
                  <div className="w-16 h-16 rounded-full bg-yellow-600/20 flex items-center justify-center">
                    <Play className="w-7 h-7 text-yellow-500 fill-yellow-500 ml-0.5"/>
                  </div>
                  <audio key={evidence.audio} ref={audioRef} controls autoPlay src={evidence.audio} className="w-full">
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              <div className="p-4 sm:p-5 border-t border-[#2a2a2a] shrink-0">
                <span className="text-yellow-500 font-black text-[10px] uppercase tracking-widest">Evidence #{evidence.num.toString().padStart(2,"0")}</span>
                <p className="text-white font-bold text-base sm:text-lg mt-1 mb-1.5">{evidence.label}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{evidence.desc}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PaulineBonusPage() {
  const router=useRouter();
  const [unlocked,setUnlocked]=useState(false);
  const [accessGranted,setAccessGranted]=useState(false);
  const [accessCode,setAccessCode]=useState("");
  const [accessError,setAccessError]=useState(false);
  const [activeTab,setActiveTab]=useState<Tab>("overview");
  const [selectedSuspect,setSelectedSuspect]=useState<string|null>(null);
  const [verdict,setVerdict]=useState("");
  const [verdictError,setVerdictError]=useState(false);
  const [verdictCorrect,setVerdictCorrect]=useState(false);
  const [caseStatus,setCaseStatus]=useState<"active"|"closed">("active");
  const [lightboxEvidence,setLightboxEvidence]=useState<{num:number;label:string;desc:string;img?:string;audio?:string}|null>(null);
  const BONUS_ACCESS_CODE="PQX9-2JLP";

  useEffect(()=>{
    const check=()=>setUnlocked(localStorage.getItem("pauline_case_solved")==="true");
    check();window.addEventListener("storage",check);return()=>window.removeEventListener("storage",check);
  },[]);

  const handleAccessSubmit=()=>{
    if(accessCode.trim().toUpperCase()===BONUS_ACCESS_CODE){setAccessGranted(true);setAccessError(false);}
    else{setAccessError(true);setTimeout(()=>setAccessError(false),3000);}
  };

  const handleVerdictSubmit=()=>{
    const clean=verdict.trim().toLowerCase();
    if(["enzo maralit","enzo","maralit enzo","maralit, enzo"].includes(clean)){setVerdictCorrect(true);setCaseStatus("closed");}
    else{setVerdictError(true);setTimeout(()=>setVerdictError(false),3000);}
  };

  const suspects=[
    {id:"enzo",name:"Enzo Maralit",role:"Person of Interest",age:"21",dob:"August 4, 2003",relation:"Blockmate; Behind-the-scenes Support",photo:"/Cases/bonus/enzo-maralit.png",
     remarks:"Enzo is naturally introverted but dependable — trusted with tasks that require focus and reliability. He is a known academic scholar, reportedly close to Anna Isidro. He recently expressed interest in running for batch president.",
     transcript:[
       {q:"Inv. Pascual: Where were you during the estimated time of the incident?",a:"I was at the villa the whole time. I stayed mostly inside, just around the main area. I left early. Around 10 PM."},
       {q:"Inv. Pascual: Did you have any direct interaction with Shaina that night?",a:"Yes, she approached me at one point. It wasn't a long conversation—just a quick question before she walked away."},
       {q:"Inv. Pascual: What did she say to you?",a:"She asked me about the past trip, specifically if I remembered who was talking that night. It sounded like she was trying to figure something out."},
       {q:"Inv. Pascual: And how did you respond?",a:"I told her I wasn't really paying attention at the time. I didn't want to get involved in any of that, so I just gave a straightforward answer and left it at that."},
     ]},
    {id:"niki",name:"Niki Santos",role:"Person of Interest",age:"21",dob:"October 9, 2003",relation:"Blockmate; Social Circle Insider",photo:"/Cases/bonus/niki-santos.png",
     remarks:"Highly social and outgoing, Niki is known for spreading gossip regardless of verification. She reportedly caused a minor disturbance due to intoxication during the gathering. One classmate recalled that Marco Ortiz once referred to her as 'a headache.'",
     transcript:[
       {q:"Inv. Pascual: Did you interact with Shaina that night?",a:"Yes, she came up to me at one point. It wasn't anything long, just a quick conversation before she walked off again."},
       {q:"Inv. Pascual: What did the two of you talk about?",a:"She brought up the past trip, which I honestly didn't expect. I didn't really take it seriously—it sounded like she was overthinking things."},
       {q:"Inv. Pascual: How did she react after that conversation?",a:"She started assuming things, like I knew something or that I was hiding something—but I'm not. And honestly, Pauline and I weren't even close, so I don't know why she was pressing me about it."},
     ]},
    {id:"adrian",name:"Adrian Vargas",role:"Person of Interest",age:"21",dob:"June 27, 2003",relation:"Blockmate; Organizer of the private reunion",photo:"/Cases/bonus/adrian-vargas.png",
     remarks:"Outgoing and responsible, Adrian organized the private beachside gathering and personally chose the attendees, including Shaina. He described the event as a chance for the group to reconnect and move forward from the prior incident.",
     transcript:[
       {q:"Inv. Pascual: You organized the gathering. Can you confirm that?",a:"Yes, I did. It was meant to be a small reunion—just a chance for everyone to see each other again and move forward. After 1 AM, most of us stayed near the bonfire. I don't remember anyone going too far out… especially not toward the shoreline."},
       {q:"Inv. Pascual: Did you notice Shaina at any point during that time?",a:"I saw her earlier in the evening. She seemed fine then—just interacting with others like usual."},
       {q:"Inv. Pascual: Were you aware of any conversations about the previous incident?",a:"I heard bits and pieces, but nothing specific. I can't really say who started it or what exactly was said."},
     ]},
  ];

  const caseNotes=[
    {id:1,text:"What was Shaina really searching for that night—and what made her believe she would find the answer at the shoreline?"},
    {id:2,text:"Was she silenced for a truth she already understood… or for a truth she was only moments away from proving?"},
    {id:3,text:"Among those present, who had the most to lose if the past refused to stay buried—and why?"},
  ];


  const evidences=[
    {num:1,label:"Notes App — Hidden Realization",desc:"A note typed by Shaina: \"It didn't feel like we were all remembering the same night… And they chose to stay quiet.\"",img:"/Cases/bonus/evidence/pauline/evidence-01-notes-app.jpg"},
    {num:2,label:"Audio Recording (Saved in Phone)",desc:"Recovered from Shaina's phone — a voice memo recorded at the gathering, partial and background-noise heavy.",audio:"/Cases/bonus/audio/pauline-evidence-02.mp3"},
    {num:3,label:"Call Log",desc:"Multiple missed calls and short calls exchanged between Shaina and Enzo Maralit, Niki Santos, and Adrian Vargas in the days before the gathering.",img:"/Cases/bonus/evidence/pauline/evidence-03-call-log.jpg"},
    {num:4,label:"Nighttime Photo — Convenience Store",desc:"Shaina photographed at a convenience-store stand, timestamped Nov 16, 2024, 11:45 PM — placing her away from the bonfire that night.",img:"/Cases/bonus/evidence/pauline/evidence-04-nighttime-photo.jpg"},
    {num:5,label:"SMS Chat with Adrian Vargas",desc:"Shaina asks Adrian if he remembers anything from the night of the original trip — he responds evasively about the shoreline.",img:"/Cases/bonus/evidence/pauline/evidence-05-sms-chat.jpg"},
    {num:6,label:"Facebook Post by Adrian Vargas",desc:"Group photo posted the night of the gathering, captioned \"This is for you, Pau! #ReunionForPauline\" — time-stamped evidence placing everyone present.",img:"/Cases/bonus/evidence/pauline/evidence-06-facebook-post.jpg"},
    {num:7,label:"Search History",desc:"Searches for \"sleeping pills effect on body,\" \"timeline inconsistencies Diaz case,\" and \"Pauline Diaz case\" recovered from a shared device.",img:"/Cases/bonus/evidence/pauline/evidence-07-search-history.jpg"},
    {num:8,label:"SD Card — Recovered Conversation",desc:"Chat retrieved from Marco's powerbank. Describes Enzo as \"reliable — someone who helped without being asked\" and hints at jealousy over Anna.",img:"/Cases/bonus/evidence/pauline/evidence-08-sdcard-chat.jpg"},
    {num:9,label:"Handwritten Note (Found on Sand)",desc:"A torn, dirty note listing \"things that don't add up\" including Pauline's nearly empty house and who knew about the message.",img:"/Cases/bonus/evidence/pauline/evidence-09-handwritten-note.jpg"},
    {num:10,label:"Isla Costa Resort Receipt",desc:"Receipt under Enzo Maralit's name for coffee and bread — confirms his presence at the resort on the date in question.",img:"/Cases/bonus/evidence/pauline/evidence-10-receipt.jpg"},
    {num:11,label:"Event Guest List",desc:"Typed and signed guest list verified by Adrian Vargas, confirming all attendees including Shaina, marked \"confirmed.\"",img:"/Cases/bonus/evidence/pauline/evidence-11-guest-list.jpg"},
    {num:12,label:"Chat with Enzo Maralit",desc:"Shaina asks Enzo to talk privately; he repeatedly avoids involvement, asking her not to drag him into \"drama.\"",img:"/Cases/bonus/evidence/pauline/evidence-12-enzo-chat.jpg"},
    {num:13,label:"Guest Request Form",desc:"Handwritten form filled out by Adrian Vargas requesting a quiet room, citing \"lost my bag\" as the reason for contact.",img:"/Cases/bonus/evidence/pauline/evidence-13-guest-request.jpg"},
    {num:14,label:"Crime Scene — Footprints",desc:"Photo marked with evidence tag \"B,\" showing two sets of footprints near the shoreline behind crime scene tape.",img:"/Cases/bonus/evidence/pauline/evidence-14-footprints.jpg"},
    {num:15,label:"Crime Scene — Body Recovery",desc:"Photo marked with evidence tag \"A,\" showing the position where Shaina's body was discovered along the shoreline.",img:"/Cases/bonus/evidence/pauline/evidence-15-crime-scene.jpg"},
  ];

  const activeSuspect=suspects.find(s=>s.id===selectedSuspect);

  if(!unlocked){return(
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url('/ABOUT US/BLOODY BG.PNG')`,filter:"brightness(0.2) blur(8px)"}}/>
      <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="relative z-10 max-w-md w-full text-center bg-[#111] border border-red-900 rounded-lg p-8 sm:p-10 shadow-2xl">
        <Star className="w-10 h-10 text-red-500 mx-auto mb-4"/>
        <h1 className="text-lg font-bold text-white uppercase tracking-widest mb-3">Bonus File Locked</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">Complete the main Pauline investigation before accessing this file.</p>
        <button onClick={()=>router.push("/cases/pauline")} className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded uppercase tracking-wider transition">Return to Main Case</button>
      </motion.div>
    </div>
  );}

  if(!accessGranted){return(
    <div className="min-h-screen bg-black text-white flex flex-col">
      <CrimeTape/>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="w-full max-w-md">
          <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-5"><FileText className="w-4 h-4 text-red-500"/><span className="text-red-500 text-xs font-bold uppercase tracking-widest">Bonus Case File</span></div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-1 leading-tight">After The Last Trip</h1>
            <div className="w-14 h-0.5 bg-red-600 mb-4"/>
            <p className="text-gray-400 text-sm mb-7">Case Status: <span className="text-red-500 font-bold uppercase tracking-wider">Restricted Access</span></p>
            <div className="space-y-3">
              <input type="text" value={accessCode} onChange={e=>setAccessCode(e.target.value)} onKeyPress={e=>e.key==="Enter"&&handleAccessSubmit()} placeholder="Enter bonus access code" className="w-full bg-[#1a1a1a] text-white border border-[#333] px-4 py-3 rounded text-center font-mono uppercase tracking-widest focus:outline-none focus:border-red-600 text-sm"/>
              <AnimatePresence>{accessError&&(<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded flex items-center gap-2 text-sm"><AlertTriangle className="w-4 h-4 shrink-0"/><span>Invalid access code.</span></motion.div>)}</AnimatePresence>
              <button onClick={handleAccessSubmit} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded uppercase tracking-wider transition">UNLOCK FILE</button>
            </div>
            <p className="text-center text-gray-700 text-xs mt-5 font-mono">CASE NO.: 1743-9930-ZW / SUPPLEMENTAL</p>
          </div>
        </motion.div>
      </div>
      <CrimeTape/>
    </div>
  );}

  const tabs:[{id:Tab;label:string;icon:React.ElementType}]=[
    {id:"overview",label:"Overview",icon:FileText},{id:"victim",label:"Victim",icon:User},{id:"suspects",label:"Suspects",icon:Users},
    {id:"witness",label:"Witness",icon:Eye},{id:"evidences",label:"Evidences",icon:BookOpen},{id:"reports",label:"Reports",icon:ClipboardList},
    {id:"casenotes",label:"Case Notes",icon:BookOpen},{id:"finaldebate",label:"Final Debate",icon:Scale},
  ] as any;

  return(
    <div className="min-h-screen bg-black text-white flex flex-col">
      <CrimeTape/>

      <div className="w-full px-4 sm:px-8 pt-6 pb-4 border-b border-[#1a1a1a]">
        <div className="max-w-[1600px] mx-auto flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2"><FileText className="w-4 h-4 text-red-500 shrink-0"/><span className="text-red-500 text-xs font-bold uppercase tracking-[0.2em]">Bonus Case File</span></div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">After The Last Trip</h1>
            <div className="w-16 h-0.5 bg-red-600 mt-2 mb-2"/>
            <p className="text-gray-400 text-xs sm:text-sm">
              Case Status: <span className={`font-bold uppercase tracking-wider ${caseStatus==="active"?"text-red-500":"text-green-400"}`}>{caseStatus==="active"?"Active Investigation":"Case Closed"}</span>
            </p>
          </div>
          <button onClick={()=>router.push("/cases")} className="text-gray-500 hover:text-white transition text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 shrink-0 mt-1">
            <Home className="w-4 h-4"/><span className="hidden sm:inline">Home</span>
          </button>
        </div>
      </div>

      <div className="w-full border-b border-[#222] bg-[#0d0d0d]">
        <div className="max-w-[1600px] mx-auto flex">
          {tabs.map((t:any)=>(<TabBtn key={t.id} label={t.label} icon={t.icon} active={activeTab===t.id} onClick={()=>{setActiveTab(t.id);setSelectedSuspect(null);}}/>))}
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-6 sm:py-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab+selectedSuspect} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.2}}>

              {activeTab==="overview"&&(
                <div className="bg-[#141414] rounded-lg p-6 sm:p-8 border border-[#222]">
                  <h2 className="text-xl sm:text-2xl font-black text-red-500 mb-5">Case Overview</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
                    <p>Three months after the death of Pauline Diaz, Shaina Dela Cruz attended a small, private beachside gathering in Clavia, Sta. Maro—organized by several individuals who had also been present during the original trip. What was meant to be a quiet reunion soon took a darker turn. Hours later, Shaina was found dead along a nearby stretch of beach, not far from where Pauline's life had ended.</p>
                    <p>While initial findings revealed no visible signs of struggle, recovered data from her phone painted a more troubling picture—she had been revisiting details from the night Pauline died, including her own witness statement.</p>
                    <p className="lg:col-span-2">A few days before the gathering, Shaina had reached out to multiple attendees, asking what they remembered from that night. Investigators now believe that something she uncovered—once overlooked or dismissed—may have held greater significance than anyone initially realized, and that her discovery may have placed her in danger.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-7 pt-6 border-t border-[#222]">
                    {[["Case No.","1743-9930-ZW"],["Victim","Shaina Dela Cruz"],["Location","Clavia, Sta. Maro"],["Date","Nov 15, 2024"],["Cause","Blunt force trauma"],["Status",caseStatus==="active"?"Active":"Closed"]].map(([k,v])=>(
                      <div key={k}><p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{k}</p><p className="text-white text-sm font-semibold">{v}</p></div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab==="victim"&&(
                <div className="bg-[#141414] rounded-lg p-6 sm:p-8 border border-[#222]">
                  <h2 className="text-xl sm:text-2xl font-black text-red-500 mb-5">Victim Profile</h2>
                  <div className="flex flex-col sm:flex-row gap-8 mb-6">
                    <img src="/Cases/bonus/shaina-dela-cruz.png" alt="Shaina Dela Cruz" className="w-full sm:w-48 h-60 object-cover object-top rounded border border-[#333] shrink-0"/>
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Shaina Dela Cruz</h3>
                        <div className="space-y-1 text-gray-300 text-sm mb-4">
                          <p>Age: <span className="text-white font-semibold">21 years old</span></p>
                          <p>Date of Birth: <span className="text-white font-semibold">November 11, 2003</span></p>
                        </div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Remarks</p>
                        <p className="text-gray-300 text-sm leading-relaxed">Shaina Dela Cruz was known among peers as friendly, approachable, and socially well-integrated. Academically, she was recognized as a consistent achiever and described as focused, analytical, and detail-oriented.</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">Despite her easygoing disposition, the victim exhibited strong curiosity and attentiveness, often revisiting details and inconsistencies that others tended to overlook. Prior to her death, she had recently ended a two-year relationship with Justine Veloria, described as quiet and without conflict.</p>
                        <div className="border-l-4 border-red-600 bg-[#1a1a1a] px-4 py-3 rounded-r">
                          <p className="text-red-500 font-bold text-xs uppercase tracking-widest mb-1">Case Relevance</p>
                          <p className="text-gray-300 text-sm">Previously identified as a witness in the case involving Pauline Diaz. Both individuals were confirmed to be blockmates.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed border-t border-[#222] pt-5">Findings indicate that in the days leading up to the incident, the victim may have been attempting to reassess details related to the prior case involving Pauline Diaz. Evidence suggests she had begun to form a conclusion regarding an overlooked aspect of that incident. However, there is no record that she was able to formally disclose or verify this information before her death.</p>
                </div>
              )}

              {activeTab==="suspects"&&!selectedSuspect&&(
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-red-500 mb-5">Suspects</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {suspects.map(s=>(
                      <button key={s.id} onClick={()=>setSelectedSuspect(s.id)} className="group text-left overflow-hidden bg-[#141414] border border-[#222] border-t-4 border-t-yellow-500 hover:border-t-red-600 hover:border-red-600/30 transition-all duration-200 rounded-b-lg">
                        <img src={s.photo} alt={s.name} className="w-full h-60 object-cover object-top group-hover:opacity-90 transition"/>
                        <div className="p-4"><p className="font-bold text-white">{s.name}</p><p className="text-gray-400 text-sm mt-0.5">{s.role}</p></div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab==="suspects"&&selectedSuspect&&activeSuspect&&(
                <div className="bg-[#141414] rounded-lg p-6 sm:p-8 border border-[#222]">
                  <button onClick={()=>setSelectedSuspect(null)} className="text-red-500 hover:text-red-400 text-sm font-semibold mb-5 flex items-center gap-1">← Back to Suspects</button>
                  <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 mb-6">
                    <img src={activeSuspect.photo} alt={activeSuspect.name} className="w-full sm:w-52 h-64 object-cover object-top rounded border border-[#333]"/>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{activeSuspect.name}</h3>
                        <div className="space-y-1 text-sm text-gray-300 mb-4">
                          <p>Age: <span className="text-white font-semibold">{activeSuspect.age} years old</span></p>
                          <p>DOB: <span className="text-white font-semibold">{activeSuspect.dob}</span></p>
                          <p>Relation: <span className="text-white font-semibold">{activeSuspect.relation}</span></p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Remarks</p>
                        <p className="text-gray-300 text-sm leading-relaxed">{activeSuspect.remarks}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-[#2a2a2a] pt-5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Interview Transcript</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {activeSuspect.transcript.map((line,i)=>(
                        <div key={i} className="bg-[#1a1a1a] rounded p-4">
                          <p className="text-gray-400 text-xs font-semibold mb-1.5">{line.q}</p>
                          <p className="text-gray-200 text-sm leading-relaxed border-l-2 border-red-700/40 pl-3">{line.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab==="witness"&&(
                <div className="bg-[#141414] rounded-lg p-6 sm:p-8 border border-[#222]">
                  <h2 className="text-xl sm:text-2xl font-black text-red-500 mb-5">Witness Statement</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
                    <img src="/Cases/bonus/lara-mendoza.png" alt="Lara Mendoza" className="w-full sm:w-52 h-64 object-cover object-top rounded border border-[#333]"/>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Lara Mendoza</h3>
                      <p className="text-gray-400 text-sm mb-4">Witness — Present at the gathering</p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3 text-gray-300 text-sm leading-relaxed">
                        <p>I remember that night pretty clearly because the vibe felt… off, even before anything happened. People were drinking, but it wasn't as loud as usual.</p>
                        <p>I stayed near the bonfire most of the time. That's why I noticed Niki Santos—she didn't seem in the mood at all. She looked distracted, barely talking to anyone.</p>
                        <p>Adrian Vargas was going around, talking to different people. But I remember thinking it was strange how often he kept looking around, like he was checking where everyone was.</p>
                        <p>As for Enzo Maralit, nothing caught my attention at first. But later on… I don't remember seeing him anymore. I assumed he left early.</p>
                        <p>What I do remember clearly is Shaina dela Cruz. She walked away from the group sometime after midnight. She looked focused. Serious. Like she had already decided something.</p>
                        <p className="italic text-gray-400">A bit later, I noticed someone heading toward the shoreline. After a short while, I saw a figure walking back alone. Now I keep wondering… if that person was the last one who saw Shaina alive.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab==="evidences"&&(
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-red-500 mb-5">Evidences</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {evidences.map(ev=>(<EvidenceCard key={ev.num} {...ev} onClick={()=>setLightboxEvidence(ev)}/>))}
                  </div>
                </div>
              )}

              {activeTab==="reports"&&(
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-red-500 mb-5">Reports</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <ReportAccordion title="Police Report">
                      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                        <div><span className="text-gray-500 block">Case No.</span><p className="text-white font-mono">GT6-00P8</p></div>
                        <div><span className="text-gray-500 block">Date</span><p className="text-white">Nov 15, 2024</p></div>
                        <div><span className="text-gray-500 block">Reported By</span><p className="text-white">PO2 Marcus Torres</p></div>
                        <div><span className="text-gray-500 block">Time</span><p className="text-white">6:08 AM</p></div>
                      </div>
                      <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-2">Narrative</p>
                      <p className="text-xs">At approximately 6:00 AM, while conducting routine coastal patrol, PO2 Marcus Torres observed a female individual lying motionless along the shoreline. The victim was identified as Shaina Dela Cruz. Visible bleeding was observed at the back of the head, indicating possible blunt force trauma. No weapon was immediately recovered.</p>
                      <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mt-3 mb-2">Initial Observations</p>
                      <ul className="space-y-1 text-xs">{["Head injury consistent with blunt force impact","No indication of theft or sexual assault","Location suggests intentional movement to semi-concealed area","Scene conditions: low visibility at night"].map((o,i)=>(<li key={i} className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5">•</span><span>{o}</span></li>))}</ul>
                    </ReportAccordion>
                    <ReportAccordion title="Forensic Report">
                      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                        <div><span className="text-gray-500 block">Examiner</span><p className="text-white">Dr. Elisa M. Navarro</p></div>
                        <div><span className="text-gray-500 block">Date</span><p className="text-white">Nov 15, 2024 · 9:30 AM</p></div>
                      </div>
                      <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-2">External Examination</p>
                      <p className="text-xs">Contusion with associated laceration at the occipital region. Dried blood along posterior scalp. No defensive wounds on hands or forearms. No ligature marks or signs of strangulation.</p>
                      <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mt-3 mb-2">Internal Examination</p>
                      <p className="text-xs">Cranial trauma localized at the posterior skull. Fracture identified at the occipital bone with associated intracranial hemorrhage.</p>
                      <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mt-3 mb-1">Opinion</p>
                      <p className="text-xs font-bold text-white">Cause: Blunt force trauma to the head · Manner: Undetermined, pending investigation</p>
                    </ReportAccordion>
                    <ReportAccordion title="Autopsy Report">
                      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                        <div><span className="text-gray-500 block">Case No.</span><p className="text-white font-mono">GT6-00P8</p></div>
                        <div><span className="text-gray-500 block">Date</span><p className="text-white">Nov 15, 2024</p></div>
                      </div>
                      <p className="text-xs">Contusion with laceration at occipital region. Skull fracture at occipital bone with subdural bleeding. Underlying brain tissue shows evidence of traumatic injury.</p>
                      <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                        <div><span className="text-yellow-500 font-bold block mb-1">Time of Death</span><p>2:00 AM – 3:00 AM</p></div>
                        <div><span className="text-yellow-500 font-bold block mb-1">Cause of Death</span><p className="text-white font-bold">Blunt force trauma</p></div>
                      </div>
                    </ReportAccordion>
                  </div>
                </div>
              )}

              {activeTab==="casenotes"&&(
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-red-500 mb-5">Case Notes</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {caseNotes.map(note=>(
                      <div key={note.id} className="border-l-4 border-blue-600 bg-[#141414] px-5 py-4 rounded-r border border-[#222]">
                        <p className="text-blue-400 font-bold text-xs sm:text-sm mb-1.5">Case Note {note.id}</p>
                        <p className="text-gray-300 text-sm leading-relaxed">{note.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab==="finaldebate"&&(
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-red-500 mb-5">Final Debate</h2>
                  {verdictCorrect?(
                    <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="max-w-3xl mx-auto text-center py-10 space-y-6">
                      <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-400 mx-auto"/>
                      <h3 className="text-2xl sm:text-3xl font-black text-white">Case Closed.</h3>
                      <p className="text-gray-300">You identified Enzo Maralit as the second culprit.</p>
                      <div className="bg-[#141414] border border-[#222] rounded-lg p-6 text-left">
                        <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-3">Final Verdict</p>
                        <div className="text-gray-300 text-sm leading-relaxed space-y-3">
                          <p>They said the case was over—that everything that happened to Pauline Diaz had already been explained. But one detail never fit: a pair of two-strap brown slippers found near the shoreline that night—unclaimed, unexplained, and quietly ignored. Months later, a gathering was arranged, a reunion meant to help everyone forget and start over. But not everything was ready to be forgotten. It was then that Shaina dela Cruz returned to that detail, and through a post by Adrian Vargas, she found what others missed—Enzo Maralit, wearing those same slippers. It wasn't proof, but it was enough.</p>
                          <p>What Shaina uncovered pointed to this: Enzo had been there that night—not as the killer, but as someone who became involved after. Evidence from the SD card revealed a conversation between Marco and Pauline, where Marco described Enzo as "reliable"—someone who helped without being asked, someone who followed without question. Enzo was also known to be close with Anna, as stated in his profile, and Pauline had been Anna's bully. Both Enzo and Anna were scholars—outsiders navigating a space they never fully belonged to. So when Enzo saw what happened, fear, loyalty, and his connection to Anna pushed him to help Marco escape—and in his panic, he left behind his slippers.</p>
                          <p>His timeline, however, did not hold. In his interview, Enzo claimed he had left early—around 10:00 PM. But the photos uploaded by Adrian Vargas told a different story. Time-stamped at around 12:00 AM, they showed Enzo still present, still drinking, still part of the gathering he claimed to have already left. When Shaina began asking questions, Enzo noticed. He moved in plain sight, acting normal while deliberately ignoring her calls, already aware of how Marco had been caught. But on the night of the gathering, Shaina asked him to meet her at the shoreline—and this time, he went. Quietly, unseen, just as one witness would later say: "I don't remember seeing him anymore."</p>
                          <p>And when Enzo realized that Shaina already knew—that the truth was no longer suspicion but certainty—panic took over. To protect what he had kept hidden for months, he chose silence over exposure. He struck Shaina with a rock and ended her life in Clavia, Sta. Maro—the same place, but a different resort from where Pauline was found. Shaina dela Cruz was not killed for what she had proven, but for what she already knew—and for the truth Enzo Maralit could no longer allow to be told.</p>
                        </div>
                      </div>
                      <button onClick={()=>router.push("/cases")} className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded uppercase tracking-wider transition inline-flex items-center gap-2"><Home className="w-4 h-4"/>Return to Cases</button>
                    </motion.div>
                  ):(
                    <div className="border border-red-900 rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-b from-red-950/50 to-[#141414] p-6 sm:p-8">
                        <Scale className="w-10 h-10 text-red-500 mx-auto mb-4"/>
                        <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-2">Present Your Case</h3>
                        <p className="text-gray-400 text-center text-sm mb-6">Based on all the evidence, who do you believe committed the murder of Shaina dela Cruz?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 max-w-2xl mx-auto">
                          {suspects.map(s=>(
                            <button key={s.id} onClick={()=>setVerdict(s.name)} className={`p-3 sm:p-4 rounded border transition-all text-center ${verdict===s.name?"border-red-600 bg-red-900/30 text-white":"border-[#333] bg-[#1a1a1a] text-gray-300 hover:border-gray-600"}`}>
                              <p className="font-bold text-sm">{s.name}</p><p className="text-xs text-gray-500 mt-0.5">{s.role}</p>
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                          <div className="border-l-4 border-yellow-500 bg-[#141414] px-4 py-4 rounded-r">
                            <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-3">Key Questions</p>
                            <ul className="space-y-2 text-xs text-gray-300">
                              <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5 shrink-0">•</span><span>Whose timeline was provably false — and why did they lie about when they left?</span></li>
                              <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5 shrink-0">•</span><span>Who was described as 'reliable' in Marco's SD card conversations?</span></li>
                              <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5 shrink-0">•</span><span>Whose slippers were found at the original scene — and seen again months later?</span></li>
                              <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5 shrink-0">•</span><span>Who ignored Shaina's calls, yet agreed to meet her alone at the shoreline?</span></li>
                            </ul>
                          </div>
                          <div>
                            <div className="bg-red-950/30 border border-red-800 rounded p-4 text-center mb-4">
                              <p className="text-red-400 font-bold text-xs uppercase tracking-widest mb-1">Investigator's Challenge</p>
                              <p className="text-gray-300 text-sm">Submit your final accusation. Type the suspect's full name. Only the correct answer will reveal the final verdict.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                              <input type="text" value={verdict} onChange={e=>setVerdict(e.target.value)} onKeyPress={e=>e.key==="Enter"&&handleVerdictSubmit()} placeholder="Full name of suspect..." className="flex-1 bg-[#1a1a1a] text-white border border-[#333] px-4 py-3 rounded text-sm focus:outline-none focus:border-red-600 uppercase"/>
                              <button onClick={handleVerdictSubmit} className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded uppercase tracking-wider text-sm transition whitespace-nowrap">Submit</button>
                            </div>
                            <AnimatePresence>{verdictError&&(<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="mt-3 bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded flex items-center gap-2 text-sm"><AlertTriangle className="w-4 h-4 shrink-0"/><span>Incorrect. Review the evidence again.</span></motion.div>)}</AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <CrimeTape/>

      <EvidenceLightbox evidence={lightboxEvidence} onClose={()=>setLightboxEvidence(null)}/>

      <style jsx global>{`
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .animate-marquee{animation:marquee 22s linear infinite}
      `}</style>
    </div>
  );
}