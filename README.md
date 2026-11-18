# Winngoo Car Service — Professional Car Service at Your Doorstep 🚗🔧

A complete, premium-quality full-stack Home Car Service web application built with **React.js (Vite)**, **Node.js**, **Express.js**, and **MongoDB**.

---

## 🌟 Business Model: 100% Doorstep Car Service

- **Zero Physical Workshops / Showrooms**: There is **NO** physical garage, workshop, or service center.
- **We Come To You**: Certified mobile mechanics visit customers' homes, apartments, private driveways, and corporate office parking lots with mobile workshop vans equipped with 200+ specialized automotive tools and OBD-II computerized scanners.
- **Core Value Proposition**: *"Professional Car Service at Your Doorstep"* — Save 3-4 hours of weekend waiting room downtime, watch repairs happen right before your eyes, and enjoy 100% transparent pricing with genuine OEM spare parts.

---

## 🎨 Design System & Color Palette

Strictly designed according to the automotive brand palette:

| Element | Color Hex | Usage |
| :--- | :--- | :--- |
| **Primary Navy Blue** | `#0B1F3A` | Brand header, titles, deep accents, badges, contrast surfaces |
| **Secondary Blue** | `#0969DA` | Primary CTA buttons, WhatsApp action triggers, links, icons |
| **Background** | `#F4F7FC` | Clean modern automotive backdrop |
| **Light Blue** | `#EAF3FF` | Tag pills, badge containers, highlight cards, modal headers |
| **Text Main** | `#172B4D` | Typography body & headings |
| **White** | `#FFFFFF` | Cards, panels, inputs, pure contrast layers |

> **Strict Rule**: Zero orange, red, or green used anywhere across the entire UI.

---

## 📐 Website Architecture — Single Page Experience

The public customer interface is strictly **ONE SINGLE PAGE** with smooth scrolling to all sections:

1. **Top Banner & Sticky Navbar**:
   - Company Logo (`WINNGOO DOORSTEP CAR SERVICE`)
   - Links: Home, Services, About Us, How It Works, Why Us, Service Areas, Testimonials, Contact
   - "Book Service" CTA button
   - Responsive mobile hamburger drawer
   - Admin Portal shortcut button
2. **Hero Section**:
   - Heading: *"Professional Car Service at Your Doorstep"*
   - Description: *"We bring expert car maintenance and repair services directly to your home or office."*
   - Badges: `100% HOME & OFFICE DOORSTEP SERVICE • No Garages • No Waiting Rooms`
   - CTAs: `Book a Service` (smooth scroll to `#booking`), `Chat on WhatsApp`
   - Visual showcase card featuring certified mobile technicians and live dispatch tags.
3. **Service Highlights**:
   - 4 Pillars: Expert Technicians, Trusted Service, We Come to You, On-Time Service.
4. **Our Services Section (8 Service Cards)**:
   - General Car Service (40+ point checkup)
   - Oil Change (100% synthetic + OEM filter)
   - AC Repair & Service (gas refill & antibacterial flush)
   - Brake Inspection & Repair (pads & rotor servicing)
   - Battery Replacement (jump-start & on-site warranty install)
   - Engine Diagnostics (OBD-II computer scans)
   - Car Washing & Cleaning (waterless & eco-wash)
   - Emergency Breakdown Assistance (rapid mobile technician dispatch)
   - Each card includes interactive *"Learn More"* details modal and *"Book Now"* shortcut that pre-selects the service in the booking form.
5. **About Us Section**:
   - Heading: *"Your Trusted Car Service Partner"*
   - In-depth explanation of the doorstep mechanic model vs traditional garages.
   - 4 Core Pillars: Professional Mechanics, Quality Service, Transparent Pricing, Customer Satisfaction.
6. **How It Works Section**:
   - 4-Step Interactive Timeline:
     - **Step 1**: Book Your Service
     - **Step 2**: We Come to You
     - **Step 3**: Service & Repair
     - **Step 4**: Drive Happy
7. **Why Choose Us Section**:
   - 6 Core Advantages: Experienced Mechanics, Convenient Home Service, Quality Spare Parts, Affordable Pricing, Reliable Support, Customer Satisfaction.
8. **Contact & Booking Section**:
    - Complete doorstep appointment form:
      - Customer Name
      - Mobile Number
      - Customer Location / Address
      - Car Brand (dropdown)
      - Car Model & Year
      - Required Service (dropdown)
      - Preferred Date (min date today)
      - Preferred Time Slot
      - Additional Details
    - Prominent Button: **"Send Booking via WhatsApp"**
9. **Footer**:
    - Brand logo, company overview, quick links, doorstep services, direct helpline, WhatsApp trigger, Admin portal link, and zero-garage disclaimer.

---

## 📲 WhatsApp & Booking Workflow

```
Customer Fills Form
       │
       ▼
1. Client-Side Field Validation
       │
       ▼
2. POST /api/bookings to Node/Express Backend
       │
       ▼
3. MongoDB saves record & generates Unique Booking ID (e.g. WNG-261118-8803)
       │
       ▼
4. Backend formats structured WhatsApp Message & wa.me URL
       │
       ▼
5. Customer receives Feedback Modal with Booking ID & details
       │
       ▼
6. Automatically opens WhatsApp to configured Business Number with formatted message
```

### Formatted WhatsApp Dispatch Message:
```text
🚗 *WINNGOO HOME CAR SERVICE BOOKING*
━━━━━━━━━━━━━━━━━━━━
📌 *Booking ID:* WNG-261118-8803
👤 *Customer Name:* Rahul Sharma
📞 *Mobile:* 9876543210
📍 *Doorstep Address:* Flat 302, Green Meadows, Sector 14
🚘 *Vehicle:* Hyundai - Creta 2021
🔧 *Required Service:* Oil Change
📅 *Preferred Date:* 2026-11-20
⏰ *Preferred Time:* 10:00 AM - 12:00 PM
📝 *Notes:* Synthetic engine oil preferred
━━━━━━━━━━━━━━━━━━━━
⚡ *100% Doorstep Service: Mechanics visit directly to customer location.*
Please confirm mechanic dispatch and schedule.
```

---

## 🛡️ Protected Admin Portal

Accessible via the **Admin Portal** button in the header or footer:
- **Default Credentials**: `admin` / `admin123`
- **JWT Authentication**: Secure Bearer tokens with 7-day expiration.
- **KPI Metrics**: Total Bookings, Pending Dispatch, Confirmed Slots, Completed Services.
- **Live Search & Filter**: Search by customer, phone, car, or unique Booking ID.
- **Status Updates**: 1-click status transitions (`Pending` ➔ `Confirmed` ➔ `Completed` ➔ `Cancelled`).
- **Direct WhatsApp Chat**: 1-click chat with the customer for technician dispatch.
- **Settings Configuration Tab**: Update Business WhatsApp Number, helpline, and manage supported service areas without restarting the server.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v22)
- **MongoDB**: Automatically connects to local MongoDB or seamlessly runs an embedded in-memory database instance if local MongoDB is not installed.

### 2. Backend Setup
```bash
cd server
npm install
npm run dev   # Starts server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev   # Starts Vite dev server on http://localhost:5173
```

---

## 📁 Project Directory Structure

```
├── package.json                   # Root package script runner
├── README.md                      # Comprehensive documentation
├── server/
│   ├── .env                       # Environment variables (PORT, DB URI, JWT, WhatsApp)
│   ├── package.json
│   └── src/
│       ├── config/db.js           # Mongoose DB connector with automated fallback
│       ├── models/
│       │   ├── Booking.js         # Doorstep Booking schema
│       │   ├── Admin.js           # Admin user model with bcrypt
│       │   └── Setting.js         # Dynamic business settings
│       ├── controllers/
│       │   ├── bookingController.js # Booking creation, list, update, stats, WhatsApp formatting
│       │   ├── authController.js    # JWT admin authentication & default seeding
│       │   └── configController.js  # Service areas & WhatsApp number config
│       ├── middleware/auth.js     # JWT Bearer verification
│       ├── routes/
│       │   ├── bookingRoutes.js
│       │   ├── authRoutes.js
│       │   └── configRoutes.js
│       └── index.js               # Express application entrypoint
└── client/
    ├── index.html                 # Single page HTML entry
    ├── vite.config.js             # Vite config with API proxy
    ├── package.json
    └── src/
        ├── App.jsx                # Single page master component
        ├── main.jsx
        ├── utils/api.js           # Axios API service
        ├── styles/index.css       # Unified design tokens & theme styling
        └── components/
            ├── Navbar.jsx         # Sticky navigation & mobile drawer
            ├── Hero.jsx           # Doorstep headline & visual showcase
            ├── ServiceHighlights.jsx # 4 key pillars
            ├── OurServices.jsx    # 8 doorstep service cards + detail modal
            ├── AboutUs.jsx        # Doorstep business model explanation
            ├── HowItWorks.jsx     # 4-step timeline layout
            ├── WhyChooseUs.jsx    # 6 core advantages
            ├── CustomerTestimonials.jsx # Verified customer reviews
            ├── ServiceAreas.jsx   # Dynamic coverage zones & search widget
            ├── BookingSection.jsx # Validated doorstep booking form
            ├── BookingSuccessModal.jsx # Unique Booking ID & WhatsApp link
            ├── Footer.jsx         # Footer & links
            └── AdminPortalModal.jsx # Protected admin management dashboard
```
