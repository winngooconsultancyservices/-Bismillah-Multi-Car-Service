import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import './AboutUs.css';

export const AboutUs = () => {
  const scrollToHowItWorks = (e) => {
    e.preventDefault();
    const target = document.querySelector('#how-it-works');
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
    <section id="about" className="section-wrapper about-section">
      <div className="container">
        {/* Section Header Title */}
        <div className="section-header">
          <h2 className="section-title">About Us</h2>
          <p className="section-subtitle">
            Dedicated to delivering professional, garage-grade car maintenance and repairs right at your home or office.
          </p>
        </div>

        {/* About Us Showcase Card */}
        <div className="about-showcase-card">
          {/* Left Column: Content */}
          <div className="about-showcase-content">
            <div className="about-label-badge">
              <span className="about-label-line"></span>
              <span className="about-label-text">ABOUT US</span>
            </div>

            <h3 className="about-showcase-heading">
              Your Trusted <br />
              Car Service Partner
            </h3>

            <p className="about-showcase-desc">
              We are a team of experienced automotive professionals, dedicated to keep your car in perfect condition — at your doorstep.
            </p>

            <ul className="about-feature-checklist">
              <li className="about-checklist-item">
                <span className="about-check-bullet">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>Professional &amp; Experienced Team</span>
              </li>
              <li className="about-checklist-item">
                <span className="about-check-bullet">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>Transparent Pricing</span>
              </li>
              <li className="about-checklist-item">
                <span className="about-check-bullet">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>Quality Service Guaranteed</span>
              </li>
            </ul>

            <a
              href="#how-it-works"
              onClick={scrollToHowItWorks}
              className="about-cta-btn"
            >
              <span>Learn More</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right Column: Angled Automotive Image */}
          <div className="about-showcase-visual">
            <div className="about-accent-stripe"></div>
            <div className="about-image-clip">
              <img
                src="/about-mechanic.jpg"
                alt="Automotive mechanic servicing car at doorstep"
                className="about-car-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
