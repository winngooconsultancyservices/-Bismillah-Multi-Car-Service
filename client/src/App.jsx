import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { OurServices } from './components/OurServices.jsx';
import { AboutUs } from './components/AboutUs.jsx';
import { HowItWorks } from './components/HowItWorks.jsx';
import { WhyChooseUs } from './components/WhyChooseUs.jsx';
import { BookingSection } from './components/BookingSection.jsx';
import { Footer } from './components/Footer.jsx';
import { BookingSuccessModal } from './components/BookingSuccessModal.jsx';
import { api } from './utils/api.js';

export function App() {
  const [config, setConfig] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [bookingSuccessResult, setBookingSuccessResult] = useState(null);

  const fetchConfiguration = async () => {
    try {
      const data = await api.getConfig();
      if (data.success && data.config) {
        setConfig(data.config);
      }
    } catch (err) {
      console.warn('Could not fetch config from backend, using fallbacks:', err.message);
    }
  };

  useEffect(() => {
    fetchConfiguration();
  }, []);

  const handleSelectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
  };

  const handleBookingSuccess = (result) => {
    setBookingSuccessResult(result);
  };

  return (
    <div className="app-root">
      {/* 1. NAVBAR */}
      <Navbar config={config} />

      <main>
        {/* 2. HERO SECTION */}
        <Hero 
          config={config} 
          onSelectService={handleSelectService} 
        />

        {/* 3. OUR SERVICES SECTION */}
        <OurServices 
          onSelectService={handleSelectService} 
        />

        {/* 4. ABOUT US SECTION */}
        <AboutUs />

        {/* 5. HOW IT WORKS SECTION */}
        <HowItWorks 
          onBookClick={() => handleSelectService('')} 
        />

        {/* 6. WHY CHOOSE US SECTION */}
        <WhyChooseUs />

        {/* 7. CONTACT & BOOKING SECTION */}
        <BookingSection 
          selectedService={selectedService}
          config={config}
          onBookingSuccess={handleBookingSuccess}
        />
      </main>

      {/* 8. FOOTER */}
      <Footer 
        config={config}
        onSelectService={handleSelectService}
      />

      {/* Booking Success Feedback Modal */}
      {bookingSuccessResult && (
        <BookingSuccessModal
          bookingResult={bookingSuccessResult}
          onClose={() => setBookingSuccessResult(null)}
        />
      )}
    </div>
  );
}

export default App;
