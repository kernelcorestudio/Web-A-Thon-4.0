'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { soundFX } from '@/lib/audio';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Who is eligible to participate in NIRVAN 26?',
    answer:
      'All undergraduate, postgraduate, and diploma students from recognized universities and colleges across India are eligible to participate. Please carry your valid college ID card during on-campus check-in.',
  },
  {
    id: 'faq-2',
    question: 'Can I register for multiple events during the fest?',
    answer:
      'Yes! You can participate in multiple events as long as their schedules do not overlap. Check our interactive timeline in the Schedule section to plan your event participation seamlessly.',
  },
  {
    id: 'faq-3',
    question: 'Are hardware and software tracks combined in Web-a-thon 4.0?',
    answer:
      'Web-a-thon 4.0 features dedicated tracks for both Software (AI/Web3/FullStack) and Hardware/IoT innovation. Teams can choose their preferred track or build hybrid smart solutions with IoT peripherals.',
  },
  {
    id: 'faq-4',
    question: 'Is accommodation provided for outstation participants?',
    answer:
      'Yes, verified outstation hackathon teams receive subsidized hostel stay and bedding arrangements inside the GEHU campus for all 3 days. Prior registration and slot booking during pass creation are mandatory.',
  },
  {
    id: 'faq-5',
    question: 'Will all participants receive certificates and swags?',
    answer:
      'Absolutely! Every verified attendee receives an official NIRVAN 26 Hacker Pass, certificate of participation, exclusive sponsor stickers, and premium developer swags. Winners also receive cash prizes and trophies.',
  },
  {
    id: 'faq-6',
    question: 'What is the team size limit for the hackathon?',
    answer:
      'Teams for the 36-hour Hackathon can comprise 2 to 4 members. Solo entries are permitted for select competitive coding challenges, CTF, and individual esports tournaments.',
  },
  {
    id: 'faq-7',
    question: 'What is included in the Event Bundles pass?',
    answer:
      'Event Bundles provide discounted all-access passes covering entry to Hackathon, CTF Challenge, Tech Masterclass workshops, and gaming arenas along with priority food vouchers and networking perks.',
  },
  {
    id: 'faq-8',
    question: 'Will food, snacks, and high-speed WiFi be provided during overnight hackathons?',
    answer:
      'Yes, 24x7 high-speed gigabit Wi-Fi, multi-port power stations, midnight energy drinks, snacks, and meal passes are provided in the Hackathon War Room throughout the competition.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const toggleAccordion = (id: string) => {
    soundFX.playClick();
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        {/* Section Header */}
        <div className="faq-header">
          <div className="faq-pill-badge">
            <HelpCircle className="w-4 h-4" />
            <span>HACKER SURVIVAL GUIDE & FAQ</span>
          </div>

          <h2 className="faq-title">
            FREQUENTLY ASKED <span className="faq-title-gradient">QUESTIONS</span>
          </h2>

          <p className="faq-subtitle">
            Everything you need to know about eligibility, team configurations, campus stay, food, WiFi,
            and certificates.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list">
          {FAQ_DATA.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className={`faq-card ${isOpen ? 'open' : ''}`}
                onClick={() => toggleAccordion(faq.id)}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question-text">{faq.question}</h3>
                  <div className={`faq-chevron-btn ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>

                <div
                  className="faq-answer-container"
                  style={{
                    maxHeight: isOpen ? '240px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="faq-answer-text">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
