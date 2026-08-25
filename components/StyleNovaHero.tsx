'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  DollarSign,
  ShieldCheck,
  X,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { soundFX } from '@/lib/audio';

export interface EventDetail {
  id: string;
  title: string;
  category: string;
  accentColor: string;
  glowColor: string;
  tagline: string;
  description: string;
  image: string;
  fallback: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  eligibility: string;
  registrationFee: string;
  prizePool: string;
  rules: string[];
}

const EVENTS_DATA: EventDetail[] = [
  {
    id: 'hackathon',
    title: 'HACKATHON',
    category: 'FLAGSHIP INNOVATION',
    accentColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.25)',
    tagline: 'Put your problem-solving skills to the test in a fast-paced competitive programming challenge.',
    description:
      'A high-energy innovation challenge where participants turn ideas into impactful solutions. Build, code, collaborate, and compete against talented teams while solving real-world problems under time constraints.',
    image: '/events/hackathon.jpg',
    fallback: '/components/assests/img/1787650681184~2.jpg',
    date: '12 October 2026',
    time: '10:00 AM',
    venue: 'Computer Lab 1, Tech Block',
    teamSize: '2 - 4 Members',
    eligibility: 'All College & University Students',
    registrationFee: '₹100',
    prizePool: '₹15,000',
    rules: [
      'All code and prototypes must be developed exclusively during the hackathon period.',
      'Use of open-source frameworks is permitted; plagiarism or pre-built complete applications will result in disqualification.',
      'Teams must consist of 2 to 4 members with active college credentials.',
      'Final submissions will be judged on technical execution, innovation, UI/UX polish, and practical viability.',
    ],
  },
  {
    id: 'treasure-hunt',
    title: 'TREASURE HUNT',
    category: 'CAMPUS ADVENTURE',
    accentColor: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.25)',
    tagline: 'Unravel cryptic clues, solve mental puzzles, and race across campus for glory.',
    description:
      'A thrilling adventure combining logic, teamwork, observation, and problem-solving. Follow clues, overcome challenges, and race against other teams to uncover the ultimate treasure.',
    image: '/events/treasure_hunt.jpg',
    fallback: '/components/assests/img/1787650723574~2.jpg',
    date: '12 October 2026',
    time: '02:00 PM',
    venue: 'Central Amphitheatre & Campus Grounds',
    teamSize: '2 - 3 Members',
    eligibility: 'All Registered Fest Attendees',
    registrationFee: '₹100',
    prizePool: '₹10,000',
    rules: [
      'Each team must decipher riddle checkpoints in strict sequential order.',
      'Teams must remain within marked campus zones; off-limit premises will trigger penalty disqualification.',
      'Physical checkpoints and QR tokens must not be displaced, destroyed, or shared with competing teams.',
      'The fastest team to check in with all verified clues and final token wins.',
    ],
  },
  {
    id: 'e-sport',
    title: 'E SPORT',
    category: 'COMPETITIVE GAMING',
    accentColor: '#ff3366',
    glowColor: 'rgba(255, 51, 102, 0.25)',
    tagline: 'Battle in the cyber arena for supremacy, tactical glory, and championship trophies.',
    description:
      'Experience the ultimate competitive gaming arena where strategy, teamwork, reflexes, and skill come together. Compete against fellow gamers, climb the leaderboard, and battle for victory.',
    image: '/events/esport.jpg',
    fallback: '/components/assests/img/1787650720730~2.jpg',
    date: '13 October 2026',
    time: '11:00 AM',
    venue: 'Auditorium Hall B / E-Sports Arena',
    teamSize: 'Solo & Squad (4 Players)',
    eligibility: 'Open to all Gamers & Campus Squads',
    registrationFee: '₹100',
    prizePool: '₹20,000',
    rules: [
      'Tournament matches follow double-elimination brackets with official competitive rule sets.',
      'Personal peripherals (keyboards/mice/controllers) are allowed subject to referee inspection.',
      'Third-party software, unfair scripts, or unsportsmanlike conduct results in immediate expulsion.',
      'Squads must report to the tournament desk 15 minutes before scheduled match time.',
    ],
  },
  {
    id: 'ctf',
    title: 'CTF CHALLENGE',
    category: 'CYBER DEFENSE',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    tagline: 'Crack cryptography, reverse engineer binaries, and capture digital flags.',
    description:
      'Put your cybersecurity skills to the test through a series of challenges covering cryptography, web security, forensics, reverse engineering, and more. Find the flags, crack the challenges, and prove your skills.',
    image: '/events/ctf.jpg',
    fallback: '/components/assests/img/1787650728274~2.jpg',
    date: '13 October 2026',
    time: '01:30 PM',
    venue: 'Cyber Forensics Lab, Room 304',
    teamSize: '1 - 3 Members',
    eligibility: 'Tech, CS & Security Students',
    registrationFee: '₹100',
    prizePool: '₹15,000',
    rules: [
      'Jeopardy-style challenge board with dynamic point weighting.',
      'Attacking or tampering with the central scoring engine / platform is strictly prohibited.',
      'Automated vulnerability scanners must abide by target rate limits.',
      'In the event of a score tie, earlier final flag timestamp takes precedence.',
    ],
  },
  {
    id: 'workshop',
    title: 'TECH WORKSHOP',
    category: 'TECH BOOTCAMP',
    accentColor: '#ffb800',
    glowColor: 'rgba(255, 184, 0, 0.25)',
    tagline: 'Master emerging AI models, Web3 engineering, and hands-on system building.',
    description:
      'An interactive learning experience designed to bridge the gap between theory and practical skills. Learn from experts, explore emerging technologies, and gain hands-on experience through engaging activities.',
    image: '/events/workshop.jpg',
    fallback: '/components/assests/img/1787650731285~2.jpg',
    date: '14 October 2026',
    time: '10:30 AM',
    venue: 'Seminar Hall 2 & Innovation Hub',
    teamSize: 'Individual (1 Person)',
    eligibility: 'Beginners & Advanced Tech Builders',
    registrationFee: '₹100',
    prizePool: 'Certificates & Goodies (₹5,000+ Swag)',
    rules: [
      'Attendees are required to bring their personal laptops with development environments.',
      'Includes practical guided labs, starter repositories, and mentored implementation.',
      'Full attendance grants the verified NIRVAN ’26 Certificate of Masterclass Completion.',
      'Exclusive toolkits and swag kits provided upon check-in.',
    ],
  },
];

interface StyleNovaHeroProps {
  onOpenRegister?: () => void;
}

export default function StyleNovaHero({ onOpenRegister }: StyleNovaHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDrawerEvent, setSelectedDrawerEvent] = useState<EventDetail | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentEvent = EVENTS_DATA[currentIndex];

  // 1.25X Auto-rotation loop (2400ms interval) — paused on hover or when drawer open
  useEffect(() => {
    if (!isHovered && !selectedDrawerEvent) {
      autoRotateTimerRef.current = setInterval(() => {
        handleNext();
      }, 2400);
    } else if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
    }
    return () => {
      if (autoRotateTimerRef.current) clearInterval(autoRotateTimerRef.current);
    };
  }, [isHovered, selectedDrawerEvent, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % EVENTS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + EVENTS_DATA.length) % EVENTS_DATA.length);
  };

  const handleSelectEvent = (idx: number) => {
    try { soundFX.playClick(); } catch {}
    setCurrentIndex(idx);
  };

  const handleOpenDrawer = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try { soundFX.playClick(); } catch {}
    setSelectedDrawerEvent(currentEvent);
  };

  const handleCloseDrawer = () => {
    try { soundFX.playClick(); } catch {}
    setSelectedDrawerEvent(null);
  };

  const handleRegister = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try { soundFX.playSuccess(); } catch {}
    if (selectedDrawerEvent) setSelectedDrawerEvent(null);
    if (onOpenRegister) onOpenRegister();
  };

  return (
    <section
      id="events"
      className="relative w-full overflow-hidden bg-transparent text-white select-none py-14 md:py-20 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center"
      style={{
        fontFamily: "'Space Grotesk', -apple-system, sans-serif",
      }}
    >
      {/* Dynamic Background Glow matching Active Event Accent */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] rounded-full blur-[140px] transition-all duration-700 opacity-20"
        style={{ backgroundColor: currentEvent.accentColor }}
      />

      {/* ── Section Title: Only 'Events' ────────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center mb-6">
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-none drop-shadow-[0_0_35px_rgba(0,240,255,0.2)]">
          Events
        </h2>
      </div>

      {/* ── Event Category Switcher Tabs ─────────────────────────── */}
      <div className="relative z-20 flex items-center justify-center gap-2 sm:gap-3 flex-wrap max-w-4xl mx-auto mb-8 px-2">
        {EVENTS_DATA.map((event, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={event.id}
              onClick={() => handleSelectEvent(idx)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                  : 'bg-white/[0.06] text-slate-300 hover:bg-white/[0.12] hover:text-white border border-white/10'
              }`}
            >
              {event.title}
            </button>
          );
        })}
      </div>

      {/* ── Main Feature Card (Black Ground with Left Content + Right Image) ── */}
      <div
        className="relative z-10 w-full max-w-6xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-white/15 bg-gradient-to-br from-[#0e1628]/90 via-[#0a0f1d]/95 to-[#050811]/98 shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            style={{
              boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 35px ${currentEvent.glowColor}`,
            }}
          >
            {/* Ambient Corner Accent */}
            <div
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-40"
              style={{ backgroundColor: currentEvent.accentColor }}
            />

            <div className="flex flex-col lg:flex-row items-center justify-between p-6 sm:p-10 md:p-14 gap-8 md:gap-12 min-h-[480px]">
              
              {/* ── Left Column: Typography & Action Buttons ─────────────── */}
              <div className="flex-1 flex flex-col justify-center items-start text-left space-y-5 z-10">
                {/* Category Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md">
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: currentEvent.accentColor }}
                  />
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-200">
                    {currentEvent.category}
                  </span>
                </div>

                {/* Big Bold Event Title */}
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  {currentEvent.title}
                </h3>

                {/* Event Description */}
                <p className="text-sm sm:text-base md:text-lg text-slate-300/90 leading-relaxed max-w-xl font-normal">
                  {currentEvent.description}
                </p>

                {/* Key Quick Metadata Pills */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-semibold text-cyan-300">
                    <Calendar className="w-3.5 h-3.5" />
                    {currentEvent.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-semibold text-purple-300">
                    <MapPin className="w-3.5 h-3.5" />
                    {currentEvent.venue}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-semibold text-amber-300">
                    <Award className="w-3.5 h-3.5" />
                    Pool: {currentEvent.prizePool}
                  </span>
                </div>

                {/* Action Buttons: Solid White Pill + Ghost Learn More */}
                <div className="flex items-center gap-5 pt-4">
                  {/* Solid White Pill CTA Button */}
                  <button
                    onClick={handleRegister}
                    className="bg-white hover:bg-slate-100 text-black px-7 sm:px-9 py-3.5 rounded-full font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_30px_rgba(255,255,255,0.35)] transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Register Now</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>

                  {/* Text Link Ghost Button */}
                  <button
                    onClick={handleOpenDrawer}
                    className="text-white hover:text-cyan-300 font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer group py-2"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* ── Right Column: Event Poster Artwork ───────────────────── */}
              <div className="w-full lg:w-auto flex items-center justify-center z-10">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  onClick={handleOpenDrawer}
                  className="relative w-64 sm:w-80 md:w-92 h-96 sm:h-[440px] md:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black/60 cursor-pointer group"
                >
                  <img
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = currentEvent.fallback;
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  />

                  {/* Click to expand hover hint */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white/90 text-black text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      View Full Details
                    </span>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#0d1424]/90 border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all shadow-xl backdrop-blur-md cursor-pointer"
          aria-label="Previous Event"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#0d1424]/90 border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all shadow-xl backdrop-blur-md cursor-pointer"
          aria-label="Next Event"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Side Details Drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {selectedDrawerEvent && (
          <div className="fixed inset-0 z-[10000] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDrawer}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative z-10 w-full max-w-lg md:max-w-xl h-full bg-[#070b16]/95 border-l border-cyan-500/30 text-white shadow-[-20px_0_60px_rgba(0,0,0,0.9)] overflow-y-auto flex flex-col"
            >
              {/* Drawer Top Header */}
              <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#070b16]/90 border-b border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                    {selectedDrawerEvent.category}
                  </span>
                </div>

                <button
                  onClick={handleCloseDrawer}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Content */}
              <div className="p-6 md:p-8 space-y-6 flex-1">
                {/* Poster Preview & Title */}
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-32 sm:w-36 h-48 sm:h-52 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-lg flex-shrink-0 bg-black/60">
                    <img
                      src={selectedDrawerEvent.image}
                      alt={selectedDrawerEvent.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = selectedDrawerEvent.fallback;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {selectedDrawerEvent.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyan-300/90 font-medium leading-snug">
                      {selectedDrawerEvent.tagline}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {selectedDrawerEvent.description}
                    </p>
                  </div>
                </div>

                {/* Event Highlights Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span>Date</span>
                    </div>
                    <div className="text-sm font-bold text-white">{selectedDrawerEvent.date}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
                      <Clock className="w-4 h-4" />
                      <span>Time</span>
                    </div>
                    <div className="text-sm font-bold text-white">{selectedDrawerEvent.time}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold">
                      <MapPin className="w-4 h-4" />
                      <span>Venue</span>
                    </div>
                    <div className="text-sm font-bold text-white">{selectedDrawerEvent.venue}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold">
                      <Users className="w-4 h-4" />
                      <span>Team Size</span>
                    </div>
                    <div className="text-sm font-bold text-white">{selectedDrawerEvent.teamSize}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>Reg. Fee</span>
                    </div>
                    <div className="text-sm font-bold text-emerald-400">{selectedDrawerEvent.registrationFee}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                      <Award className="w-4 h-4" />
                      <span>Prize Pool</span>
                    </div>
                    <div className="text-sm font-bold text-amber-400">{selectedDrawerEvent.prizePool}</div>
                  </div>
                </div>

                {/* Eligibility Pill */}
                <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">Eligibility</div>
                    <div className="text-xs text-slate-200 mt-0.5">{selectedDrawerEvent.eligibility}</div>
                  </div>
                </div>

                {/* Rules & Guidelines */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <span>Rules &amp; Guidelines</span>
                  </div>

                  <div className="space-y-2">
                    {selectedDrawerEvent.rules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Sticky Action Bar */}
              <div className="sticky bottom-0 p-6 bg-[#070b16]/95 border-t border-white/10 backdrop-blur-md">
                <button
                  onClick={handleRegister}
                  className="w-full py-4 rounded-2xl font-extrabold text-sm sm:text-base tracking-wider uppercase bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-[0_0_30px_rgba(0,240,255,0.35)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer border border-cyan-400/40"
                >
                  <Sparkles className="w-5 h-5 text-cyan-200" />
                  <span>REGISTER NOW &bull; {selectedDrawerEvent.registrationFee}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
