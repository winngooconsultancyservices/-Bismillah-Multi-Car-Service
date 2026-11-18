import React from 'react';
import { 
  Award, 
  Home, 
  ShieldCheck, 
  DollarSign, 
  Headphones, 
  ThumbsUp, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import './WhyChooseUs.css';

export const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Award,
      title: 'Experienced Mechanics',
      description: 'Our mobile mechanics hold formal automotive certifications and minimum 5+ years of dealership repair experience across all car brands.',
    },
    {
      icon: Home,
      title: 'Convenient Home Service',
      description: 'Zero garage commutes. We perform fluid changes, diagnostics, AC repair, and brake jobs directly at your residential or commercial parking space.',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Spare Parts',
      description: 'We strictly install 100% genuine OEM/OES components, factory-recommended synthetic oils, and brand-name long-life car batteries.',
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      description: 'Without bloated physical workshop real estate costs, we pass on massive savings to you with clear, upfront estimates and zero surprise bills.',
    },
    {
      icon: Headphones,
      title: 'Reliable Support',
      description: 'Dedicated customer helpline and active WhatsApp dispatch support to guide you before, during, and after your doorstep car service.',
    },
    {
      icon: ThumbsUp,
      title: 'Customer Satisfaction',
      description: 'Every doorstep service is backed by our 30-day warranty. If any issue persists, our technician returns to inspect at zero charge.',
    },
  ];

  return (
    <section id="why-us" className="section-wrapper why-us-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Why Choose Our Doorstep Service</h2>
          <p className="section-subtitle">
            Experience next-generation automotive convenience built around your schedule, 
            your driveway, and your total peace of mind.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="why-grid">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="why-card card-base">
                <div className="why-icon-box">
                  <Icon size={26} />
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
