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

export default function EsmeraldaBonusPage() {
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
  const BONUS_ACCESS_CODE="VD2K-UJR5";

  useEffect(()=>{
    const check=()=>setUnlocked(localStorage.getItem("esmeralda_case_solved")==="true");
    check();window.addEventListener("storage",check);return()=>window.removeEventListener("storage",check);
  },[]);

  const handleAccessSubmit=()=>{
    if(accessCode.trim().toUpperCase()===BONUS_ACCESS_CODE){setAccessGranted(true);setAccessError(false);}
    else{setAccessError(true);setTimeout(()=>setAccessError(false),3000);}
  };

  const handleVerdictSubmit=()=>{
    const clean=verdict.trim().toLowerCase();
    if(["jerik argales","jerik","argales jerik","argales, jerik"].includes(clean)){setVerdictCorrect(true);setCaseStatus("closed");}
    else{setVerdictError(true);setTimeout(()=>setVerdictError(false),3000);}
  };

  const suspects=[
    {id:"oliver",name:"Atty. Oliver Rojas",role:"Person of Interest",age:"40",dob:"June 12, 1983",relation:"Networks Legal Counsel",photo:"/Cases/bonus/oliver-rojas.png",
     remarks:"Identified as the networks legal consultant, responsible for drafting contracts and enforcing NDAs. Gloria had begun compiling records that may directly implicate Rojas in falsified contracts.",
     transcript:[
       {q:"Inv. Samson: Kailan mo huling nakausap si Gloria?",a:"Mga ilang araw bago ang insidente. May inaayos kaming documents noon, pero wala namang kakaiba sa usapan namin."},
       {q:"Inv. Samson: May napansin ka bang pagbabago sa ugali niya bago siya mamatay?",a:"Medyo tahimik siya at parang may iniisip. Pero hindi ko na pinakialaman."},
       {q:"Inv. Samson: Nasaan ka noong oras ng insidente?",a:"Nasa law firm ko ako buong gabi. May inaayos akong mga dokumento at hindi ako umalis doon."},
       {q:"Inv. Samson: May kinalaman ka ba sa pagkamatay ni Gloria?",a:"Wala. Wala akong dahilan para saktan siya. Trabaho lang ang koneksyon namin."},
     ]},
    {id:"leo",name:"Leo Vinzon",role:"Person of Interest",age:"52",dob:"September 3, 1971",relation:"Investor",photo:"/Cases/bonus/leo-vinzon.png",
     remarks:"A high-profile businessman with undisclosed financial interests linked to select private ventures. Vinzon maintains a clean public image and provides private security services, including operative personnel.",
     transcript:[
       {q:"Inv. Samson: Ano ang relasyon mo kay Gloria?",a:"Wala kaming personal na relasyon. Kung sakali mang nagkaroon ng koneksyon, posibleng sa pamamagitan lang ng business dealings."},
       {q:"Inv. Samson: May naging transaksyon ba kayo ni Gloria?",a:"Wala akong maalalang direkta. Kung meron man, maaaring dumaan lang sa intermediaries."},
       {q:"Inv. Samson: Nasaan ka noong oras ng insidente?",a:"Nasa opisina ako. May mga miting na naka-schedule sa akin na gabi na iyon at hindi ako lumabas."},
       {q:"Inv. Samson: May kinalaman ka ba sa pagkamatay ni Gloria?",a:"Wala. At inaasahan ko na ang aking kooperasyon dito ay sapat na patunay ng aking kalinisan."},
     ]},
    {id:"daniel",name:"Daniel Martinez",role:"Person of Interest",age:"49",dob:"July 4, 1975",relation:"Husband of Gloria Martinez",photo:"/Cases/bonus/daniel-martinez.png",
     remarks:"An unemployed individual financially dependent on Gloria. Described as unmotivated with tendencies toward gambling. Gloria had been preparing to file for separation before the incident.",
     transcript:[
       {q:"Inv. Samson: Ano ang iyong relasyon kay Gloria sa panahon ng insidente?",a:"Mag-asawa pa kami pero matagal na kaming may problema. Alam na namin na paparating na ang hiwalayan."},
       {q:"Inv. Samson: Alam mo ba ang mga dokumento na kinokolekta niya?",a:"Medyo oo. Sinabi niya sa akin na may mga bagay siyang nais ibunyag, pero hindi niya sinabi kung tungkol sa sino."},
       {q:"Inv. Samson: Nasaan ka noong gabi ng insidente?",a:"Nasa bahay lang ako. Hindi ako lumabas ng gabi na iyon."},
     ]},
    {id:"jerik",name:"Jerik Argales",role:"Reporting Party",age:"30",dob:"February 14, 1995",relation:"Falcon Gate Systems Security Employee",photo:"/Cases/bonus/jerik-argales.png",
     remarks:"Presented himself as a concerned passerby who reported discovering Gloria's body. Employed by Falcon Gate Systems Security, the same agency tied to Leo Vinzon. His account of the scene contained details no passerby could have known.",
     transcript:[
       {q:"Inv. Samson: Paano mo natuklasan ang biktima?",a:"Pauwi na sana ako nang mapadaan ako sa lugar kung saan naka-park ang sasakyan niya. Nakita kong hindi siya gumagalaw kaya lumapit ako."},
       {q:"Inv. Samson: Bakit napakadetalyado ang inilarawan mong sugat at mga dokumento sa loob ng sasakyan?",a:"Nasilip ko lang sa bintana. Nakita ko na may dugo at mga papeles sa loob."},
       {q:"Inv. Samson: Ang autopsy ay nagpapakita na matagal na siyang patay bago ka tumawag. Paano mo ipapaliwanag iyon?",a:"Hindi ko alam. Baka mali ang oras na nakuha ko o na-shock lang ako kaya natagalan akong tumawag."},
       {q:"Inv. Samson: May koneksyon ka ba kay Leo Vinzon?",a:"Empleyado lang ako ng Falcon Gate. Hindi ko siya personal na kakilala."},
     ]},
  ];


  const caseNotes=[
    {id:1,text:"What circumstances or pressures might have led Gloria Martinez to withdraw and make sudden personal preparations prior to her death?"},
    {id:2,text:"In what way could the interaction inside the vehicle have unfolded, and what factors might explain the absence of struggle?"},
    {id:3,text:"Which aspects of the reporting party's account warrant closer examination, and how might they affect the reconstruction of the timeline?"},
    {id:4,text:"How might the backgrounds, motives, and recent actions of the suspects influence their potential involvement in the incident?"},
    {id:5,text:"What possible reasons could explain why the incident occurred in a secluded alleyway rather than a more public location?"},
  ];


  const evidences=[
    {num:1,label:"Text Message Exchange",desc:"A heated exchange retrieved from Glorias phone. The messages reference gamot, identified as code, not medicine.",img:"/Cases/bonus/evidence/esmeralda/evidence-01-sms-chat.jpg"},
    {num:2,label:"Bank Statement",desc:"Silver Oak Community Bank statement showing recent large withdrawals inconsistent with her known expenses.",img:"/Cases/bonus/evidence/esmeralda/evidence-02-bank-statement.jpg"},
    {num:3,label:"CCTV Footage - Street Camera",desc:"Partial recording from the vicinity of the incident showing a nighttime exchange between two figures.",img:"/Cases/bonus/evidence/esmeralda/evidence-03-cctv-footage.jpg"},
    {num:4,label:"Marketing Agreement Document",desc:"Celestia Network and Northestone Ventures endorsement agreement, evidence-tagged and flagged for review.",img:"/Cases/bonus/evidence/esmeralda/evidence-04-marketing-agreement.jpg"},
    {num:5,label:"Phone with SMS (Evidence Tagged)",desc:"Recovered phone showing a green SMS thread, tagged as evidence at the scene.",img:"/Cases/bonus/evidence/esmeralda/evidence-05-phone-sms-tag.jpg"},
    {num:6,label:"Phone Records List (Evidence Tagged)",desc:"Recovered phone showing a call records list, tagged as evidence at the scene.",img:"/Cases/bonus/evidence/esmeralda/evidence-06-phone-records-tag.jpg"},
    {num:7,label:"Crime Scene - Box and Vials",desc:"Confidential concealed files box and vials recovered behind crime scene tape.",img:"/Cases/bonus/evidence/esmeralda/evidence-07-box-vials.jpg"},
    {num:8,label:"Couple Photo (Timestamped)",desc:"Photo timestamped 12/22/24, 7:30 PM, showing Gloria and a companion at an event.",img:"/Cases/bonus/evidence/esmeralda/evidence-08-couple-photo.jpg"},
    {num:9,label:"Car Backseat Bag (Evidence Tagged)",desc:"A bag recovered from the backseat of the vehicle, tagged as evidence at the scene.",img:"/Cases/bonus/evidence/esmeralda/evidence-09-car-backseat-bag.jpg"},
    {num:10,label:"Chat with Mr. Leo",desc:"Recovered conversation thread referencing a drop-off arrangement and a warning about staying quiet.",img:"/Cases/bonus/evidence/esmeralda/evidence-10-mr-leo-chat.jpg"},
    {num:11,label:"Casa Luna Motel Receipt",desc:"Official receipt under the name Daniel Martinez, dated near the time of the incident.",img:"/Cases/bonus/evidence/esmeralda/evidence-11-motel-receipt.jpg"},
  ];

  const activeSuspect=suspects.find(s=>s.id===selectedSuspect);

  if(!unlocked){return(
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url('/ABOUT US/BLOODY BG.PNG')`,filter:"brightness(0.2) blur(8px)"}}/>
      <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="relative z-10 max-w-md w-full text-center bg-[#111] border border-red-900 rounded-lg p-8 sm:p-10 shadow-2xl">
        <Star className="w-10 h-10 text-red-500 mx-auto mb-4"/>
        <h1 className="text-lg font-bold text-white uppercase tracking-widest mb-3">Bonus File Locked</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">Complete the main Esmeralda investigation before accessing this file.</p>
        <button onClick={()=>router.push("/cases/esmeralda")} className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded uppercase tracking-wider transition">Return to Main Case</button>
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
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-1 leading-tight">Voices from the Shadows</h1>
            <div className="w-14 h-0.5 bg-red-600 mb-4"/>
            <p className="text-gray-400 text-sm mb-7">Case Status: <span className="text-red-500 font-bold uppercase tracking-wider">Restricted Access</span></p>
            <div className="space-y-3">
              <input type="text" value={accessCode} onChange={e=>setAccessCode(e.target.value)} onKeyPress={e=>e.key==="Enter"&&handleAccessSubmit()} placeholder="Enter bonus access code" className="w-full bg-[#1a1a1a] text-white border border-[#333] px-4 py-3 rounded text-center font-mono uppercase tracking-widest focus:outline-none focus:border-red-600 text-sm"/>
              <AnimatePresence>{accessError&&(<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded flex items-center gap-2 text-sm"><AlertTriangle className="w-4 h-4 shrink-0"/><span>Invalid access code.</span></motion.div>)}</AnimatePresence>
              <button onClick={handleAccessSubmit} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded uppercase tracking-wider transition">UNLOCK FILE</button>
            </div>
            <p className="text-center text-gray-700 text-xs mt-5 font-mono">CASE NO.: 1B5XC-Y09 / SUPPLEMENTAL</p>
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">Voices from the Shadows</h1>
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
                    <p>Following the revelations in the Esmeralda case, attention shifted toward individuals operating behind her career, most notably her talent manager, Gloria Martinez. In the weeks that followed, Gloria reportedly grew increasingly withdrawn, limiting interactions while compiling sensitive documents tied to contracts and key figures in the network.</p>
                    <p>Whether her actions were driven by guilt or self-preservation remains unclear, but they suggested a deeper awareness of events she had yet to disclose.</p>
                    <p className="lg:col-span-2">On the night of the incident, Gloria Martinez was discovered lifeless inside her vehicle, parked in an isolated area on San Isidro St., Castamar City. She sustained a single fatal stab wound, with no signs of forced entry or visible struggle. The man who reported the crime knew far too much, and his timeline did not hold.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-7 pt-6 border-t border-[#222]">
                    {[["Case No.","1B5XC-Y09"],["Victim","Gloria Martinez"],["Location","San Isidro St., Castamar"],["Date","Dec 22, 2025"],["Cause","Stab wound"],["Status",caseStatus==="active"?"Active":"Closed"]].map(([k,v])=>(
                      <div key={k}><p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{k}</p><p className="text-white text-sm font-semibold">{v}</p></div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab==="victim"&&(
                <div className="bg-[#141414] rounded-lg p-6 sm:p-8 border border-[#222]">
                  <h2 className="text-xl sm:text-2xl font-black text-red-500 mb-5">Victim Profile</h2>
                  <div className="flex flex-col sm:flex-row gap-8 mb-6">
                    <img src="/Cases/bonus/gloria-martinez.png" alt="Gloria Martinez" className="w-full sm:w-48 h-60 object-cover object-top rounded border border-[#333] shrink-0"/>
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Gloria Martinez</h3>
                        <div className="space-y-1 text-gray-300 text-sm mb-4">
                          <p>Estimated Age: <span className="text-white font-semibold">Late 40s to Early 50s</span></p>
                          <p>Height: <span className="text-white font-semibold">Approx. 160 cm (5'3")</span></p>
                        </div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Remarks</p>
                        <p className="text-gray-300 text-sm leading-relaxed">Gloria Martinez was known in the industry as a strict and highly transactional talent manager, often perceived as someone who prioritized profit above all else.</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">Following the exposure of Esmeraldas case, Glorias behavior reportedly shifted. She became increasingly withdrawn, limiting communication and allegedly compiling sensitive files she intended to use as leverage to escape the situation she found herself in.</p>
                        <div className="border-l-4 border-red-600 bg-[#1a1a1a] px-4 py-3 rounded-r">
                          <p className="text-red-500 font-bold text-xs uppercase tracking-widest mb-1">Case Relevance</p>
                          <p className="text-gray-300 text-sm">Talent manager of Esmeralda Rojas. Her recent collection of sensitive documents made her a direct threat to key figures in the network.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed border-t border-[#222] pt-5">Gloria was also facing personal struggles, including a deteriorating marriage marked by reports of physical abuse. In her final days, she was not only trying to protect herself, she was preparing to disappear entirely.</p>
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
                      <div className="text-center p-4"><User className="w-10 h-10 text-gray-600 mx-auto mb-2"/><p className="text-gray-500 text-xs">Jerik Argales</p></div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Jerik Argales</h3>
                      <p className="text-gray-400 text-sm mb-4">Reporting Party - Falcon Gate Systems Security</p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3 text-gray-300 text-sm leading-relaxed">
                        <p>Ako si Jerik Argales, tatlumpung taong gulang, kasalukuyang empleyado ng Falcon Gate Systems Security. Pauwi na sana ako nang mapadaan ako sa lugar kung saan naka-park ang sasakyan ng biktima.</p>
                        <p>Habang ako ay naglalakad, napansin ko na may isang babae sa loob ng kotse na hindi gumagalaw, kaya ako ay lumapit upang tiyakin kung siya ay nasa maayos na kalagayan.</p>
                        <p>Paglapit ko sa sasakyan, nakita ko na siya ay nakasandal sa upuan at may dugo sa bahagi ng kanyang tiyan. Mula sa labas ng sasakyan, sinubukan kong silipin ang loob at napansin ko na may ilang dokumento sa loob ng compartment.</p>
                        <p>Dahil sa aking nakita, agad akong tumawag sa pulis upang i-report ang insidente. Hindi ko na ginalaw yung kahit anong nasa loob ng sasakyan.</p>
                        <p className="italic text-gray-400">Note: The autopsy confirmed Gloria had already been dead for an extended period before this call was made. His description of the wound and documents inside could not have been observed by a casual passerby.</p>
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
                        <div><span className="text-gray-500 block">Report No.</span><p className="text-white font-mono">CPD-24-02-2897</p></div>
                        <div><span className="text-gray-500 block">Date</span><p className="text-white">Dec 22, 2025</p></div>
                        <div><span className="text-gray-500 block">Reporting Party</span><p className="text-white">Jerik Argales</p></div>
                        <div><span className="text-gray-500 block">Time</span><p className="text-white">11:42 PM</p></div>
                      </div>
                      <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-2">Narrative</p>
                      <p className="text-xs">At approximately 11:42 PM, the Castamar Police Department received a call from Jerik Argales reporting an unresponsive female inside a parked vehicle. The vehicle showed no signs of forced entry or struggle. The victim was declared dead at approximately 11:30 PM, before the call was made.</p>
                      <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mt-3 mb-2">Initial Observations</p>
                      <ul className="space-y-1 text-xs">{["No signs of forced entry or struggle","Victim remained seated at time of attack","No defensive injuries observed","Scene consistent with targeted, deliberate assault"].map((o,i)=>(<li key={i} className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5">•</span><span>{o}</span></li>))}</ul>
                    </ReportAccordion>
                    <ReportAccordion title="Forensic Report">
                      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                        <div><span className="text-gray-500 block">Examiner</span><p className="text-white">Dr. Jane Jimenez</p></div>
                        <div><span className="text-gray-500 block">Date</span><p className="text-white">Dec 23, 2025 · 9:15 AM</p></div>
                      </div>
                      <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-2">External Examination</p>
                      <p className="text-xs">Single stab wound on the anterior abdomen, slightly left of midline, approx. 3.2 cm. Clean, well-defined edges consistent with a sharp-edged weapon. No defensive injuries observed.</p>
                      <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mt-3 mb-1">Determination</p>
                      <p className="text-xs font-bold text-white">Cause: Single penetrating stab wound · Manner: Homicide</p>
                    </ReportAccordion>
                    <ReportAccordion title="Autopsy Report">
                      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                        <div><span className="text-gray-500 block">Case No.</span><p className="text-white font-mono">CPD-24-02-2897</p></div>
                        <div><span className="text-gray-500 block">Date</span><p className="text-white">Dec 23, 2025</p></div>
                      </div>
                      <p className="text-xs">Rigor mortis present, consistent with estimated time of death. Blouse and slacks heavily stained with blood concentrated in the abdominal region. Toxicology specimens collected, results pending.</p>
                      <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                        <div><span className="text-yellow-500 font-bold block mb-1">Time of Death</span><p>Evening, Dec 22, 2025</p></div>
                        <div><span className="text-yellow-500 font-bold block mb-1">Cause of Death</span><p className="text-white font-bold">Stab wound to abdomen</p></div>
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
                      <p className="text-gray-300">You identified Jerik Argales as the operative.</p>
                      <div className="bg-[#141414] border border-[#222] rounded-lg p-6 text-left">
                        <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-3">Final Verdict</p>
                        <div className="text-gray-300 text-sm leading-relaxed space-y-3">
                          <p>Gloria Martinez was killed on the night of the incident inside her own vehicle, parked in a quiet, dimly lit area where visibility was low and witnesses were unlikely. She sustained a single, fatal stab wound to the abdomen—precise, controlled, and delivered at close range. There were no signs of forced entry, no defensive wounds, and no indication of struggle. Everything about the scene points to one undeniable truth: Gloria trusted the person who entered her car. This was not a crime of impulse—it was calculated, deliberate, and executed by someone who knew exactly what they were doing.</p>
                          <p>The man who reported the crime attempted to present himself as nothing more than a concerned passerby. Yet his own words betrayed him. In his statement, he described the wound in detail and referenced documents inside the vehicle—details that could not have been observed without direct involvement. Autopsy analysis further confirmed that Gloria had already been dead long before the call was made. His timeline did not align with reality. It wasn't a mistake—it was a miscalculation. The caller was never a witness. He was the killer, later identified as Jerik Argales—the unknown number on Gloria's phone who arranged the meeting under the pretense of buying the files she had against Leo Vinzon.</p>
                          <p>The strongest evidence lies within what was missing. Investigators discovered that the recovered files were labeled "18/18," suggesting completeness—yet only 12 documents were present. Six had been deliberately removed. These were not random losses; they were specific documents connected to one individual: Leo Vinzon. This selective absence reveals intent. The killer was not only there to end Gloria's life, but to retrieve and eliminate evidence. The planned "exchange" of money and files—meant to buy the documents Gloria had against him—was nothing more than a front arranged through Jerik, ensuring she would agree to meet, while concealing the true intent.</p>
                          <p>That operation leads directly to Leo Vinzon. As CEO of Falcon Gate Systems Security, he moved in plain sight—maintaining a legitimate image while secretly orchestrating actions behind the scenes. Prior evidence, particularly the "Contacts" record from the main case, ties him to the same agency his operative claimed to work for, confirming the chain of connection. The meeting was never meant to end in negotiation; it was designed to end Gloria's life. The motive is clear, the execution precise, and the evidence intentionally altered. Gloria Martinez was not just killed—she was erased. Ordered silenced by the very man she could expose. Leo Vinzon did not just try to bury the truth—he dismantled it, piece by piece… believing no one would ever put it back together.</p>
                        </div>
                      </div>
                      <button onClick={()=>router.push("/cases")} className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded uppercase tracking-wider transition inline-flex items-center gap-2"><Home className="w-4 h-4"/>Return to Cases</button>
                    </motion.div>
                  ):(
                    <div className="border border-red-900 rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-b from-red-950/50 to-[#141414] p-6 sm:p-8">
                        <Scale className="w-10 h-10 text-red-500 mx-auto mb-4"/>
                        <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-2">Present Your Case</h3>
                        <p className="text-gray-400 text-center text-sm mb-6">Based on all the evidence, who do you believe killed Gloria Martinez?</p>
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
                              <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5 shrink-0">•</span><span>Who reported the crime, and knew details only the killer could know?</span></li>
                              <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5 shrink-0">•</span><span>Who arranged the meeting through an unregistered number, under false pretenses?</span></li>
                              <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5 shrink-0">•</span><span>The files were labeled 18/18 but only 12 were found. Who had a motive to remove the six connected to Leo Vinzon?</span></li>
                              <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5 shrink-0">•</span><span>The Contacts record ties Jerik Argales to the same agency as Leo Vinzon. Who gave the order?</span></li>
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