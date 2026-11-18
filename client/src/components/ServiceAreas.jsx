import React, { useState } from 'react';
import { MapPin, Search, CheckCircle, Clock, ShieldCheck, Navigation } from 'lucide-react';
import './ServiceAreas.css';

export const ServiceAreas = ({ config }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Default fallback areas if config is still loading
  const defaultAreas = [
    { id: '1', name: 'Downtown & Central Metro', eta: '30-45 mins', active: true },
    { id: '2', name: 'North Tech Corridor & Suburbs', eta: '30-50 mins', active: true },
    { id: '3', name: 'South Residential District', eta: '35-50 mins', active: true },
    { id: '4', name: 'East Commercial Hub & Tech Park', eta: '30-45 mins', active: true },
    { id: '5', name: 'West Coastal & Airport Zone', eta: '40-60 mins', active: true },
    { id: '6', name: 'Greater Metropolitan Sector', eta: '45-60 mins', active: true },
  ];

  const areas = (config && config.service_areas && config.service_areas.length > 0)
    ? config.service_areas
    : defaultAreas;

  const filteredAreas = areas.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <section id="service-areas" className="section-wrapper service-areas-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-pill">
            <MapPin size={14} />
            <span>Configurable Coverage Zones</span>
          </div>
          <h2 className="section-title">Supported Doorstep Service Areas</h2>
          <p className="section-subtitle">
            Our mobile service vans are strategically dispatched across key sectors to ensure 
            rapid technician arrival directly to your residence or workplace.
          </p>
        </div>

        {/* Live Area Search / Check Widget */}
        <div className="area-search-box">
          <div className="search-input-group">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search your area, neighborhood or sector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="clear-search-btn">
                Clear
              </button>
            )}
          </div>
          <span className="search-helper-text">
            All listed locations receive 100% doorstep mechanic visits.
          </span>
        </div>

        {/* Areas Grid */}
        <div className="areas-grid">
          {filteredAreas.length > 0 ? (
            filteredAreas.map((area, idx) => (
              <div key={area.id || idx} className="area-card card-base">
                <div className="area-card-header">
                  <div className="area-marker-box">
                    <Navigation size={20} />
                  </div>
                  <span className="area-status-chip">
                    <CheckCircle size={12} />
                    <span>Doorstep Active</span>
                  </span>
                </div>

                <h3 className="area-name">{area.name}</h3>

                <div className="area-meta">
                  <div className="area-eta">
                    <Clock size={14} className="eta-icon" />
                    <span>Avg. Dispatch ETA: <strong>{area.eta || '30-45 mins'}</strong></span>
                  </div>
                  <div className="area-type">
                    <ShieldCheck size={14} />
                    <span>Home & Office Driveways</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-areas-found">
              <MapPin size={32} />
              <h4>No matching area found in search filter</h4>
              <p>Don't worry! We expand rapidly. Submit your location in the booking form below or WhatsApp our dispatch team to verify coverage.</p>
            </div>
          )}
        </div>

        {/* Coverage Highlights Banner */}
        <div className="coverage-policy-box">
          <div className="policy-item">
            <CheckCircle size={18} className="policy-icon" />
            <div>
              <strong>Private Driveways:</strong> Independent houses & villas
            </div>
          </div>
          <div className="policy-item">
            <CheckCircle size={18} className="policy-icon" />
            <div>
              <strong>Gated Communities:</strong> Basement & surface visitor parking
            </div>
          </div>
          <div className="policy-item">
            <CheckCircle size={18} className="policy-icon" />
            <div>
              <strong>Corporate Parks:</strong> Multi-level office parking spaces
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
