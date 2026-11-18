import React from 'react';
import { UserCheck, ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react';
import './ServiceHighlights.css';

export const ServiceHighlights = () => {
  const highlights = [
    {
      icon: UserCheck,
      title: 'Expert Technicians',
      description: 'Certified, background-verified automotive professionals with years of hands-on multi-brand vehicle experience.',
      tag: 'Certified & Verified'
    },
    {
      icon: ShieldCheck,
      title: 'Trusted Service',
      description: '100% genuine OEM spare parts, upfront transparent estimates, and zero hidden workshop markups.',
      tag: '100% Genuine Spares'
    },
    {
      icon: Truck,
      title: 'We Come to You',
      description: 'Direct service at your home driveway, apartment basement, or office parking lot. No garage visit needed.',
      tag: 'Doorstep Convenience'
    },
    {
      icon: Clock,
      title: 'On-Time Service',
      description: 'Punctual arrival windows, rapid turnaround times, and real-time updates as our mechanic travels to you.',
      tag: 'Punctual Dispatch'
    },
  ];

  return (
    <section id="highlights" className="highlights-section">
      <div className="container">
        <div className="highlights-grid">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="highlight-card">
                <div className="highlight-icon-wrapper">
                  <Icon size={28} className="highlight-icon" />
                </div>
                <div className="highlight-content">
                  <span className="highlight-tag">{item.tag}</span>
                  <h3 className="highlight-title">{item.title}</h3>
                  <p className="highlight-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
