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

export default function BautistaBonusPage() {
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
  const BONUS_ACCESS_CODE="WG4-U5BV";

  useEffect(()=>{
    const check=()=>setUnlocked(localStorage.getItem("bautista_case_solved")==="true");
    check();window.addEventListener("storage",check);return()=>window.removeEventListener("storage",check);
  },[]);

  const handleAccessSubmit=()=>{
    if(accessCode.trim().toUpperCase()===BONUS_ACCESS_CODE){setAccessGranted(true);setAccessError(false);}
    else{setAccessError(true);setTimeout(()=>setAccessError(false),3000);}
  };

  const handleVerdictSubmit=()=>{
    const clean=verdict.trim().toLowerCase();
    if(["lina magallanes","lina","magallanes lina","magallanes, lina"].includes(clean)){setVerdictCorrect(true);setCaseStatus("closed");}
    else{setVerdictError(true);setTimeout(()=>setVerdictError(false),3000);}
  };

  const suspects=[
    {id:"carlos",name:"Carlos Navarro",role:"Person of Interest",age:"47",dob:"June 10, 1970",relation:"Second Husband of Maria Bautista",photo:"/Cases/bonus/carlos-navarro.png",
     remarks:"Carlos presents a carefully constructed image of control in public but accounts suggest a volatile personality behind closed doors. He had no stable employment prior to marrying Maria, and a separation would have cost him everything.",
     transcript:[
       {q:"Det. Angeles: Witnesses describe your marriage as volatile. How would you characterize it?",a:"People love to listen through doors and pretend they understand what they hear. We argued, but dont act like that makes us some kind of spectacle."},
       {q:"Det. Angeles: Someone overheard you say You cant take away everything from me. What did you mean?",a:"I meant exactly what it sounds like. She was trying to cut me off financially, personally, like I was nothing."},
       {q:"Det. Angeles: Where were you when Maria was poisoned?",a:"I was inside the house. Had a few drinks, moved around a bit. I wasnt tracking every second like I knew this was coming."},
       {q:"Det. Angeles: Why shouldnt we see your financial dependence as motive?",a:"Because youre building a story, not a case. Motive isnt proof."},
     ]},
    {id:"lina",name:"Lina Magallanes",role:"Person of Interest",age:"64",dob:"December 22, 1954",relation:"Head Housekeeper - Bautista Estate",photo:"/Cases/bonus/lina-magallanes.png",
     remarks:"Lina has served the Bautista household for over two decades. Disciplined, composed, and deeply loyal to Arturos children, she never fully approved of Maria. She alone controlled the preparation of Marias meals and had unrestricted access to the estate.",
     transcript:[
       {q:"Det. Angeles: You prepared Maam Marias tea that evening. Is that correct?",a:"Yes. That is part of my routine. I prepare whatever she requests and ensure it is done properly."},
       {q:"Det. Angeles: Did you notice anything different about her behavior before the incident?",a:"She was quieter than usual after dinner. But Maam Marias moods can shift. I did not think it was serious at the time."},
       {q:"Det. Angeles: Do you have any reason to want harm to come to Maria Bautista?",a:"I am employed to serve this household. Whatever personal opinions I hold about the people in it, they remain private."},
     ]},
    {id:"rico",name:"Rico Lumen",role:"Person of Interest",age:"55",dob:"March 4, 1963",relation:"House Gardener - Bautista Estate",photo:"/Cases/bonus/rico-lumen.png",
     remarks:"Rico is a relatively new member of the estate staff, managing outdoor grounds and plant care materials including pesticides. Maria had filed complaints about his performance, and he expressed frustration over delayed salary payments.",
     transcript:[
       {q:"Det. Angeles: Did those financial problems cause resentment toward Maria Bautista?",a:"I was frustrated, yes. But that doesnt mean Id go that far. I wouldnt kill someone over that."},
       {q:"Det. Angeles: Did you retrieve anything from storage before your day off?",a:"I handle whats needed for the plants. Thats part of the job. No, I didnt take anything before I left."},
       {q:"Det. Angeles: Where were you during the time of the incident?",a:"I wasnt there during the day. It was my day off. I came back at night, when there were already police inside."},
     ]},
  ];

  const caseNotes=[
    {id:1,text:"What exactly did Maria Bautista intend to finalize that night—and who knew about it before it was too late?"},
    {id:2,text:"If the poison was delivered through something she willingly consumed, who had the opportunity to do so without raising suspicion?"},
    {id:3,text:"Among those inside the estate, who stood to gain the most from Maria Bautista's death—and who needed it to happen before anything could be signed?"},
  ];


  const evidences=[
    {num:1,label:"Aurora Life Insurance Policy",desc:"Individual life insurance policy document for Maria Bautista, beneficiary designation under review.",img:"/Cases/bonus/evidence/bautista/evidence-01-insurance-policy.jpg"},
    {num:2,label:"Call Log",desc:"Recovered call history showing multiple missed calls between Husband, Atty. Agustin, Victor Bautista, and a jewelry handler.",img:"/Cases/bonus/evidence/bautista/evidence-02-call-log.jpg"},
    {num:3,label:"CCTV Gate Footage",desc:"Primavera Village main gate camera, Jan 19 2019, 9:02 PM, shows a vehicle entering the estate that evening.",img:"/Cases/bonus/evidence/bautista/evidence-03-cctv-gate.jpg"},
    {num:4,label:"Staff Complaint Record",desc:"Handwritten complaint form regarding Ricos performance, filed by Bautista Residence household administration.",img:"/Cases/bonus/evidence/bautista/evidence-04-staff-complaint.jpg"},
    {num:5,label:"Chemical Inventory Report",desc:"Bautista Residence inventory listing organophosphate-based pesticides stored on the property, signed and dated.",img:"/Cases/bonus/evidence/bautista/evidence-05-chemical-inventory.jpg"},
    {num:6,label:"Staff Time-Out Log",desc:"Handwritten household ledger recording staff arrival and departure times the week of the incident.",img:"/Cases/bonus/evidence/bautista/evidence-06-staff-timelog.jpg"},
    {num:7,label:"SMS Chat - Maria",desc:"Text exchange recovered from Marias phone showing a tense conversation in the days before her death.",img:"/Cases/bonus/evidence/bautista/evidence-07-sms-chat.jpg"},
    {num:8,label:"Storage Room Log (Saved on Phone)",desc:"Digital access log showing an entry into the storage area on the date of Ricos scheduled day off."},
    {num:9,label:"Crime Scene - Body Recovery",desc:"Photo marked with evidence tag A, showing Maria Bautistas position when found near the garden seating area.",img:"/Cases/bonus/evidence/bautista/evidence-09-crime-scene-body.jpg"},
    {num:10,label:"Crime Scene - Table and Glassware",desc:"Photo marked with evidence tag B, showing the table, glass, and whiskey bottle near the garden seating area.",img:"/Cases/bonus/evidence/bautista/evidence-10-crime-scene-table.jpg"},
    {num:11,label:"Airline Boarding Pass",desc:"Boarding pass under the name Carlos Navarro, dated near the time of the incident.",img:"/Cases/bonus/evidence/bautista/evidence-11-boarding-pass.jpg"},
    {num:12,label:"Valderosa Bank Statement",desc:"Statement of account showing financial transactions tied to the Bautista estate in the months before the incident.",img:"/Cases/bonus/evidence/bautista/evidence-12-bank-statement.jpg"},
    {num:13,label:"Audio Recording (Saved on Phone)",desc:"Recovered voice recording, partial and background-noise heavy, capturing a tense exchange inside the estate.",audio:"/Cases/bonus/audio/bautista-evidence-13.mp3"},
  ];

  const activeSuspect=suspects.find(s=>s.id===selectedSuspect);

  if(!unlocked){return(
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url('/ABOUT US/BLOODY BG.PNG')`,filter:"brightness(0.2) blur(8px)"}}/>
      <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="relative z-10 max-w-md w-full text-center bg-[#111] border border-red-900 rounded-lg p-8 sm:p-10 shadow-2xl">
        <Star className="w-10 h-10 text-red-500 mx-auto mb-4"/>
        <h1 className="text-lg font-bold text-white uppercase tracking-widest mb-3">Bonus File Locked</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">Complete the main Bautista investigation before accessing this file.</p>
        <button onClick={()=>router.push("/cases/bautista")} className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded uppercase tracking-wider transition">Return to Main Case</button>
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
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-1 leading-tight">The Remaining Empire</h1>
            <div className="w-14 h-0.5 bg-red-600 mb-4"/>
            <p className="text-gray-400 text-sm mb-7">Case Status: <span className="text-red-500 font-bold uppercase tracking-wider">Restricted Access</span></p>
            <div className="space-y-3">
              <input type="text" value={accessCode} onChange={e=>setAccessCode(e.target.value)} onKeyPress={e=>e.key==="Enter"&&handleAccessSubmit()} placeholder="Enter bonus access code" className="w-full bg-[#1a1a1a] text-white border border-[#333] px-4 py-3 rounded text-center font-mono uppercase tracking-widest focus:outline-none focus:border-red-600 text-sm"/>
              <AnimatePresence>{accessError&&(<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded flex items-center gap-2 text-sm"><AlertTriangle className="w-4 h-4 shrink-0"/><span>Invalid access code.</span></motion.div>)}</AnimatePresence>
              <button onClick={handleAccessSubmit} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded uppercase tracking-wider transition">UNLOCK FILE</button>
            </div>
            <p className="text-center text-gray-700 text-xs mt-5 font-mono">CASE NO.: BX25-02 / SUPPLEMENTAL</p>
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">The Remaining Empire</h1>
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
                    <p>Following the death of Arturo Bautista and the arrest of his son Ramon, the Bautista estate was left in a fragile, contested state. Maria Bautista, Arturo's second wife, remained in the household, steadily reorganizing her personal affairs and asserting her claim over what she believed was rightfully hers.</p>
                    <p>Tension within the estate escalated quietly. Staff loyal to the late Arturo's children regarded Maria with suspicion, while her new husband Carlos Navarro faced his own financial precarity tied entirely to the marriage.</p>
                    <p className="lg:col-span-2">On the night of the incident, Maria Bautista was found unresponsive in the estate's garden, a glass of whiskey and her evening tea nearby. Toxicology would later confirm what investigators suspected: this was no natural death. Someone inside the estate had access, motive, and the knowledge to make it happen without raising alarm.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-7 pt-6 border-t border-[#222]">
                    {[["Case No.","BX25-02"],["Victim","Maria Bautista"],["Location","Bautista Estate"],["Date","Jan 19, 2019"],["Cause","Organophosphate poisoning"],["Status",caseStatus==="active"?"Active":"Closed"]].map(([k,v])=>(
                      <div key={k}><p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{k}</p><p className="text-white text-sm font-semibold">{v}</p></div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab==="victim"&&(
                <div className="bg-[#141414] rounded-lg p-6 sm:p-8 border border-[#222]">
                  <h2 className="text-xl sm:text-2xl font-black text-red-500 mb-5">Victim Profile</h2>
                  <div className="flex flex-col sm:flex-row gap-8 mb-6">
                    <img src="/Cases/bonus/maria-bautista.png" alt="Maria Bautista" className="w-full sm:w-48 h-60 object-cover object-top rounded border border-[#333] shrink-0"/>
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Maria Bautista-Navarro</h3>
                        <div className="space-y-1 text-gray-300 text-sm mb-4">
                          <p>Age: <span className="text-white font-semibold">38 years old</span></p>
                          <p>Date of Birth: <span className="text-white font-semibold">July 9, 1988</span></p>
                        </div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Remarks</p>
                        <p className="text-gray-300 text-sm leading-relaxed">Maria Bautista, second wife of Arturo Bautista, assumed a dominant role in the estate following her husbands death, focusing on securing what she believed was her rightful share of his fortune.</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">Less than a year after Arturos passing, she remarried Carlos Navarro. Maria had developed a reputation for an abrasive temperament toward long-time Bautista staff, and had been admitted to hospitals for panic attacks linked to her new marriage.</p>
                        <div className="border-l-4 border-red-600 bg-[#1a1a1a] px-4 py-3 rounded-r">
                          <p className="text-red-500 font-bold text-xs uppercase tracking-widest mb-1">Case Relevance</p>
                          <p className="text-gray-300 text-sm">Arturo Bautistas second wife and primary heir, controlling most of his fortune, placing her at the center of conflict over the estate.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed border-t border-[#222] pt-5">Maria had been making preparations that would significantly affect the distribution of the Bautista estate, placing her in direct conflict with individuals who stood to lose significant assets, and with those whose loyalty lay elsewhere within the household.</p>
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
                    <div className="w-full sm:w-52 h-64 bg-[#1a1a1a] rounded border border-[#333] overflow-hidden flex items-center justify-center">
                      <div className="text-center p-4"><User className="w-10 h-10 text-gray-600 mx-auto mb-2"/><p className="text-gray-500 text-xs">Elena Cruz</p></div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Elena Cruz</h3>
                      <p className="text-gray-400 text-sm mb-4">Household Staff - 12 years of service</p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3 text-gray-300 text-sm leading-relaxed">
                        <p>I have been working in the Bautista household for over a decade. On the day of the incident, I was performing my usual duties inside the main house.</p>
                        <p>In the late afternoon, I overheard an argument between Maam Maria and her husband, Sir Carlos. Their voices were raised, and I clearly heard Sir Carlos say: You are not taking this away from me!</p>
                        <p>After the argument, Maam Maria appeared visibly upset and was quiet during dinner preparation. That evening, I saw Lina preparing Maam Marias tea, which is part of her usual routine.</p>
                        <p>Later on, Maam Maria stepped out toward the garden area alone. I did not see anyone follow her. A short while after, she was found unresponsive near the garden seating area.</p>
                        <p className="italic text-gray-400">When Maam Maria was found unresponsive and the authorities arrived, I noticed that Rico was already home. It struck me as unusual, as he had returned earlier than he normally does.</p>
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
                        <div><span className="text-gray-500 block">Case No.</span><p className="text-white font-mono">PQ6-O12</p></div>
                        <div><span className="text-gray-500 block">Date</span><p className="text-white">Jan 19, 2019</p></div>
                        <div><span className="text-gray-500 block">Reported By</span><p className="text-white">Elena Cruz</p></div>
                        <div><span className="text-gray-500 block">Time</span><p className="text-white">10:15 PM</p></div>
                      </div>
                      <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-2">Narrative</p>
                      <p className="text-xs">At approximately 10:15 PM, Elena Cruz contacted authorities after discovering Maria Bautista unresponsive in the garden area. The victim was last seen after dinner before exiting alone toward the garden. No unusual sounds or signs of struggle were reported prior to discovery.</p>
                      <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mt-3 mb-2">Initial Observations</p>
                      <ul className="space-y-1 text-xs">{["Victim found lying on the ground, unresponsive","No visible external injuries or wounds","No signs of forced entry or physical altercation","Surrounding area appeared undisturbed"].map((o,i)=>(<li key={i} className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5">•</span><span>{o}</span></li>))}</ul>
                    </ReportAccordion>
                    <ReportAccordion title="Forensic Report">
                      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                        <div><span className="text-gray-500 block">Examiner</span><p className="text-white">Dr. Ed Fajardo</p></div>
                        <div><span className="text-gray-500 block">Laboratory</span><p className="text-white">Sta. Monica Gen. Hospital</p></div>
                      </div>
                      <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-2">Laboratory Findings</p>
                      <p className="text-xs">Toxicological analysis revealed organophosphate compounds (Chlorpyrifos) in blood and gastric contents, indicating recent ingestion. Marked inhibition of acetylcholinesterase activity confirmed.</p>
                      <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mt-3 mb-1">Determination</p>
                      <p className="text-xs font-bold text-white">Cause: Acute Organophosphate Poisoning · Manner: Homicide</p>
                    </ReportAccordion>
                    <ReportAccordion title="Autopsy Report">
                      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                        <div><span className="text-gray-500 block">Case No.</span><p className="text-white font-mono">PQ6-O12</p></div>
                        <div><span className="text-gray-500 block">Date</span><p className="text-white">Jan 19, 2019</p></div>
                      </div>
                      <p className="text-xs">No visible external injuries. Mild cyanosis on lips and fingernails. Stomach contents reveal partially digested food with chemical odor. Liver and kidneys show congestion consistent with toxic exposure.</p>
                      <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                        <div><span className="text-yellow-500 font-bold block mb-1">Time of Death</span><p>Est. 9:55-10:10 PM, Jan 19</p></div>
                        <div><span className="text-yellow-500 font-bold block mb-1">Cause of Death</span><p className="text-white font-bold">Organophosphate poisoning</p></div>
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
                      <p className="text-gray-300">You identified Lina Magallanes as the culprit.</p>
                      <div className="bg-[#141414] border border-[#222] rounded-lg p-6 text-left">
                        <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-3">Final Verdict</p>
                        <div className="text-gray-300 text-sm leading-relaxed space-y-3">
                          <p>On the evening of the incident, within the quiet confines of the Bautista estate, Maria Bautista met her end in the garden she once freely walked. After requesting tea, she stepped outside alone, unaware that death had already been set in motion. There, beneath the stillness of the night, the poison began its work—slow, silent, and irreversible—until she collapsed near the garden seating area, far from help, and far from suspicion.</p>
                          <p>The method was deliberate and concealed. Lina Magallanes, the head housekeeper, stood at the center of it. Entrusted with the household and its routines, she alone controlled the preparation of Maria's drink. The key she had given to Rico Lumen was only a duplicate—while she retained the main key, granting her unrestricted access. It was during Rico's day off that Lina retrieved the poison, ensuring no witness, no interference. When Maria's tea was prepared, it carried more than comfort—it carried intent.</p>
                          <p>But the act was not born from greed—it was born from belief. Lina Magallanes had long been loyal to the Bautista clan, devoting her life not only to the household but to the preservation of its legacy. When she learned that Maria was planning to sell off significant parts of the estate and its assets, she brought this to Mara Bautista—the rightful daughter, who had already vowed to claim what was hers, no matter the cost. Mara did not command. She did not need to. Her grief, her fear of loss, her quiet desperation—these became the words Lina chose to hear. And in that silence, a decision was made.</p>
                          <p>In the end, Lina Magallanes carried out the murder—her hands steady, her purpose clear. Yet the force that moved them did not begin with her. Mara Bautista never touched the poison, never stepped into the act, but her will cast a shadow long enough to reach it. Lina delivered the death—but it was Mara's cause that gave it life.</p>
                        </div>
                      </div>
                      <button onClick={()=>router.push("/cases")} className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded uppercase tracking-wider transition inline-flex items-center gap-2"><Home className="w-4 h-4"/>Return to Cases</button>
                    </motion.div>
                  ):(
                    <div className="border border-red-900 rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-b from-red-950/50 to-[#141414] p-6 sm:p-8">
                        <Scale className="w-10 h-10 text-red-500 mx-auto mb-4"/>
                        <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-2">Present Your Case</h3>
                        <p className="text-gray-400 text-center text-sm mb-6">Based on all the evidence, who do you believe poisoned Maria Bautista?</p>
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
                              <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5 shrink-0">•</span><span>Who alone had access and knowledge to introduce poison into Marias tea?</span></li>
                              <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5 shrink-0">•</span><span>Whose master key, not the duplicate, could open storage on Ricos day off?</span></li>
                              <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5 shrink-0">•</span><span>Who had a two-decade loyalty to the Bautista legacy, and quiet resentment of Maria?</span></li>
                              <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5 shrink-0">•</span><span>What did Mara Bautistas desperation silently give permission for?</span></li>
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