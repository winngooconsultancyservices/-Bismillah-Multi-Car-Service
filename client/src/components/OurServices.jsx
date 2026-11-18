import React from 'react';
import {
  Wrench,
  Droplet,
  Wind,
  Disc,
  BatteryCharging,
  Cpu,
  Sparkles,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import './OurServices.css';

export const SERVICES_DATA = [
  {
    id: 'general-car-service',
    title: 'General Car Service',
    desc: 'Multi-point safety check, fluid top-up & engine tune-up at your driveway.',
    icon: Wrench,
  },
  {
    id: 'oil-change',
    title: 'Oil Change',
    desc: 'Clean on-site synthetic oil drainage and fresh OEM filter replacement.',
    icon: Droplet,
  },
  {
    id: 'ac-repair',
    title: 'AC Repair & Service',
    desc: 'Refrigerant gas recharge, condenser cleaning & cooling coil sanitization.',
    icon: Wind,
  },
  {
    id: 'brake-inspection',
    title: 'Brake Inspection & Repair',
    desc: 'Brake pad replacement, disc inspection & caliper service at your doorstep.',
    icon: Disc,
  },
  {
    id: 'battery-replacement',
    title: 'Battery Replacement',
    desc: 'On-demand battery health check, terminal cleaning & new battery install.',
    icon: BatteryCharging,
  },
  {
    id: 'engine-diagnostics',
    title: 'Engine Diagnostics',
    desc: 'Computerized OBD-II engine scan, fault code check & on-the-spot fix.',
    icon: Cpu,
  },
  {
    id: 'car-washing',
    title: 'Car Washing & Cleaning',
    desc: 'Eco-friendly exterior foam wash, deep interior vacuum & polish.',
    icon: Sparkles,
  },
  {
    id: 'emergency-breakdown',
    title: 'Emergency Breakdown Assistance',
    desc: 'Rapid mobile mechanic dispatch for jump starts, flat tyres & breakdowns.',
    icon: AlertTriangle,
  }
];

export const OurServices = ({ onSelectService }) => {
  const handleBookService = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const target = document.querySelector('#booking');
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Duplicate list twice to guarantee seamless infinite horizontal marquee
  const marqueeItems = [...SERVICES_DATA, ...SERVICES_DATA];

  return (
    <section id="services" className="section-wrapper section-wrapper-alt services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Our Doorstep Car Services
          </p>
        </div>
      </div>

      {/* Auto-scrolling horizontal marquee container */}
      <div className="services-marquee-wrapper">
        <div className="services-marquee-track">
          {marqueeItems.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={`${service.id}-${index}`}
                className="service-card-blue"
                onClick={() => handleBookService(service.title)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleBookService(service.title);
                  }
                }}
              >
                <div className="service-icon-box-blue">
                  <Icon size={28} />
                </div>

                <h3 className="service-title-blue">{service.title}</h3>
                <p className="service-desc-blue">{service.desc}</p>

                <button
                  type="button"
                  className="service-book-btn-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookService(service.title);
                  }}
                >
                  <span>Book Service</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
