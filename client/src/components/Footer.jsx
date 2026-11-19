import React from 'react';
import { 
  Wrench, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight
} from 'lucide-react';
import './Footer.css';

export const Footer = ({ config, onSelectService }) => {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
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
    <footer id="footer" className="site-footer">
      <div className="container">
        {/* Footer Top Grid */}
        <div className="footer-grid">
          {/* Col 1: Brand & Model Statement */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <img
                src="/business-logo.png"
                alt="Bismillah Multi Car Service"
                className="footer-brand-logo"
              />
            </div>

            <p className="footer-about-text">
              Bismillah Multi Car Service is a premier 100% home & doorstep car servicing provider. We have no physical garages or showrooms. 
              Our certified mobile mechanics bring complete automotive care directly to your driveway, apartment parking, or office bay.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#home" onClick={(e) => handleScroll(e, '#home')}>
                  <ChevronRight size={14} /> Home
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScroll(e, '#services')}>
                  <ChevronRight size={14} /> Doorstep Services
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleScroll(e, '#about')}>
                  <ChevronRight size={14} /> About Our Model
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => handleScroll(e, '#how-it-works')}>
                  <ChevronRight size={14} /> How It Works
                </a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => handleScroll(e, '#why-us')}>
                  <ChevronRight size={14} /> Why Choose Us
                </a>
              </li>
              <li>
                <a href="#booking" onClick={(e) => handleScroll(e, '#booking')}>
                  <ChevronRight size={14} /> Book Service
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Information */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact Information</h4>
            <div className="footer-contacts">
              <a href={`tel:${config?.business_phone || '+919840735842'}`} className="footer-contact-item">
                <Phone size={16} className="f-icon" />
                <span>{config?.business_phone || '+91 98407 35842'}</span>
              </a>

              <a href={`mailto:${config?.business_email || 'mohammedazar589@gmail.com'}`} className="footer-contact-item">
                <Mail size={16} className="f-icon" />
                <span>{config?.business_email || 'mohammedazar589@gmail.com'}</span>
              </a>

              <div className="footer-contact-item static">
                <Clock size={16} className="f-icon" />
                <span>{config?.working_hours || '24/7'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} Bismillah Multi Car Service. All rights reserved. 
            Dedicated 100% Doorstep Automotive Care.
          </p>
        </div>
      </div>
    </footer>
  );
};
