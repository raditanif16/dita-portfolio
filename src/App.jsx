import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, MapPin, Phone, ArrowUp,
  ChevronRight, CheckCircle, Music, Play, Pause,
  Heart, Sparkles, Coffee, Star, Briefcase, GraduationCap,
  Code, Send, UserCheck, Bot, Loader2,
  MessageSquare, BriefcaseBusiness, Lightbulb, Target, Download,
  Database, Layers, Box, Wrench, Brain, Lock, ExternalLink, Eye, Award, Sun, Moon, Users
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;

const SKILLS_DATA = [
  {
    title: "Programming Languages",
    icon: <Code className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />,
    hoverClass: "hover:!bg-blue-500 hover:!text-white hover:!border-blue-500",
    skills: ["C#", "JavaScript", "TypeScript", "PHP", "Kotlin", "HTML", "CSS"]
  },
  {
    title: "Frameworks & Libraries",
    icon: <Layers className="w-5 h-5 md:w-6 md:h-6 text-pink-500" />,
    hoverClass: "hover:!bg-pink-500 hover:!text-white hover:!border-pink-500",
    skills: [".NET / ASP.NET Core", "React", "Node.js", "Express.js", "NestJS", "Laravel", "Material UI"]
  },
  {
    title: "Backend & Database",
    icon: <Database className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />,
    hoverClass: "hover:!bg-emerald-500 hover:!text-white hover:!border-emerald-500",
    skills: ["REST APIs", "API Integration", "SQL Server", "PostgreSQL", "MySQL", "Sequelize", "NUnit / Moq"]
  },
  {
    title: "3D, AR & VR",
    icon: <Box className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />,
    hoverClass: "hover:!bg-purple-500 hover:!text-white hover:!border-purple-500",
    skills: ["Blender", "Unity", "Augmented Reality", "Virtual Reality", "Vuforia", "Meta / Oculus"]
  },
  {
    title: "Tools & Others",
    icon: <Wrench className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />,
    hoverClass: "hover:!bg-orange-500 hover:!text-white hover:!border-orange-500",
    skills: ["Git", "Postman", "Trello", "Microsoft Office", "Canva"]
  },
  {
    title: "Soft Skills",
    icon: <Brain className="w-5 h-5 md:w-6 md:h-6 text-indigo-500" />,
    hoverClass: "hover:!bg-indigo-500 hover:!text-white hover:!border-indigo-500",
    skills: ["Analytical thinking", "Critical thinking", "Leadership", "Teamwork", "Problem-solving", "Time management", "Attention to detail"]
  }
];

const CERTIFICATIONS_DATA = [
  // Technical & Engineering
  { id: 1, title: "Data Warehouse: The Ultimate Guide", issuer: "Udemy", category: "Technical", image: "/certificates/1.jpeg" },
  { id: 2, title: "Microsoft Azure AI Fundamentals (AI-900)", issuer: "GreatNusa - Microsoft", category: "Technical", image: "/certificates/2.jpeg" },
  { id: 3, title: "Unit Testing for C# Developers", issuer: "Udemy", category: "Technical", image: "/certificates/3.jpg" },
  { id: 4, title: "Intro to ASP.NET (Core, MVC, EF)", issuer: "Udemy", category: "Technical", image: "/certificates/4.jpg" },
  { id: 5, title: "VR & Web Dev System Development", issuer: "Otsuka", category: "Technical", image: "/certificates/5.jpeg" },
  { id: 6, title: "Data Analysis for DB Analysts", issuer: "Skill Academy", category: "Technical", image: "/certificates/6.png" },
  { id: 7, title: "Data Engineering & Architecture", issuer: "Skill Academy", category: "Technical", image: "/certificates/7.png" },
  { id: 8, title: "Web Development Fundamentals (HTML, CSS, JS)", issuer: "Udemy", category: "Technical", image: "/certificates/12.jpg" },
  { id: 9, title: "IoT Application in Agroindustry 4.0", issuer: "SV-IPB", category: "Technical", image: "/certificates/15.png" },

  // Leadership & Soft Skills
  { id: 10, title: "Purpose Over Passion", issuer: "XL Axiata Future Leaders", category: "Leadership", image: "/certificates/10.png" },
  { id: 11, title: "Futurecasting Leadership", issuer: "XL Axiata Future Leaders", category: "Leadership", image: "/certificates/11.png" },
  { id: 12, title: "Secretary (Himavo Micro IT)", issuer: "Himavo Micro IT", category: "Leadership", image: "/certificates/13.png" },
  { id: 13, title: "Secretary (Recruitment Committee)", issuer: "Himavo Micro IT", category: "Leadership", image: "/certificates/19.png" },
  { id: 14, title: "Multimedia Design & Documentation", issuer: "Diploma Medical Team", category: "Leadership", image: "/certificates/18.png" },
  { id: 15, title: "Future Entrepreneurship", issuer: "GenBI", category: "Leadership", image: "/certificates/14.png" },

  // Workshops & Others
  { id: 16, title: "Digital Literacy", issuer: "Kominfo", category: "Workshop", image: "/certificates/9.png" },
  { id: 17, title: "English Proficiency Course", issuer: "Vit English", category: "Workshop", image: "/certificates/17.png" },
  { id: 18, title: "The Dangers of Procrastination", issuer: "GenBI IPB", category: "Workshop", image: "/certificates/8.png" }
];

const ORGANIZATIONS_DATA = [
  {
    title: "MDDD Division Member",
    org: "GenBI IPB",
    period: "Jan 2021 – Dec 2021",
    desc: "Managed the official TikTok account and acted as a content creator, producing weekly engaging content related to Bank Indonesia and national issues."
  },
  {
    title: "Secretary & Committee Member",
    org: "HIMAVO Micro IT",
    period: "Jan 2019 – Aug 2020",
    desc: "Managed administrative documents, coordinated tech education events, handled the open recruitment process, and documented organizational elections."
  },
  {
    title: "Coordinator of MDDD",
    org: "Diploma Medical Team",
    period: "Jan 2019 – Dec 2019",
    desc: "Led a creative team to manage media, design, and event documentation. Published visual assets across social platforms and supported campus health initiatives."
  }
];

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Outfit', sans-serif;
    background: linear-gradient(135deg, #fff0f5 0%, #f0f8ff 100%);
    color: #334155;
    overflow-x: hidden;
    transition:
      background-color 0.4s ease,
      color 0.4s ease;
  }

  /* =========================
     GLOBAL TRANSITIONS
  ========================= */

  .glass-card,
  input,
  textarea,
  button,
  a,
  span,
  div {
    transition:
      background-color 0.35s ease,
      color 0.35s ease,
      border-color 0.35s ease,
      transform 0.25s ease,
      box-shadow 0.35s ease;
  }

  /* =========================
     MAGIC CURSOR
  ========================= */

  .sparkle-particle {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    animation: sparkleAnim 0.8s forwards;
    font-size: 14px;
    text-shadow: 0 0 5px rgba(255,255,255,0.8);
  }

  @keyframes sparkleAnim {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: scale(1.5) rotate(90deg) translateY(20px);
      opacity: 0;
    }
  }

  /* =========================
     MUSIC EQUALIZER
  ========================= */

  .eq-bar {
    width: 4px;
    background: #ec4899;
    border-radius: 999px;
    animation: eq 1s ease-in-out infinite alternate;
  }

  .eq-bar:nth-child(2) {
    animation-delay: 0.2s;
    background: #8b5cf6;
  }

  .eq-bar:nth-child(3) {
    animation-delay: 0.4s;
    background: #3b82f6;
  }

  .eq-bar:nth-child(4) {
    animation-delay: 0.6s;
    background: #ec4899;
  }

  .eq-bar.paused {
    animation-play-state: paused;
    height: 4px !important;
  }

  @keyframes eq {
    0% { height: 4px; }
    100% { height: 20px; }
  }

  /* =========================
     FLOATING ANIMATIONS
  ========================= */

  @keyframes floatY {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes softFloat {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-12px) rotate(1deg);
    }
  }

  @keyframes softPulse {
    0%, 100% {
      opacity: 0.55;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.06);
    }
  }

  .float-slow {
    animation: floatY 4s ease-in-out infinite;
  }

  .float-medium {
    animation: softFloat 5s ease-in-out infinite;
  }

  .pulse-soft {
    animation: softPulse 2.8s ease-in-out infinite;
  }

  /* =========================
     GLOW EFFECTS
  ========================= */

  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(236,72,153,0.18);
    }
    50% {
      box-shadow: 0 0 0 18px rgba(236,72,153,0);
    }
  }

  .glow-pulse {
    animation: pulseGlow 2.8s ease-in-out infinite;
  }

  @keyframes gentleGlow {
    0%, 100% {
      box-shadow: 0 10px 30px -10px rgba(236,72,153,0.12);
    }
    50% {
      box-shadow: 0 16px 40px -12px rgba(59,130,246,0.18);
    }
  }

  .recruiter-glow {
    animation: gentleGlow 3.5s ease-in-out infinite;
  }

  /* =========================
     FADE ANIMATIONS
  ========================= */

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.8s cubic-bezier(0.175,0.885,0.32,1.275) forwards;
  }

  .stagger-1 {
    animation: fadeInUp 0.8s ease forwards;
    animation-delay: 100ms;
    opacity: 0;
  }

  .stagger-2 {
    animation: fadeInUp 0.8s ease forwards;
    animation-delay: 220ms;
    opacity: 0;
  }

  .stagger-3 {
    animation: fadeInUp 0.8s ease forwards;
    animation-delay: 340ms;
    opacity: 0;
  }

  .stagger-4 {
    animation: fadeInUp 0.8s ease forwards;
    animation-delay: 460ms;
    opacity: 0;
  }

  /* =========================
     CARD ANIMATIONS
  ========================= */

  @keyframes cardRise {
    from {
      opacity: 0;
      transform: translateY(24px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .recruiter-card-anim {
    animation: cardRise 0.8s ease forwards;
  }

  .recruiter-item {
    transition:
      transform 0.25s ease,
      background-color 0.25s ease,
      border-color 0.25s ease;
  }

  .recruiter-item:hover {
    transform: translateX(4px);
  }

  /* =========================
     EMOJI RAIN
  ========================= */

  .falling-emoji-rain {
    position: absolute;
    z-index: 40;
    animation: fallDown linear forwards;
    pointer-events: none;
  }

  @keyframes fallDown {
    0% {
      transform: translateY(-10vh) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(110vh) rotate(360deg);
      opacity: 0;
    }
  }

  /* =========================
     GLASSMORPHISM
  ========================= */

  .glass-card {
    background: rgba(255,255,255,0.72);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);

    border: 1px solid rgba(255,255,255,0.5);

    box-shadow:
      0 10px 30px -10px rgba(236,72,153,0.15),
      inset 0 1px 0 rgba(255,255,255,0.3);
  }

  /* =========================
     SHIMMER
  ========================= */

  @keyframes shimmerMove {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  .shimmer-bg {
    background:
      linear-gradient(
        90deg,
        rgba(255,255,255,0.55),
        rgba(255,255,255,0.9),
        rgba(255,255,255,0.55)
      );

    background-size: 200% 200%;
    animation: shimmerMove 3.5s linear infinite;
  }

  /* =========================
     TEXT GRADIENT
  ========================= */

  .text-gradient {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    background-image:
      linear-gradient(to right, #ec4899, #3b82f6);
  }

  /* =========================
     DARK MODE
  ========================= */

  .dark body {
    background: #0f172a !important;
    color: #e2e8f0 !important;
  }

  .dark .glass-card {
    background: rgba(15,23,42,0.72) !important;

    border: 1px solid rgba(255,255,255,0.08);

    box-shadow:
      0 10px 30px -10px rgba(0,0,0,0.45),
      inset 0 1px 0 rgba(255,255,255,0.03);
  }

  /* TEXT */

  .dark h1,
  .dark h2,
  .dark h3,
  .dark h4,
  .dark h5,
  .dark h6 {
    color: #f8fafc !important;
  }

  .dark p,
  .dark li,
  .dark label,
  .dark small {
    color: #94a3b8 !important;
  }

  /* TAILWIND TEXT FIXES */

  .dark .text-slate-900 {
    color: #f8fafc !important;
  }

  .dark .text-slate-800 {
    color: #f1f5f9 !important;
  }

  .dark .text-slate-700 {
    color: #e2e8f0 !important;
  }

  .dark .text-slate-600 {
    color: #cbd5e1 !important;
  }

  .dark .text-slate-500 {
    color: #94a3b8 !important;
  }

  .dark .text-slate-400 {
    color: #64748b !important;
  }

  /* INPUTS */

  .dark input,
  .dark textarea {
    background: rgba(30,41,59,0.9) !important;
    border-color: #334155 !important;
    color: #f8fafc !important;
  }

  .dark input::placeholder,
  .dark textarea::placeholder {
    color: #64748b !important;
  }

  /* BUTTONS */

  .dark button {
    border-color: transparent;
  }

  /* WHITE BACKGROUND FIXES */

  .dark .bg-white {
    background: rgba(15,23,42,0.95) !important;
  }

  .dark .bg-white\\/90,
  .dark .bg-white\\/80,
  .dark .bg-white\\/70,
  .dark .bg-white\\/60,
  .dark .bg-white\\/50 {
    background: rgba(30,41,59,0.78) !important;
  }

/* =========================
     SKILL PILLS
  ========================= */

  .skill-pill {
    background: rgba(241, 245, 249, 0.8);
    border: 1px solid rgba(226, 232, 240, 1);
    color: #334155;
    transition: all 0.3s ease;
    cursor: default;
  }

  .dark .skill-pill {
    background: rgba(30, 41, 59, 0.9);
    border: 1px solid rgba(71, 85, 105, 0.7);
    color: #e2e8f0;
  }

  /* Efek melompat saja, warnanya sudah diatur dinamis oleh Tailwind */
  .skill-pill:hover {
    transform: translateY(-2px);
  }

  /* SOFT COLOR BLOCKS */

  .dark .bg-pink-50 {
    background: rgba(80,7,36,0.95) !important;
    color: #fecdd3 !important;
  }

  .dark .bg-blue-50 {
    background: rgba(30,58,138,0.95) !important;
    color: #bfdbfe !important;
  }

  .dark .bg-orange-50 {
    background: rgba(120,53,15,0.95) !important;
    color: #fde68a !important;
  }

  .dark .bg-purple-50 {
    background: rgba(76,29,149,0.95) !important;
    color: #ddd6fe !important;
  }

  .dark .bg-emerald-50 {
    background: rgba(6,78,59,0.95) !important;
    color: #a7f3d0 !important;
  }

  /* IMAGES */

  .dark img {
    filter: brightness(0.92) contrast(1.02);
  }

  /* SCROLLBAR */

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(236,72,153,0.35);
    border-radius: 999px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(236,72,153,0.55);
  }

  /* =========================
   ROOT THEME
========================= */

:root {
  --bg-primary: #fffafc;
  --bg-secondary: rgba(255,255,255,0.75);
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --border-soft: rgba(255,255,255,0.6);
}

.dark {
  --bg-primary: #0f172a;
  --bg-secondary: rgba(15,23,42,0.72);
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --border-soft: rgba(255,255,255,0.08);
}

/* =========================
   BODY
========================= */

body {
  font-family: 'Outfit', sans-serif;
  background:
    radial-gradient(circle at top left, rgba(236,72,153,0.08), transparent 30%),
    radial-gradient(circle at bottom right, rgba(59,130,246,0.08), transparent 30%),
    var(--bg-primary);
  color: var(--text-primary);
  overflow-x: hidden;
  transition:
    background 0.4s ease,
    color 0.4s ease;
}

/* =========================
   GLASS CARD
========================= */

.glass-card {
  background: var(--bg-secondary);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  border: 1px solid var(--border-soft);

  box-shadow:
    0 10px 30px rgba(15,23,42,0.06);

  transition:
    background 0.35s ease,
    border 0.35s ease,
    transform 0.35s ease,
    box-shadow 0.35s ease;
}

.dark .glass-card {
  box-shadow:
    0 12px 40px rgba(0,0,0,0.35);
}

/* =========================
   TEXT SYSTEM
========================= */

.text-main {
  color: var(--text-primary);
}

.text-muted {
  color: var(--text-secondary);
}

.dark .text-slate-800,
.dark .text-slate-700,
.dark .text-slate-600,
.dark .text-slate-500 {
  color: #dbe4ee !important;
}

.dark .text-slate-400 {
  color: #94a3b8 !important;
}

/* =========================
   HEADINGS
========================= */

h1, h2, h3, h4 {
  color: var(--text-primary);
}

/* =========================
   BUTTONS
========================= */

.btn-primary {
  background: linear-gradient(
    to right,
    #ec4899,
    #3b82f6
  );

  color: white;
  box-shadow:
    0 10px 25px rgba(236,72,153,0.25);

  transition:
    transform .25s ease,
    box-shadow .25s ease,
    opacity .25s ease;
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);

  box-shadow:
    0 14px 35px rgba(236,72,153,0.35);
}

/* =========================
   NAVBAR
========================= */

nav.glass-card {
  background: rgba(255,255,255,0.72);
}

.dark nav.glass-card {
  background: rgba(15,23,42,0.8);
}

nav a {
  transition:
    color .25s ease,
    opacity .25s ease;
}

nav a:hover {
  opacity: .9;
}

/* =========================
   PROJECT CARD
========================= */

.project-card {
  overflow: hidden;
}

.project-card img {
  transition:
    transform .7s ease,
    filter .5s ease;
}

.project-card:hover img {
  transform: scale(1.06);
}

.dark .project-card img {
  filter: brightness(.88);
}

/* =========================
   INPUTS
========================= */

input,
textarea {
  background: rgba(255,255,255,0.75);
  border: 1px solid rgba(226,232,240,1);

  transition:
    border .25s ease,
    background .25s ease;
}

.dark input,
.dark textarea {
  background: rgba(30,41,59,0.9);
  border: 1px solid rgba(71,85,105,0.8);
  color: white;
}

input:focus,
textarea:focus {
  border-color: #ec4899;
  box-shadow:
    0 0 0 4px rgba(236,72,153,0.15);
}

/* =========================
   MOBILE MENU
========================= */

.dark .mobile-menu {
  background: rgba(15,23,42,0.96);
}

/* =========================
   MODAL
========================= */

.modal-glass {
  background: rgba(255,255,255,0.88);
}

.dark .modal-glass {
  background: rgba(15,23,42,0.92);
}

/* =========================
   SCROLLBAR
========================= */

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(
    #ec4899,
    #3b82f6
  );
  border-radius: 999px;
}

/* =========================
   SECTION SPACING
========================= */

section {
  position: relative;
  z-index: 2;
}

.container {
  position: relative;
}

/* =========================
   HOVER SOFTEN
========================= */

.hover-lift {
  transition:
    transform .3s ease,
    box-shadow .3s ease;
}

.hover-lift:hover {
  transform: translateY(-6px);
}

/* =========================
   DARK MODE FIXES
========================= */

.dark .bg-white {
  background: rgba(30,41,59,0.92) !important;
}

.dark .bg-slate-100 {
  background: rgba(51,65,85,0.7) !important;
}

.dark .bg-slate-50 {
  background: rgba(30,41,59,0.55) !important;
}

.dark .border-slate-200 {
  border-color: rgba(71,85,105,0.7) !important;
}

/* =========================
   IMAGE GLOW
========================= */

.profile-glow {
  box-shadow:
    0 0 60px rgba(236,72,153,0.18),
    0 0 100px rgba(59,130,246,0.12);
}
`;

// --- COMPONENTS ---

const MagicCursor = () => {
  useEffect(() => {
    const handleMove = (e) => {
      const isTouch = e.type === 'touchmove';
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;

      if (Math.random() > 0.4) return;

      const particle = document.createElement('div');
      particle.className = 'sparkle-particle';
      particle.style.left = `${clientX}px`;
      particle.style.top = `${clientY}px`;

      const colors = ['#ec4899', '#3b82f6', '#8b5cf6', '#f472b6'];
      const symbols = ['✦', '★', '✨', '🌸'];
      particle.style.color = colors[Math.floor(Math.random() * colors.length)];
      particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 800);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);
  return null;
};

const MusicWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const lofiMusicUrl = "/lofi-music.mp3";

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(lofiMusicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.05;
    }

    if (isPlaying) {
      audioRef.current.play().catch(err => console.log("Audio play diblokir oleh browser sebelum ada interaksi:", err));
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying]);

  return (
    <div
      className="fixed bottom-6 left-6 z-50 glass-card rounded-2xl p-3 flex items-center gap-4 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300 group select-none"
      onClick={() => setIsPlaying(!isPlaying)}
      title={isPlaying ? "Click to Pause Music" : "Click to Play Music"}
    >
      <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md">
        <img
          src="/musicimg.png"
          alt="Lofi Girl"
          className={`w-full h-full object-cover transition-transform duration-500 ${isPlaying ? 'animate-[spin_8s_linear_infinite]' : 'group-hover:scale-110'}`}
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
          {isPlaying ? <Pause className="w-5 h-5 text-white animate-pulse" /> : <Play className="w-5 h-5 text-white" />}
        </div>
      </div>
      <div className="hidden sm:block">
        <p className="text-xs font-bold text-slate-700">{isPlaying ? "Now Playing" : "Music Paused"}</p>
        <p className="text-[11px] text-slate-500 font-medium">Serenity - Pufino</p>
      </div>
      <div className="flex items-end h-5 gap-1 pr-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`eq-bar ${!isPlaying ? 'paused' : ''}`} />
        ))}
      </div>
    </div>
  );
};

const VirtualSupport = () => {
  const [scores, setScores] = useState({ flower: 0, coffee: 0, sparkle: 0 });
  const [rainEvent, setRainEvent] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_support');
    if (saved) setScores(JSON.parse(saved));
  }, []);

  const handleSupport = (type, emoji) => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);
    localStorage.setItem('portfolio_support', JSON.stringify(newScores));

    setRainEvent({ emoji, id: Date.now() });

    setTimeout(() => {
      setRainEvent(null);
    }, 3500);
  };

  return (
    <>
      <Reveal>
        <div className="glass-card rounded-3xl p-6 text-center max-w-sm mx-auto mt-12 relative z-10">
          <h3 className="text-lg md:text-xl font-bold mb-2 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" /> Virtual Support
          </h3>
          <p className="text-sm text-slate-500 mb-6">If you enjoy my work, send some love!</p>

          <div className="flex justify-center gap-4">
            <button onClick={() => handleSupport('flower', '🌸')} className="flex flex-col items-center p-3 rounded-2xl bg-pink-50 hover:bg-pink-100 transition-colors border border-pink-100 relative group cursor-pointer active:scale-95">
              <span className="text-2xl mb-1 group-hover:scale-125 transition-transform">🌸</span>
              <span className="text-xs font-bold text-pink-600">{scores.flower}</span>
            </button>
            <button onClick={() => handleSupport('coffee', '☕')} className="flex flex-col items-center p-3 rounded-2xl bg-orange-50 hover:bg-orange-100 transition-colors border border-orange-100 relative group cursor-pointer active:scale-95">
              <span className="text-2xl mb-1 group-hover:scale-125 transition-transform">☕</span>
              <span className="text-xs font-bold text-orange-600">{scores.coffee}</span>
            </button>
            <button onClick={() => handleSupport('sparkle', '✨')} className="flex flex-col items-center p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100 relative group cursor-pointer active:scale-95">
              <span className="text-2xl mb-1 group-hover:scale-125 transition-transform">✨</span>
              <span className="text-xs font-bold text-blue-600">{scores.sparkle}</span>
            </button>
          </div>
        </div>
      </Reveal>

      {rainEvent && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden flex items-center justify-center">

          {Array.from({ length: 100 }).map((_, i) => {
            const style = {
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 2 + 1.5}s`,
              animationDelay: `${Math.random() * 0.5}s`,
              fontSize: `${Math.random() * 25 + 20}px`
            };
            return (
              <div key={i} className="falling-emoji-rain top-[-10vh]" style={style}>
                {rainEvent.emoji}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

// --- GEMINI AI FEATURES PLAYGROUND ---
const AIPlayground = () => {
  const [activeTab, setActiveTab] = useState('qa');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [qaResponse, setQaResponse] = useState("");

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [pitchResponse, setPitchResponse] = useState("");

  const [industry, setIndustry] = useState("");
  const [projectResponse, setProjectResponse] = useState("");

  const [jobDesc, setJobDesc] = useState("");
  const [matchResponse, setMatchResponse] = useState("");

  const callGeminiAPI = async (systemInstruction, userPrompt) => {
    setIsLoading(true);
    setError("");

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: userPrompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    const fetchWithRetry = async (retries = 5, delay = 1000) => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Failed to fetch from Gemini API");
        return await res.json();
      } catch (err) {
        if (retries === 0) throw err;
        await new Promise(r => setTimeout(r, delay));
        return fetchWithRetry(retries - 1, delay * 2);
      }
    };

    try {
      const data = await fetchWithRetry();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!aiText) throw new Error("Empty response");
      return aiText;
    } catch (err) {
      setError("AI service is currently unavailable. Please try again later!");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskAI = async () => {
    if (!query.trim()) return;
    setQaResponse("");

    const sysPrompt = `
You are the professional, warm, and enthusiastic AI assistant representing Dita (Radita Nur Ilmah Fauziyya).

PERSONAL DATA:
- Name: Dita (Radita Nur Ilmah Fauziyya)
- Gender: Female (Always use she/her pronouns).
- Birthdate: July 16, 2000.
- Location: Sukabumi, Indonesia.

CORE COMPETENCIES:
- Languages: C#, JavaScript, TypeScript, PHP, Kotlin, HTML, CSS.
- Frameworks/Libraries: .NET/ASP.NET Core, React, Node.js, Express.js, NestJS, Laravel, Material UI.
- Backend & DB: REST APIs, API Integration, Unit Testing (NUnit/Moq), SQL Server, PostgreSQL, MySQL, Sequelize.
- Immersive Tech: Blender, Unity, Augmented Reality (Vuforia), Virtual Reality (Oculus/Meta).
- Tools: Git, Postman, Trello, MS Office, Canva, English proficiency.
- Soft Skills: Analytical & Critical thinking, Leadership, Teamwork, Problem-solving, Time Management, Systematic approach, Attention to detail.

PROFESSIONAL PROFILE:
- Role: Software Engineer & Digital Arts Pro Tutor.
- Passion/Goal: Aspires to be a world-class software engineer. She is a lifelong learner who believes technology should be used to make people happy, help those in need, and simplify complex problems.
- Experience Highlights: Fintech (Mini ATM, Payment Gateway, BI-FAST), AR/VR development (Genset/Boiler Simulation), and Academic Research (Non-Invasive Hb Device).

INSTRUCTIONS:
- Tone: Professional, warm, and very enthusiastic. Dita is a kind person who loves helping others, so reflect that kindness in your answers.
- Constraints: Keep answers concise (max 3-4 sentences). 
- Behavior: Encourage recruiters. If asked about sensitive or irrelevant personal topics, politely redirect to Dita's professional expertise and passion.
- Mission: Always showcase Dita's core values: continuous learning, engineering excellence, and helping people through tech.
`;

    const response = await callGeminiAPI(sysPrompt, query);
    if (response) setQaResponse(response);
  };

  const handleGeneratePitch = async () => {
    if (!company.trim() || !role.trim()) return;
    setPitchResponse("");
    const sysPrompt = `You are a professional pitch writer assisting Dita.`;
    const userPrompt = `
      Write a personalized pitch (max 4 sentences) for Dita, a versatile Software Engineer, applying for ${role} at ${company}.
      Highlight her unique blend of Backend/Fintech expertise (.NET/C#) and Creative Tech (Unity/AR/VR).
      Mention that she is a lifelong learner who builds technology to bring positive impact, happiness, and meaningful change.
      Keep it professional, enthusiastic, and include 1-2 professional emojis.
    `;
    const response = await callGeminiAPI(sysPrompt, userPrompt);
    if (response) setPitchResponse(response);
  };

  const handleJobMatch = async () => {
    if (!jobDesc.trim()) return;
    setMatchResponse("");
    const sysPrompt = `You are an expert technical hiring manager analyzing Dita's fit.
      Candidate: Dita (Radita Nur Ilmah Fauziyya)
      Profile: Software Engineer with deep background in Fintech systems (.NET, SQL) and Immersive Tech (AR/VR, Unity). 
      Academic Background: Diploma in Computer Engineering (IPB University, Cum Laude, Research-heavy).
      Soft Skills: Leadership, analytical thinking, problem-solving, and attention to detail.`;

    const userPrompt = `
      Analyze this Job Description: "${jobDesc}"
      Compare it against Dita's full skill set: 
      1. Backend (C#, .NET, Node, REST, DBs).
      2. Immersive (Unity, AR/VR, Blender).
      3. Analytical Research (Hemoglobin research, etc).
      
      Output exactly in this format:
      **Match Score: [Insert percentage]**
      * [Highlight technical match: Connect her specific stack to the JD]
      * [Highlight unique value: Connect her experience in AR/VR or Fintech to the role]
      * [Conclusion: Emphasize her soft skills (leadership/analytical) and her drive to build impactful, human-centric tech]
      Keep it concise and professional. Use emojis.
    `;
    const response = await callGeminiAPI(sysPrompt, userPrompt);
    if (response) setMatchResponse(response);
  };

  const formatAIResponse = (text) => {
    const lines = text.split('\n');

    return lines.map((line, i) => {
      const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-800 dark:text-slate-200">$1</strong>');

      if (line.trim().startsWith('*')) {
        return (
          <li key={i} className="ml-4 mb-2 text-slate-700 dark:text-slate-300 list-disc">
            <span dangerouslySetInnerHTML={{ __html: processedLine.replace('*', '').trim() }} />
          </li>
        );
      }

      if (line.trim() === '') return null;

      return (
        <div key={i} className="mb-2 text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: processedLine }} />
      );
    });
  };

  return (
    <Reveal>
      <div className="glass-card rounded-3xl p-5 md:p-8 max-w-4xl mx-auto mt-12 bg-gradient-to-br from-white/80 to-pink-50/50 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-200">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-main">Interactive AI Tools</h3>
              <p className="text-slate-500 text-sm">Built to showcase my background and thinking ✨</p>
            </div>
          </div>

          <div className="flex w-full md:w-auto overflow-x-auto hide-scrollbar bg-white/50 dark:bg-slate-800/50 p-1.5 rounded-xl border border-pink-100 dark:border-slate-700 shadow-inner">
            <button onClick={() => setActiveTab('qa')} className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex-1 md:flex-none justify-center ${activeTab === 'qa' ? 'bg-white dark:bg-slate-700 text-pink-600 dark:text-pink-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
              <MessageSquare className="w-3.5 h-3.5" /> Q&A
            </button>
            <button onClick={() => setActiveTab('pitch')} className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex-1 md:flex-none justify-center ${activeTab === 'pitch' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
              <BriefcaseBusiness className="w-3.5 h-3.5" /> Pitch
            </button>
            <button onClick={() => setActiveTab('match')} className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex-1 md:flex-none justify-center ${activeTab === 'match' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
              <Target className="w-3.5 h-3.5" /> Job Match
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 text-sm text-center border border-red-100 dark:border-red-800/50 chat-bubble">
            {error}
          </div>
        )}

        {/* Tab 1: Q&A */}
        {activeTab === 'qa' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs md:text-sm text-muted mb-2">Curious about my background? Ask the AI.</p>
            <textarea
              value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., What kind of fintech systems has Radita worked on?"
              className="w-full px-5 py-4 rounded-2xl border border-pink-100 bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none h-24 placeholder-slate-400 text-slate-700"
            />
            <button onClick={handleAskAI} disabled={isLoading || !query.trim()} className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Thinking...</> : <>✨ Explore</>}
            </button>
            {qaResponse && !isLoading && (
              <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-pink-50 to-blue-50 dark:from-pink-900/40 dark:to-blue-900/40 border border-pink-100/50 dark:border-pink-800/30 chat-bubble">
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">{qaResponse}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Pitch Generator */}
        {activeTab === 'pitch' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs md:text-sm text-muted mb-2">Are you a recruiter? Let AI write a custom cover letter pitch for your open role.</p>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                placeholder="Company Name (e.g., Google)"
                className="w-full px-5 py-3 rounded-xl border border-blue-100 bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-slate-400 text-slate-700"
              />
              <input
                type="text" value={role} onChange={(e) => setRole(e.target.value)}
                placeholder="Job Role (e.g., Frontend Dev)"
                className="w-full px-5 py-3 rounded-xl border border-blue-100 bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-slate-400 text-slate-700"
              />
            </div>
            <button onClick={handleGeneratePitch} disabled={isLoading || !company.trim() || !role.trim()} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</> : <>✨ Generate Custom Pitch</>}
            </button>
            {pitchResponse && !isLoading && (
              <div className="mt-4 p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-blue-100 dark:border-blue-800/40 chat-bubble relative">
                <div className="absolute top-4 right-4 text-blue-200 dark:text-blue-900/50"><BriefcaseBusiness className="w-12 h-12 opacity-20 dark:opacity-40" /></div>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap relative z-10">{pitchResponse}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Job Match Analyzer */}
        {activeTab === 'match' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs md:text-sm text-muted mb-2">Paste a Job Description here. AI will analyze how well my skills match your requirements!</p>
            <textarea
              value={jobDesc} onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste Job Description here (e.g., 'Looking for a developer with React and .NET experience...')"
              className="w-full px-5 py-4 rounded-2xl border border-emerald-100 bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none h-32 placeholder-slate-400 text-slate-700"
            />
            <button onClick={handleJobMatch} disabled={isLoading || !jobDesc.trim()} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing Match...</> : <>✨ Analyze Job Fit</>}
            </button>
            {matchResponse && !isLoading && (
              <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/30 dark:to-slate-800/80 border border-emerald-100 dark:border-emerald-800/40 chat-bubble relative">
                <div className="absolute top-4 right-4 text-emerald-200 dark:text-emerald-900/50"><Target className="w-12 h-12 opacity-20 dark:opacity-40" /></div>
                <ul className="relative z-10 font-medium list-none">
                  {formatAIResponse(matchResponse)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

    </Reveal>
  );
};

const CertificationSection = ({ setSelectedImage }) => {
  const [activeCategory, setActiveCategory] = useState("Technical");

  const categories = ["Technical", "Leadership", "Workshop"];

  const filteredCerts = CERTIFICATIONS_DATA.filter(cert => cert.category === activeCategory);

  return (
    <section id="certifications" className="py-12 md:py-20 px-6 container mx-auto max-w-6xl">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gradient">Certifications</h2>
      </Reveal>

      <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all ${activeCategory === cat ? 'bg-pink-500 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            className="group glass-card rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300"
            onClick={() => setSelectedImage(cert.image)}
          >
            <div className="h-40 overflow-hidden bg-slate-100">
              <img
                src={cert.image}
                alt={cert.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h4 className="text-sm font-bold text-main leading-tight mb-1 line-clamp-2">{cert.title}</h4>
              <p className="text-xs text-pink-500 font-medium">{cert.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const RecruiterFit = () => {
  const [checks, setChecks] = useState([false, false, false, false]);

  const criteria = [
    "Builds fintech and payment system products",
    "Comfortable with backend, frontend, and API integration",
    "Cares about clean, reliable, and scalable code",
    "Likes solving tricky problems and learning fast"
  ];

  const allChecked = checks.every(c => c);

  const toggleCheck = (index) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  return (
    <Reveal>
      <div className="glass-card recruiter-card-anim recruiter-glow rounded-3xl p-5 md:p-8 max-w-2xl mx-auto mt-12 dark:bg-slate-900/80 dark:border-slate-700/60">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-pink-100 dark:from-blue-900/50 dark:to-pink-900/50 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Do we fit?</h3>
            <p className="text-slate-500 dark:text-slate-400">A quick check for fintech teams & hiring managers.</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {criteria.map((text, i) => (
            <label
              key={i}
              className="recruiter-item flex items-center gap-4 p-3 rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-blue-100 dark:hover:border-blue-800/50"
            >
              <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${checks[i] ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
                {checks[i] && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <span className={checks[i] ? 'text-main font-medium' : 'text-slate-500 dark:text-slate-400'}>{text}</span>
              <input type="checkbox" className="hidden" checked={checks[i]} onChange={() => toggleCheck(i)} />
            </label>
          ))}
        </div>

        <div className={`p-4 rounded-2xl transition-all duration-500 text-center ${allChecked ? 'bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/40 dark:to-blue-900/40 border border-transparent dark:border-pink-800/30 scale-100 opacity-100' : 'scale-95 opacity-0 hidden'}`}>
          <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600 dark:from-pink-400 dark:to-blue-400 text-lg mb-2">
            🎉 We are a perfect match! 🎉
          </p>
          <p className="text-xs md:text-sm text-muted mb-4 dark:text-slate-300">I'd love to chat about how I can contribute to your team.</p>
          <a href="#contact" className="inline-block px-6 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30 dark:shadow-blue-900/50">
            Schedule a Call
          </a>
        </div>
      </div>
    </Reveal>
  );
};

const StatsSection = () => {
  const stats = [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Completed", value: "10+" },
    { label: "Certifications", value: "10+" },
  ];

  return (
    <Reveal>
      <section className="py-8 md:py-12 px-4 md:px-6 container mx-auto max-w-4xl">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="glass-card p-3 md:p-4 md:p-6 rounded-2xl md:rounded-3xl text-center hover:scale-105 transition-transform duration-300 flex flex-col justify-center"
            >
              <h3 className="text-2xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</h3>
              <p className="text-[10px] md:text-sm text-slate-500 font-medium uppercase tracking-wider leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [activeExp, setActiveExp] = useState('work');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const form = useRef();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      setScrollProgress((totalScroll / windowHeight) * 100);

      setShowScrollTop(totalScroll > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
        setShowSuccess(true);
        e.target.reset();

        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }, (error) => {
        alert('Gagal mengirim pesan. Silakan coba kontak via WhatsApp.');
        console.log('Error detail:', error);
      });
  };

  const navLinks = ['About', 'Experience', 'Skills', 'Projects', 'Certifications', 'Contact'];

  return (
    <div className="relative min-h-screen pb-20">
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-blue-500 z-[100] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
      <style>{customStyles}</style>
      <MagicCursor />
      <MusicWidget />

      <nav className={`fixed top-0 left-0 right-0 z-[60] mx-4 mt-4 rounded-full px-6 py-3 flex justify-between items-center transition-all duration-300 ${isMenuOpen ? 'bg-transparent border-transparent shadow-none' : 'glass-card'}`}>
        <a href="#" className="text-lg md:text-xl font-bold text-gradient relative z-[70]">Dita</a>

        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-muted hover:text-pink-500 transition-colors">
              {link}
            </a>
          ))}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-muted dark:text-yellow-400 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <button
          className={`md:hidden p-2 relative z-[70] transition-colors ${isMenuOpen ? 'text-slate-800 dark:text-slate-100' : 'text-slate-600 dark:text-slate-300'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${isMenuOpen ? 'rotate-45 translate-x-1' : 'w-full'}`}></span>
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-full'}`}></span>
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${isMenuOpen ? '-rotate-45 translate-x-1' : 'w-full'}`}></span>
          </div>
        </button>
      </nav>

      <div className={`fixed inset-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl flex flex-col transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="flex flex-col pt-24 px-6 flex-1 overflow-y-auto pb-10">

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800/60 py-3.5 transition-all hover:text-pink-500 dark:hover:text-pink-400 active:translate-x-2 flex items-center justify-between"
              >
                {link}
                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
              </a>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-inner">
              <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-full bg-white dark:bg-slate-700 text-slate-600 dark:text-yellow-400 shadow-sm border border-slate-200 dark:border-slate-600 transition-transform active:scale-95"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      <section className="pt-40 pb-20 px-6 container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12" id="about">

        <div className="order-1 md:order-2 flex-1 relative flex justify-center mt-0 md:mt-0">
          <div className="absolute top-0 right-4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-10 left-4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '2s' }}></div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-pink-300 via-blue-300 to-pink-300 blur-xl opacity-40 pulse-soft"></div>

            <div className="relative w-64 h-64 md:w-80 md:h-80 glass-card p-2 rounded-[2.5rem] shadow-2xl shadow-pink-100 rotate-2 hover:rotate-0 transition-transform duration-500 animate-fade-in-up opacity-0">
              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center">
                <img
                  src="/foto-profil.jpg"
                  alt="Foto Radita"
                  className="w-full h-full object-cover float-medium"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="order-2 md:order-1 flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-5 stagger-1">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-muted">Problem Solver • Creative Mind</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in-up opacity-0" style={{ animationDelay: '200ms' }}>
            Hi, I’m <br />
            <span className="text-gradient">Radita Nur Ilmah Fauziyya</span>
            <span className="block text-xl md:text-2xl font-semibold text-slate-500 mt-2">— but you can call me Dita.</span>
          </h1>

          <p className="text-base md:text-lg text-muted mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '300ms' }}>
            I’m a Software Engineer passionate about fintech, frontend, backend systems, and API integration.
            <br /><br />
            I’ve built projects involving Payment Gateway, Mini ATM, transaction switching, and encryption systems. Beyond software engineering, I also work in creative tech through 2D/3D design and AR/VR exploration.
            <br /><br />
            I enjoy building things that are both useful and meaningful ✨
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '400ms' }}>
            <a href="/cv-radita.pdf" download="CV_Radita_Nur.pdf" className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-full font-bold shadow-lg shadow-pink-200 hover:scale-105 transition-transform flex items-center gap-2 text-sm md:text-base">
              <Download className="w-4 h-4" /> Download CV
            </a>
            <a href="#projects" className="px-6 py-3 bg-slate-800 text-white rounded-full font-semibold hover:bg-slate-700 transition-all flex items-center gap-2 text-sm md:text-base">
              View Work <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-6 mt-10 animate-fade-in-up opacity-0" style={{ animationDelay: '500ms' }}>
            <a href="https://github.com/raditanif16" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-500 transition-colors"><GithubIcon /></a>
            <a href="https://www.linkedin.com/in/raditanif/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors"><LinkedinIcon /></a>
            <a href="https://www.instagram.com/raditanif/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-600 transition-colors"><InstagramIcon /></a>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Experience & Education */}
      {/* --- UPDATE 2: Section Experience (Gabungan Work, Org, dan Edu) --- */}
      <section id="experience" className="py-12 md:py-20 px-6 container mx-auto max-w-7xl">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-gradient">Journey & Experience</h2>
        </Reveal>

        <Reveal>
          <div className="flex md:hidden w-full overflow-x-auto hide-scrollbar bg-white/50 dark:bg-slate-800/50 p-1.5 rounded-xl border border-slate-100 dark:border-slate-700 shadow-inner mb-6 gap-2">
            <button onClick={() => setActiveExp('work')} className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeExp === 'work' ? 'bg-white dark:bg-slate-700 text-pink-600 dark:text-pink-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
              <Briefcase className="w-3.5 h-3.5" /> Work
            </button>
            <button onClick={() => setActiveExp('org')} className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeExp === 'org' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
              <Users className="w-3.5 h-3.5" /> Org
            </button>
            <button onClick={() => setActiveExp('edu')} className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeExp === 'edu' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
              <GraduationCap className="w-3.5 h-3.5" /> Edu
            </button>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 xl:gap-12">

          {/* Kolom 1: Work Experience (Warna Pink) */}
          <div className={`${activeExp === 'work' ? 'block' : 'hidden'} md:block`}>
            <Reveal>
              <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
                <Briefcase className="text-pink-500" /> Work Experience
              </h3>
            </Reveal>
            <div className="space-y-6">
              {[
                {
                  title: "Software Engineer / Product Development",
                  company: "PT. Arranet Indonesia Sejahtera — Jakarta (Remote/WFH)",
                  period: "Aug 2023 – Present",
                  desc: "Backend and Frontend development for financial systems, REST APIs, payment gateway, Mini ATM, and BI-FAST integrations using .NET and React."
                },
                {
                  title: "Digital Arts Pro Tutor",
                  company: "Kodland — Remote/WFH",
                  period: "Aug 2023 – Present",
                  desc: "Teaching digital design, 2D/3D design, and basic web design using Photopea, Tilda, and Blender."
                },
                {
                  title: "App & Web Developer Intern",
                  company: "PT. Amerta Indah Otsuka — Sukabumi",
                  period: "Jun 2022 – Jun 2023",
                  desc: "Developed AR/VR training applications, digital twin simulations, and internal web applications using Unity, Blender, and React."
                },
                {
                  title: "Research Assistant (LPDP Project)",
                  company: "IPB University — Bogor",
                  period: "Jun 2021 – Aug 2022",
                  desc: "Worked on non-invasive medical device research for hemoglobin and blood glucose measurement and conducted testing and data collection."
                },
                {
                  title: "Physics Lecturer Assistant",
                  company: "Vocational School, IPB University",
                  period: "Aug 2021 – Dec 2021",
                  desc: "Assisted lecturers in teaching physics courses, supervised laboratory sessions, and evaluated student practicum reports."
                },
                {
                  title: "Internship – Department of Physics",
                  company: "FMIPA IPB University — Bogor",
                  period: "Feb 2021 – Apr 2021",
                  desc: "Developed a non-invasive hemoglobin measurement device using Raspberry Pi and built two research prototypes."
                }
              ].map((exp, i) => (
                <Reveal key={i}>
                  <div
                    className="group glass-card p-4 md:p-6 rounded-2xl relative pl-10 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-200/50 dark:hover:shadow-pink-900/40 dark:hover:border-pink-500/40 transition-all duration-300 cursor-default"
                    style={{ transitionDelay: `${i * 0.15}s` }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-200 dark:bg-pink-900/50 rounded-l-2xl group-hover:bg-gradient-to-b group-hover:from-pink-400 group-hover:to-blue-400 transition-all duration-500"></div>
                    <div className="absolute left-[-5px] top-6 w-3 h-3 bg-pink-500 rounded-full ring-4 ring-white dark:ring-slate-800 group-hover:scale-150 group-hover:bg-blue-500 group-hover:ring-blue-100 dark:group-hover:ring-blue-900/50 transition-all duration-300"></div>

                    <h4 className="font-bold text-lg text-main group-hover:text-pink-600 dark:group-hover:!text-pink-400 transition-colors duration-300">{exp.title}</h4>
                    <p className="text-sm text-pink-500 font-medium mb-2">{exp.company} | {exp.period}</p>
                    <div className="text-muted text-sm leading-relaxed">{exp.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Kolom 2: Organization (Warna Ungu) */}
          <div className={`${activeExp === 'org' ? 'block' : 'hidden'} md:block`}>
            <Reveal delay={0.2}>
              <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
                <Users className="text-purple-500" /> Organization
              </h3>
            </Reveal>
            <div className="space-y-6">
              {ORGANIZATIONS_DATA.map((org, i) => (
                <Reveal key={`org-${i}`}>
                  <div
                    className="group glass-card p-4 md:p-6 rounded-2xl relative pl-10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/40 dark:hover:border-purple-500/40 transition-all duration-300 cursor-default"
                    style={{ transitionDelay: `${(i + 1) * 0.15}s` }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-200 dark:bg-purple-900/50 rounded-l-2xl group-hover:bg-gradient-to-b group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-500"></div>
                    <div className="absolute left-[-5px] top-6 w-3 h-3 bg-purple-500 rounded-full ring-4 ring-white dark:ring-slate-800 group-hover:scale-150 group-hover:bg-pink-500 group-hover:ring-pink-100 dark:group-hover:ring-pink-900/50 transition-all duration-300"></div>

                    <h4 className="font-bold text-lg text-main group-hover:text-purple-600 dark:group-hover:!text-purple-400 transition-colors duration-300">{org.title}</h4>
                    <p className="text-sm text-purple-500 font-medium mb-2">{org.org} | {org.period}</p>
                    <div className="text-muted text-sm leading-relaxed">{org.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Kolom 3: Education (Warna Biru) */}
          <div className={`${activeExp === 'edu' ? 'block' : 'hidden'} md:block`}>
            <Reveal delay={0.4}>
              <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="text-blue-500" /> Education
              </h3>
            </Reveal>
            <div className="space-y-6">
              {[
                {
                  title: "Associate Degree in Computer Engineering",
                  school: "IPB University — Bogor, West Java",
                  period: "Jul 2018 - Aug 2021",
                  desc: (
                    <ul className="list-disc ml-4 space-y-1.5 mt-2 text-muted text-sm leading-relaxed">
                      <li><strong className="text-slate-700 dark:text-slate-300">GPA:</strong> 3.86 / 4.00 (Cum Laude)</li>
                      <li><strong className="text-slate-700 dark:text-slate-300">Final Project:</strong> Developed a non-invasive hemoglobin measurement device using Raspberry Pi (Collaboration with Dept. of Physics, IPB).</li>
                      <li><strong className="text-slate-700 dark:text-slate-300">Scholarships:</strong> PPA Scholarship (2019) & Bank Indonesia Scholarship (2020).</li>
                      <li><strong className="text-slate-700 dark:text-slate-300">Activities:</strong> Actively involved in 10+ campus events, faculty-led research, and technical skills training.</li>
                    </ul>
                  )
                }
              ].map((edu, i) => (
                <Reveal key={`edu-${i}`}>
                  <div
                    className="group glass-card p-4 md:p-6 rounded-2xl relative pl-10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/40 dark:hover:border-blue-500/40 transition-all duration-300 cursor-default"
                    style={{ transitionDelay: `${(i + 2) * 0.15}s` }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-200 dark:bg-blue-900/50 rounded-l-2xl group-hover:bg-gradient-to-b group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-500"></div>
                    <div className="absolute left-[-5px] top-6 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-white dark:ring-slate-800 group-hover:scale-150 group-hover:bg-purple-500 group-hover:ring-purple-100 dark:group-hover:ring-purple-900/50 transition-all duration-300"></div>

                    <h4 className="font-bold text-lg text-main group-hover:text-blue-600 dark:group-hover:!text-blue-400 transition-colors duration-300">{edu.title}</h4>
                    <p className="text-sm text-blue-500 font-medium mb-2">{edu.school} | {edu.period}</p>
                    <div>{edu.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* NEW INTERACTIVE SKILLS SECTION */}
      <section id="skills" className="py-12 md:py-20 px-6 container mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-4">Skills</h2>
            <p className="text-muted max-w-2xl mx-auto">
              A blend of technical expertise and creative problem solving.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
          {SKILLS_DATA.map((cat, i) => (
            <Reveal key={i} className={cat.span}>
              <div className="group glass-card p-6 rounded-3xl h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-800/50 shadow-sm border border-slate-100 dark:border-slate-700">
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-lg text-main">{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <span
                      key={j}
                      className={`skill-pill px-3 py-1.5 text-sm rounded-lg border ${cat.hoverClass}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-12 md:py-20 px-6 container mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-4">Featured Projects & Research</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A showcase of financial systems, immersive tech, and hardware research. <br />
              <span className="text-xs font-semibold bg-blue-50 text-blue-500 px-2 py-1 rounded-md mt-2 inline-block">
                Note: Some projects are private/NDA and cannot be linked externally.
              </span>
            </p>
          </div>

        </Reveal>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar pb-6 -mx-5 px-5 md:mx-0 md:px-0">
          {[
            {
              title: "Mini ATM System",
              desc: "Financial transaction system including withdrawal, transfer, balance inquiry, and transaction switching.",
              tech: ["C#", ".NET", "SQL Server", "PostgreSQL"],
              img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600",
              isPrivate: true
            },
            {
              title: "Payment Gateway System",
              desc: "Payment platform handling financial transactions, REST APIs, and digital payment processing.",
              tech: ["C#", ".NET", "REST API"],
              img: "https://images.unsplash.com/photo-1613243555988-441166d4d6fd?auto=format&fit=crop&q=80&w=600",
              isPrivate: true
            },
            {
              title: "BI-FAST Disbursement",
              desc: "Bulk salary transfer system enabling transfers to thousands of recipients in a single execution.",
              tech: [".NET", "React", "PostgreSQL", "BI-FAST API"],
              img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
              isPrivate: true
            },
            {
              title: "Billing Integration System",
              desc: "Third-party billing service integration (property tax, mobile airtime, e-wallet, digital payments).",
              tech: [".NET", "REST API"],
              img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
              isPrivate: true
            },
            {
              title: "Augmented Reality Apps",
              desc: "AR Android applications for Genset Operation Work Instruction, Product Intro, and Edutech.",
              tech: ["Unity", "Vuforia", "Blender", "C#"],
              img: "/products.png",
              isPrivate: false
            },
            {
              title: "Virtual Reality Simulation",
              desc: "VR application developed for Oculus Quest 2 focusing on Boiler and Genset introduction.",
              tech: ["Unity", "Oculus", "Blender", "VR"],
              img: "/vr.png",
              isPrivate: false
            },
            {
              title: "Digital Twin Boiler",
              desc: "Interactive digital twin simulation application for boiler system training and visualization.",
              tech: ["Unity", "Blender", "C#", "REST API"],
              img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
              isPrivate: true
            },
            {
              title: "Internal Web Applications",
              desc: "Employee request system, feedback portal, and Visitor Management System (VMS).",
              tech: ["React", "JavaScript", "Web App"],
              img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
              isPrivate: true
            },
            {
              title: "Non-Invasive Hb Device",
              desc: "Research project for non-invasive hemoglobin measurement device using sensor data processing.",
              tech: ["Raspberry Pi", "Hardware", "Research"],
              img: "/ta.png",
              isPrivate: false
            },
            {
              title: "Digital Arts Teaching",
              desc: "Taught 2D/3D design, basic modeling, animation, and rendering using Blender.",
              tech: ["Blender", "3D Design", "Mentoring"],
              img: "/teaching.png",
              isPrivate: false
            }
          ].map((project, i) => (
            <Reveal key={i} className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center">
              <div className="project-card glass-card rounded-2xl overflow-hidden group flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300" style={{ transitionDelay: `${(i % 3) * 0.15}s` }}>

                <div className="h-48 overflow-hidden relative shrink-0">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    {project.isPrivate ? (
                      <div className="flex flex-col items-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2 border border-white/20">
                          <Lock className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-bold tracking-wider uppercase text-slate-200">Private Project</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedImage(project.img)}
                        className="flex flex-col items-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        title="View Preview"
                      >
                        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-2 shadow-lg hover:scale-110 hover:bg-pink-600 transition-all cursor-pointer">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-bold tracking-wider uppercase text-pink-200 drop-shadow-md cursor-pointer">View Preview</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-main mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-xs md:text-sm text-muted mb-6 flex-1 leading-relaxed">{project.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="text-[11px] font-bold text-muted bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </Reveal>
          ))}
        </div>
      </section>

      <CertificationSection setSelectedImage={setSelectedImage} />

      {/* RECRUITER & AI SECTION */}
      <section className="py-10 px-6 container mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gradient ">For Recruiters</h2>
        </Reveal>
        <Reveal>
          <p className="text-center text-slate-500 mb-8">Take a quick look at my fit, or explore the AI tools below.</p>
        </Reveal>
        <div className="flex flex-col gap-8">
          <RecruiterFit />
          <AIPlayground />
        </div>
      </section>

      {/* Interactive Virtual Support Card */}
      <section className="py-10 px-6 container mx-auto">
        <VirtualSupport />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 px-6 container mx-auto max-w-4xl">
        <Reveal>
          <div className="glass-card rounded-3xl p-5 md:p-8 md:p-12 shadow-2xl shadow-blue-100/50">
            <div className="grid md:grid-cols-2 gap-12">

              {/* Kiri: Info Kontak */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gradient">Let's Connect!</h2>
                <p className="text-muted mb-8 leading-relaxed">
                  Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                <div className="space-y-5">
                  <a href="mailto:raditanur83@gmail.com" className="flex items-center gap-4 text-muted hover:text-pink-500 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center group-hover:bg-pink-100 group-hover:scale-110 transition-all duration-300">
                      <Mail className="w-5 h-5 text-pink-500" />
                    </div>
                    <span className="font-medium">raditanur83@gmail.com</span>
                  </a>

                  {/* WA Link dengan Auto-Text */}
                  <a
                    href="https://wa.me/6285794321544?text=Hi%20Radita,%20I%20saw%20your%20portfolio%20and%20I'd%20like%20to%20connect!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-muted hover:text-emerald-500 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 group-hover:scale-110 transition-all duration-300">
                      <Phone className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="font-medium">0857-9432-1544</span>
                  </a>

                  <div className="flex items-center gap-4 text-muted group cursor-default">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="font-medium">Sukabumi, West Java, ID</span>
                  </div>
                </div>
              </div>

              <form
                ref={form}
                onSubmit={sendEmail}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Your Name</label>
                  <input
                    type="text" name="name" required
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/50 hover:bg-white transition-all"
                    placeholder="Nadira Aliffia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Your Email</label>
                  <input
                    type="email" name="email" required
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/50 hover:bg-white transition-all"
                    placeholder="naliffia04@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Message</label>
                  <textarea
                    name="message" required rows="4"
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/50 hover:bg-white transition-all resize-none"
                    placeholder="Hello Dita, I'd like to talk about..."
                  ></textarea>
                </div>

                <button type="submit" className="group w-full py-3 md:py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-2">
                  Send Message <Send className="w-5 h-5" />
                </button>
              </form>

            </div>
          </div>

        </Reveal>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-slate-900/80 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer popup-anim"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>

          <img
            src={selectedImage}
            alt="Project Preview"
            onClick={(e) => e.stopPropagation()}
            className="relative w-auto max-w-[90vw] md:max-w-2xl max-h-[70vh] object-contain rounded-xl shadow-2xl ring-4 ring-white/10 cursor-default"
          />
        </div>
      )}

      {showSuccess && (
        <div
          className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="modal-glass glass-card rounded-[2rem] p-5 md:p-8 max-w-sm w-full text-center shadow-2xl popup-anim relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 to-blue-400"></div>

            <div className="absolute -left-10 -top-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

            <div className="relative z-10">
              <div className="text-6xl mb-4 animate-bounce drop-shadow-lg">🌸✨</div>

              <h3 className="text-2xl font-extrabold text-main mb-2">Message Sent!</h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                Thank you for reaching out. Your message has safely landed in Dita's inbox. She will get back to you shortly!
              </p>

              <button
                onClick={() => setShowSuccess(false)}
                className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-xl font-bold shadow-lg shadow-pink-200 hover:scale-105 transition-transform duration-300"
              >
                Awesome!
              </button>
            </div>
          </div>
        </div>
      )}

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-all text-pink-500 border border-pink-100 hover:text-pink-600 animate-fade-in-up"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Footer */}
      <footer className="text-center py-8 text-slate-500 text-sm">
        <p>© 2026 Radita Nur Ilmah Fauziyya. Crafted with<Heart className="w-3 h-3 inline text-pink-500 mx-1" /></p>
      </footer>
    </div>
  );
}