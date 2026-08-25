'use client';

import React, { useState, useRef, useEffect } from 'react';
import { soundFX } from '@/lib/audio';

interface TerminalProps {
  onOpenRegister: () => void;
  onOpenVideo: () => void;
}

interface LogEntry {
  type: 'prompt' | 'system' | 'response' | 'error';
  content: string;
}

export default function Terminal({ onOpenRegister, onOpenVideo }: TerminalProps) {
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: 'system', content: `[SYSTEM INITIALIZED] NIRVAN '26 FEST ENVIRONMENT READY.` },
    {
      type: 'system',
      content: `Type '<span class="cyan">help</span>' to inspect available system commands or '<span class="cyan">register</span>' to get your ticket pass.`,
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputVal.trim();
    if (!raw) return;

    soundFX.playGlitch();
    setInputVal('');

    const cmd = raw.toLowerCase();

    // Append user input line
    const newLogs: LogEntry[] = [...logs, { type: 'prompt', content: raw }];

    if (cmd === 'clear') {
      setLogs([]);
      return;
    }

    if (cmd === 'help') {
      newLogs.push({
        type: 'response',
        content: `Available commands:
  • <span class="cyan">about</span>       : Overview of NIRVAN '26
  • <span class="cyan">tracks</span>      : View fest tracks & challenges
  • <span class="cyan">gehu</span>        : Graphic Era Hill University Campus info
  • <span class="cyan">prizes</span>      : Cash prizes & bounty perks
  • <span class="cyan">register</span>    : Open registration pass generator
  • <span class="cyan">video</span>       : Launch campus teaser showcase
  • <span class="cyan">matrix</span>      : Trigger cyber visual flux
  • <span class="cyan">clear</span>       : Clear console screen
  • <span class="cyan">easteregg</span>   : Secret unlockable message`,
      });
    } else if (cmd === 'about') {
      newLogs.push({
        type: 'response',
        content: `<span class="green">NIRVAN '26 — Annual College Technical Fest</span>
Tagline: "Where Ideas Become Innovations"
Campus : Graphic Era Hill University (GEHU), Dehradun
Audience: Developers, Designers, Innovators, Students
Theme  : Innovations • Technology • Competition • Community`,
      });
    } else if (cmd === 'tracks') {
      newLogs.push({
        type: 'response',
        content: `<span class="cyan">[ TRACK MATRIX ]</span>
1. AI & Deep Learning (Autonomous Agents, LLMs, Computer Vision)
2. Web 3.0 & Decentralized Systems (Smart Contracts, DeFi, Zero-Knowledge)
3. Cyber Security & CTF (Ethical Hacking, Cryptography, Defensive Sec)
4. UI/UX & Creative Tech (Futuristic Interfaces, 3D Web, Design Systems)
5. Robotics, IoT & Embedded (Smart Hardware, Drone Tech, Edge AI)
6. Open Innovation (Wildcard moonshot projects for real-world impact)`,
      });
    } else if (cmd === 'gehu') {
      newLogs.push({
        type: 'response',
        content: `<span class="purple">[ GEHU CAMPUS SPOTLIGHT ]</span>
Graphic Era Hill University is a world-class academic institution nestled in the scenic valleys of Dehradun, Uttarakhand. Renowned for technological excellence, research incubators, and cutting-edge hackathon culture.`,
      });
    } else if (cmd === 'prizes') {
      newLogs.push({
        type: 'response',
        content: `<span class="cyan">🏆 PRIZE POOL MATRIX</span>
• 1st Place Grand Winner : ₹2,50,000 + Incubation Support + Cloud Credits
• 2nd Place Runner Up    : ₹1,50,000 + Swag Kits + Fast-track Interviews
• 3rd Place Innovation   : ₹1,00,000 + Hardware Kits
• Track Category Winners : ₹25,000 each (6 Tracks)
• Total Rewards Pool     : <span class="green">₹5,00,000+ IN CASH & BOUNTIES</span>`,
      });
    } else if (cmd === 'register') {
      onOpenRegister();
      newLogs.push({
        type: 'response',
        content: `<span class="green">Opening holographic registration modal...</span>`,
      });
    } else if (cmd === 'video') {
      onOpenVideo();
      newLogs.push({
        type: 'response',
        content: `<span class="cyan">Loading high-definition campus fest video...</span>`,
      });
    } else if (cmd === 'matrix') {
      document.body.style.filter = 'hue-rotate(90deg)';
      setTimeout(() => {
        document.body.style.filter = 'none';
      }, 2000);
      newLogs.push({
        type: 'response',
        content: `<span class="green">01001110 01001001 01010010 01010110 01000001 01001110 00100000 00110010 00110110</span>`,
      });
    } else if (cmd === 'easteregg') {
      newLogs.push({
        type: 'response',
        content: `<span class="purple">✨ "Code is poetry written with logic. See you at GEHU Campus for NIRVAN '26!"</span> 🚀`,
      });
    } else {
      newLogs.push({
        type: 'error',
        content: `<span style="color:#ff5555">Command not recognized: '${raw}'. Type '<span class="cyan">help</span>' for available commands.</span>`,
      });
    }

    setLogs(newLogs);
  };

  return (
    <section id="terminal" className="terminal-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">DEVELOPER CONSOLE</span>
          <h2 className="section-title">Interactive Fest Terminal</h2>
          <p className="section-subtitle">
            Execute commands to explore fest tracks, campus lore, and secret easter eggs.
          </p>
        </div>

        <div className="terminal-window">
          <div className="terminal-topbar">
            <div className="terminal-dots">
              <div className="dot dot-red"></div>
              <div className="dot dot-yellow"></div>
              <div className="dot dot-green"></div>
            </div>
            <div className="terminal-title">nirvan-cli — v2.6.0 — gehu-core</div>
            <div style={{ width: 48 }}></div>
          </div>

          <div ref={terminalBodyRef} id="terminal-output" className="terminal-body">
            {logs.map((log, index) => {
              if (log.type === 'prompt') {
                return (
                  <div key={index} className="terminal-line">
                    <span className="terminal-prompt">user@nirvan-26:~$</span> {log.content}
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className={`terminal-line ${log.type === 'system' ? 'muted' : ''}`}
                  dangerouslySetInnerHTML={{ __html: log.content }}
                />
              );
            })}
          </div>

          <form onSubmit={handleCommand} className="terminal-input-row" style={{ padding: '0 24px 20px 24px' }}>
            <span className="terminal-prompt">user@nirvan-26:~$</span>
            <input
              type="text"
              id="terminal-command-input"
              className="terminal-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type a command (e.g. help, tracks, gehu, prizes)..."
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
