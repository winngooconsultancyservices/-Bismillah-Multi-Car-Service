import React from 'react';
import { Calendar, MessageSquare } from 'lucide-react';
import './Hero.css';

export const Hero = ({ config, onSelectService }) => {
  const whatsappNumber = config?.business_whatsapp || '919840735842';
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');

  const scrollToBooking = (e) => {
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
    <>
      <section id="home" className="hero-section-banner">
        {/* Background Merged Image (Seamlessly blended with gradient mask - No box) */}
        <div className="hero-bg-visual-layer">
          <img
            src="/hero-car-service.jpg"
            alt="Bismillah Multi Car Service Doorstep Mechanics"
            className="hero-merged-bg-img"
          />
          <div className="hero-merged-gradient-overlay"></div>
        </div>

        <div className="hero-banner-inner">
          <div className="container hero-banner-container">
            
            {/* Main Content Column */}
            <div className="hero-banner-content">
              <h1 className="hero-banner-title">
                Professional Car Service <br />
                <span className="highlight-text">at Your Doorstep</span>
              </h1>

              <p className="hero-banner-desc">
                We bring expert car maintenance and repair services directly to your home or office. 
                No waiting in workshops, no towing hassles, and zero garage visits. Our certified mechanics 
                arrive fully equipped to service your car right in your driveway.
              </p>

              <div className="hero-banner-actions">
                <a href="#booking" onClick={scrollToBooking} className="btn-hero-solid">
                  <Calendar size={18} />
                  <span>Book a Service</span>
                </a>

                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Bismillah Multi Car Service! I would like to book a doorstep car service at my home/office.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero-glass"
                >
                  <MessageSquare size={18} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Clean White Breathing Space below Hero */}
      <div className="hero-white-spacer" aria-hidden="true"></div>
    </>
  );
};
