import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import './BookingSuccessModal.css';

export const BookingSuccessModal = ({ bookingResult, onClose }) => {
  if (!bookingResult) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container success-modal-simple" onClick={(e) => e.stopPropagation()}>
        <button className="success-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="success-simple-content">
          <div className="success-icon-box">
            <CheckCircle2 size={52} className="success-main-icon" />
          </div>

          <h3 className="success-title">Your Enquiry Has Been Submitted!</h3>
          <p className="success-desc">
            Thank you for reaching out to Bismillah Multi Car Service. Your doorstep car service enquiry 
            is complete. Our team will get in touch with you shortly.
          </p>

          <button onClick={onClose} className="btn btn-primary success-done-btn">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
