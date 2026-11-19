import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Car, 
  Wrench, 
  Mail, 
  Send, 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  Loader2,
  CheckCircle2,
  Headphones
} from 'lucide-react';
import './BookingSection.css';

const CAR_BRANDS = [
  'Hyundai',
  'Maruti Suzuki',
  'Tata Motors',
  'Honda',
  'Toyota',
  'Kia',
  'Mahindra',
  'Volkswagen',
  'Skoda',
  'Renault',
  'MG Motor',
  'Ford',
  'Nissan',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Other Brand'
];

const TIME_SLOTS = [
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
  '06:00 PM - 08:00 PM'
];

export const BookingSection = ({ selectedService, config, onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    customerLocation: '',
    carBrand: '',
    carModel: '',
    requiredService: '',
    preferredDate: '',
    preferredTime: '',
    additionalDetails: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // When user clicks "Book Now" or "Learn More" on a service card, sync here
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, requiredService: selectedService }));
    }
  }, [selectedService]);

  // Today's minimum date in YYYY-MM-DD
  const todayDate = new Date().toISOString().split('T')[0];

  const servicesList = [
    'General Car Service',
    'Oil Change',
    'AC Repair & Service',
    'Brake Inspection & Repair',
    'Battery Replacement',
    'Engine Diagnostics',
    'Car Washing & Cleaning',
    'Emergency Breakdown Assistance',
    'Custom Repair / Inspection'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
    setErrorMessage('');
  };

  const validate = () => {
    const errors = {};
    if (!formData.customerName.trim()) errors.customerName = 'Customer Name is required';
    if (!formData.mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile Number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.mobileNumber.trim())) {
      errors.mobileNumber = 'Please enter a valid mobile number';
    }
    if (!formData.customerLocation.trim()) errors.customerLocation = 'Doorstep Location / Address is required';
    if (!formData.carBrand) errors.carBrand = 'Car Brand is required';
    if (!formData.requiredService) errors.requiredService = 'Please select a service';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setErrorMessage('Please fix highlighted fields before submitting.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    // Build WhatsApp message from form data
    const message = [
      '🚗 *New Car Service Booking Enquiry*',
      '━━━━━━━━━━━━━━━━━━━━',
      `👤 *Customer Name:* ${formData.customerName}`,
      `📞 *Mobile Number:* ${formData.mobileNumber}`,
      `📍 *Location / Address:* ${formData.customerLocation}`,
      `🚘 *Car Brand:* ${formData.carBrand}`,
      formData.carModel ? `🔧 *Car Model & Year:* ${formData.carModel}` : '',
      `🛠️ *Required Service:* ${formData.requiredService}`,
      formData.preferredDate ? `📅 *Preferred Date:* ${formData.preferredDate}` : '',
      formData.preferredTime ? `⏰ *Preferred Time:* ${formData.preferredTime}` : '',
      formData.additionalDetails ? `📝 *Additional Details:* ${formData.additionalDetails}` : '',
      '━━━━━━━━━━━━━━━━━━━━',
      '_Sent via Bismillah Multi Car Service Website_',
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Notify parent and reset form
    if (onBookingSuccess) {
      onBookingSuccess({ success: true, bookingId: `BK${Date.now()}` });
    }

    setFormData({
      customerName: '',
      mobileNumber: '',
      customerLocation: '',
      carBrand: '',
      carModel: '',
      requiredService: '',
      preferredDate: '',
      preferredTime: '',
      additionalDetails: '',
    });

    setLoading(false);
  };

  const whatsappNumber = config?.business_whatsapp || '919840735842';
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section id="booking" className="section-wrapper booking-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">
            Book Doorstep Car Service
          </p>
        </div>

        <div className="booking-layout">
          {/* Left Column: Booking Form */}
          <div className="booking-form-card card-base">
            <div className="form-card-header">
              <h3 className="form-heading">Enter Service & Location Details</h3>
            </div>

            {errorMessage && (
              <div className="booking-alert-error">
                <AlertCircle size={18} className="alert-icon" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="booking-form" noValidate>
              <div className="form-grid">
                {/* Customer Name */}
                <div className="form-group">
                  <label className="form-label">
                    <User size={15} />
                    <span>Customer Name *</span>
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Kumar"
                    className={`form-input ${fieldErrors.customerName ? 'has-error' : ''}`}
                    required
                  />
                  {fieldErrors.customerName && <span className="error-text">{fieldErrors.customerName}</span>}
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                  <label className="form-label">
                    <Phone size={15} />
                    <span>Mobile Number *</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className={`form-input ${fieldErrors.mobileNumber ? 'has-error' : ''}`}
                    required
                  />
                  {fieldErrors.mobileNumber && <span className="error-text">{fieldErrors.mobileNumber}</span>}
                </div>

                {/* Doorstep Location / Address */}
                <div className="form-group full-width">
                  <label className="form-label">
                    <MapPin size={15} />
                    <span>Customer Location / Address (Home or Office) *</span>
                  </label>
                  <input
                    type="text"
                    name="customerLocation"
                    value={formData.customerLocation}
                    onChange={handleChange}
                    placeholder="e.g. Flat 402, Tower B, Palm Meadows, Whitefield / Office Parking Slot 14"
                    className={`form-input ${fieldErrors.customerLocation ? 'has-error' : ''}`}
                    required
                  />
                  {fieldErrors.customerLocation && <span className="error-text">{fieldErrors.customerLocation}</span>}
                </div>

                {/* Car Brand */}
                <div className="form-group">
                  <label className="form-label">
                    <Car size={15} />
                    <span>Car Brand *</span>
                  </label>
                  <select
                    name="carBrand"
                    value={formData.carBrand}
                    onChange={handleChange}
                    className={`form-select ${fieldErrors.carBrand ? 'has-error' : ''}`}
                    required
                  >
                    <option value="">Select Car Brand</option>
                    {CAR_BRANDS.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                  {fieldErrors.carBrand && <span className="error-text">{fieldErrors.carBrand}</span>}
                </div>

                {/* Car Model */}
                <div className="form-group">
                  <label className="form-label">
                    <Car size={15} />
                    <span>Car Model &amp; Year</span>
                  </label>
                  <input
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleChange}
                    placeholder="e.g. Creta Petrol 2021"
                    className={`form-input ${fieldErrors.carModel ? 'has-error' : ''}`}
                  />
                  {fieldErrors.carModel && <span className="error-text">{fieldErrors.carModel}</span>}
                </div>

                {/* Required Service */}
                <div className="form-group full-width">
                  <label className="form-label">
                    <Wrench size={15} />
                    <span>Required Service *</span>
                  </label>
                  <select
                    name="requiredService"
                    value={formData.requiredService}
                    onChange={handleChange}
                    className={`form-select ${fieldErrors.requiredService ? 'has-error' : ''}`}
                    required
                  >
                    <option value="">Select Required Service</option>
                    {servicesList.map((srv) => (
                      <option key={srv} value={srv}>{srv}</option>
                    ))}
                  </select>
                  {fieldErrors.requiredService && <span className="error-text">{fieldErrors.requiredService}</span>}
                </div>

                {/* Preferred Date */}
                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={15} />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    min={todayDate}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={`form-input ${fieldErrors.preferredDate ? 'has-error' : ''}`}
                  />
                  {fieldErrors.preferredDate && <span className="error-text">{fieldErrors.preferredDate}</span>}
                </div>

                {/* Preferred Time */}
                <div className="form-group">
                  <label className="form-label">
                    <Clock size={15} />
                    <span>Preferred Time Slot</span>
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className={`form-select ${fieldErrors.preferredTime ? 'has-error' : ''}`}
                  >
                    <option value="">Select Time Window</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {fieldErrors.preferredTime && <span className="error-text">{fieldErrors.preferredTime}</span>}
                </div>

                {/* Additional Details */}
                <div className="form-group full-width">
                  <label className="form-label">
                    <FileText size={15} />
                    <span>Additional Details / Car Symptoms</span>
                  </label>
                  <textarea
                    name="additionalDetails"
                    rows="3"
                    value={formData.additionalDetails}
                    onChange={handleChange}
                    placeholder="Mention specific issues (e.g. AC cooling low, unusual squeaking brake noise, synthetic oil preference, gate entry code...)"
                    className="form-textarea"
                  ></textarea>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="form-submit-container">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-whatsapp btn-submit-booking"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="spinner" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Submit Enquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Contact & Doorstep Benefits Card */}
          <div className="booking-info-sidebar">
            <div className="contact-summary-card card-base">
              <h4 className="sidebar-card-title">Direct Contact & Support</h4>
              <p className="sidebar-desc">
                Have questions or need emergency assistance? Our dispatch coordinators are active on phone and email.
              </p>

              <div className="sidebar-contact-list">
                <a href={`tel:${config?.business_phone || '+919840735842'}`} className="contact-row">
                  <div className="contact-icon-box">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="contact-type">Direct Helpline</span>
                    <strong className="contact-value">{config?.business_phone || '+91 98407 35842'}</strong>
                  </div>
                </a>

                <a
                  href={`https://mail.google.com/mail/?view=cm&to=${config?.business_email || 'Bismillahmulticarservice786@gmail.com'}&su=Car Service Enquiry`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-row"
                >
                  <div className="contact-icon-box">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="contact-type">Email Support</span>
                    <strong className="contact-value">{config?.business_email || 'Bismillahmulticarservice786@gmail.com'}</strong>
                  </div>
                </a>

                <div className="contact-row static">
                  <div className="contact-icon-box">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="contact-type">Business Time</span>
                    <strong className="contact-value">{config?.working_hours || '24/7'}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
