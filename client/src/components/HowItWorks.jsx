import React from 'react';
import { 
  CalendarCheck, 
  Truck, 
  Wrench, 
  CheckCircle, 
  ArrowRight
} from 'lucide-react';
import './HowItWorks.css';

export const HowItWorks = ({ onBookClick }) => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Book Your Service',
      desc: 'Select your needed car service, car model, and preferred doorstep date & time in less than 60 seconds.',
      icon: CalendarCheck,
    },
    {
      stepNumber: '02',
      title: 'We Come to You',
      desc: 'Our certified mobile mechanic arrives at your doorstep or office parking lot with a fully-equipped service van.',
      icon: Truck,
    },
    {
      stepNumber: '03',
      title: 'Service & Repair',
      desc: 'We perform a thorough 40-point vehicle check, execute oil/filter changes, diagnostics or repairs in your presence.',
      icon: Wrench,
    },
    {
      stepNumber: '04',
      title: 'Drive Happy',
      desc: 'Inspect the completed work, receive digital health report, enjoy convenient contactless payment, and drive with confidence.',
      icon: CheckCircle,
    },
  ];

  const handleScrollToBooking = (e) => {
    e.preventDefault();
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

  return (
    <section id="how-it-works" className="section-wrapper how-it-works-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">How Doorstep Car Service Works</h2>
          <p className="section-subtitle">
            Say goodbye to spending Saturdays waiting at inconvenient garages. 
            Here is how effortless car maintenance is with Bismillah Multi Car Service.
          </p>
        </div>

        {/* Timeline Steps Layout */}
        <div className="timeline-container">
          <div className="timeline-line"></div>

          <div className="timeline-grid">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="timeline-card card-base">
                  <div className="timeline-header">
                    <span className="step-num-badge">{step.stepNumber}</span>
                    <div className="step-icon-box">
                      <Icon size={24} />
                    </div>
                  </div>

                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick CTA Bottom */}
        <div className="how-cta-banner">
          <div className="how-cta-text">
            <h4>Ready for hassle-free doorstep car servicing?</h4>
            <p>Our mechanics are ready to visit your home or office today.</p>
          </div>
          <a href="#booking" onClick={handleScrollToBooking} className="btn btn-primary">
            <span>Book Your Slot Now</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
