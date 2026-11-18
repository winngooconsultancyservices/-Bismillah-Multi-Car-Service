import React from 'react';
import { Star, Quote, CheckCircle, ShieldCheck, MapPin } from 'lucide-react';
import './CustomerTestimonials.css';

export const CustomerTestimonials = () => {
  const testimonials = [
    {
      name: 'Aditya Mathur',
      role: 'IT Project Director',
      location: 'Palm Springs Enclave, Sector 45',
      car: 'Hyundai Creta Turbo',
      service: 'General Periodic Service',
      content:
        'I usually dread spending my Saturday morning at the service center. Winngoo mechanic arrived at 10 AM sharp at my apartment parking with all equipment. Completed full synthetic oil change, filter changes and 40-point check right before my eyes. Superb service!',
      rating: 5,
    },
    {
      name: 'Pooja Venkatesh',
      role: 'Architect & Designer',
      location: 'Whitefield Greenwoods',
      car: 'Honda City i-VTEC',
      service: 'Brake Inspection & AC Overhaul',
      content:
        'My car AC stopped cooling right in the summer peak. The mobile technician brought the refrigerant cylinder, leak detection sensors and cleaned the cooling coils right in my office parking lot. Saved me 4 hours of workshop sitting. 10/10 recommend!',
      rating: 5,
    },
    {
      name: 'Vikram Sengupta',
      role: 'Business Consultant',
      location: 'Prestige Lakeside Villa',
      car: 'Maruti Suzuki Baleno',
      service: 'Battery Replacement & Diagnostics',
      content:
        'Car refused to start in my driveway on a Monday morning. Booked doorstep assistance via WhatsApp and technician was at my home within 45 minutes with a brand new sealed battery and diagnostic scanner. Zero hassles and transparent bill.',
      rating: 5,
    },
    {
      name: 'Sneha Deshmukh',
      role: 'Chartered Accountant',
      location: 'Cyber City Residences',
      car: 'Kia Seltos 1.5',
      service: 'Oil Change & Doorstep Wash',
      content:
        'Genuine parts, verified mechanic in clean uniform, and zero mess left on my driveway! The best part is receiving the itemized digital health report. Will never go back to traditional workshops again.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="section-wrapper testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-pill">
            <Quote size={14} />
            <span>Real Customer Experiences</span>
          </div>
          <h2 className="section-title">What Our Doorstep Customers Say</h2>
          <p className="section-subtitle">
            Over 15,000+ car owners enjoy convenient doorstep maintenance without taking a step 
            outside their homes. Read their verified feedback.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <div key={index} className="testimonial-card card-base">
              <div className="testimonial-top">
                {/* 5 Stars rendered in sleek Secondary Blue */}
                <div className="stars-row">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-icon" fill="#0969DA" />
                  ))}
                </div>
                <span className="verified-badge">
                  <CheckCircle size={13} />
                  <span>Verified Doorstep Service</span>
                </span>
              </div>

              <p className="testimonial-text">"{item.content}"</p>

              <div className="testimonial-footer">
                <div className="author-info">
                  <h4 className="author-name">{item.name}</h4>
                  <span className="author-role">{item.role}</span>
                  <div className="author-meta">
                    <span className="meta-car">{item.car}</span>
                    <span className="meta-bullet">•</span>
                    <span className="meta-service">{item.service}</span>
                  </div>
                </div>
                <div className="author-location">
                  <MapPin size={13} />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
