import React, { useState, useEffect } from 'react';
import { Wrench, Menu, X, ShieldCheck } from 'lucide-react';
import './Navbar.css';

export const Navbar = ({ config }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#booking' },
  ];

  useEffect(() => {
    const sectionIds = ['home', 'services', 'about', 'how-it-works', 'why-us', 'booking'];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      // Check if user is scrolled to the very bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('#booking');
        return;
      }
      // Check if user is at the very top of the page
      if (window.scrollY < 120) {
        setActiveSection('#home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Intersection Observer to detect currently visible section smoothly
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setActiveSection(href);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 76;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-main">
        {/* Brand Logo */}
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="nav-brand" aria-label="Bismillah Multi Car Service Home">
          <img
            src="/business-logo.png"
            alt="Bismillah Multi Car Service"
            className="nav-brand-logo"
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`nav-item ${activeSection === link.href ? 'active' : ''}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="nav-actions">
          <a
            href="#booking"
            onClick={(e) => handleLinkClick(e, '#booking')}
            className="btn btn-primary nav-book-btn"
          >
            <span>Book Service</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <img
              src="/business-logo.png"
              alt="Bismillah Multi Car Service"
              className="mobile-brand-logo"
            />
            <button className="mobile-close" onClick={() => setMobileMenuOpen(false)}>
              <X size={22} />
            </button>
          </div>

          <div className="mobile-badge-box">
            <ShieldCheck size={16} />
            <span>We Come To Your Home Or Office</span>
          </div>

          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`mobile-nav-item ${activeSection === link.href ? 'active' : ''}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mobile-drawer-footer">
            <a
              href="#booking"
              onClick={(e) => handleLinkClick(e, '#booking')}
              className="btn btn-primary w-full"
            >
              Book Doorstep Service
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
