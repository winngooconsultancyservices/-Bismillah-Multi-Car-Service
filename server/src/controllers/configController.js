import { Setting } from '../models/Setting.js';

// Default initial config
const DEFAULT_CONFIG = {
  business_whatsapp: process.env.BUSINESS_WHATSAPP_NUMBER || '919840735842',
  business_phone: process.env.BUSINESS_PHONE || '+91 98407 35842',
  business_email: process.env.BUSINESS_EMAIL || 'mohammedazar589@gmail.com',
  working_hours: '24/7',
  service_areas: [
    { id: '1', name: 'Downtown & Central Metro', eta: '30-45 mins', active: true },
    { id: '2', name: 'North Tech Corridor & Suburbs', eta: '30-50 mins', active: true },
    { id: '3', name: 'South Residential District', eta: '35-50 mins', active: true },
    { id: '4', name: 'East Commercial Hub & Tech Park', eta: '30-45 mins', active: true },
    { id: '5', name: 'West Coastal & Airport Zone', eta: '40-60 mins', active: true },
    { id: '6', name: 'Greater Metropolitan Sector', eta: '45-60 mins', active: true },
  ],
  services: [
    {
      id: 'general-service',
      title: 'General Car Service',
      description: 'Comprehensive 40+ point doorstep inspection, fluid top-ups, spark plug clean, filter check & electrical test right at your driveway.',
      badge: 'Most Popular',
      category: 'Periodic Maintenance'
    },
    {
      id: 'oil-change',
      title: 'Oil Change',
      description: 'Engine oil flush & replacement with 100% genuine synthetic engine oil and OEM filter replacement at your parking spot.',
      badge: 'Quick Service',
      category: 'Lubrication'
    },
    {
      id: 'ac-repair',
      title: 'AC Repair & Service',
      description: 'Doorstep AC gas recharge, cooling coil sanitization, cabin filter cleaning, leak detection, and compressor performance check.',
      badge: 'Essential',
      category: 'Climate Control'
    },
    {
      id: 'brake-service',
      title: 'Brake Inspection & Repair',
      description: 'Front & rear brake pads replacement, disc cleaning, brake fluid bleeding, and caliper servicing by certified doorstep mechanics.',
      badge: 'Safety Critical',
      category: 'Safety'
    },
    {
      id: 'battery-replacement',
      title: 'Battery Replacement',
      description: 'On-spot battery health check, terminal grease, instant jump-start, and brand-new battery delivery & installation with warranty.',
      badge: 'Fast Dispatch',
      category: 'Electrical'
    },
    {
      id: 'engine-diagnostics',
      title: 'Engine Diagnostics',
      description: 'OBD-II computer scanner diagnostics, check engine light diagnosis, sensor testing, and full ECU electronic fault report at home.',
      badge: 'Advanced Tech',
      category: 'Diagnostics'
    },
    {
      id: 'car-washing',
      title: 'Car Washing & Cleaning',
      description: 'Eco-friendly waterless pressure wash, deep interior vacuuming, dashboard polishing, and exterior glass treatment without garage visit.',
      badge: 'Doorstep Care',
      category: 'Detailing'
    },
    {
      id: 'breakdown-assistance',
      title: 'Emergency Breakdown Assistance',
      description: 'Rapid doorstep roadside support: puncture repair, jump start, fuel delivery, lock-out help, and on-site minor mechanical fixes.',
      badge: 'Priority Response',
      category: 'Emergency'
    }
  ]
};

// Seed initial default config if missing
export const seedDefaultConfig = async () => {
  try {
    for (const [key, value] of Object.entries(DEFAULT_CONFIG)) {
      const existing = await Setting.findOne({ key });
      if (!existing) {
        await Setting.create({ key, value });
      }
    }
    console.log('[CONFIG] Default business configuration verified');
  } catch (err) {
    console.error('[CONFIG] Error seeding config:', err.message);
  }
};

// GET /api/config - Public
export const getConfig = async (req, res) => {
  try {
    const settings = await Setting.find({});
    const configMap = { ...DEFAULT_CONFIG };

    settings.forEach((s) => {
      configMap[s.key] = s.value;
    });

    return res.json({
      success: true,
      config: configMap,
    });
  } catch (err) {
    console.error('Error fetching config:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch configuration' });
  }
};

// PUT /api/config - Protected: Update business configuration
export const updateConfig = async (req, res) => {
  try {
    const updates = req.body; // e.g. { business_whatsapp, service_areas, business_phone, ... }

    for (const [key, value] of Object.entries(updates)) {
      await Setting.findOneAndUpdate(
        { key },
        { key, value },
        { upsert: true, new: true }
      );
    }

    return res.json({
      success: true,
      message: 'Business configuration updated successfully',
    });
  } catch (err) {
    console.error('Error updating config:', err);
    return res.status(500).json({ success: false, message: 'Failed to update configuration' });
  }
};
