import { Booking } from '../models/Booking.js';
import { Setting } from '../models/Setting.js';

// Helper to generate unique booking ID
const generateBookingId = () => {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `BMC-${dateStr}-${randomSuffix}`;
};

// Helper to get business WhatsApp number
const getBusinessWhatsApp = async () => {
  try {
    const setting = await Setting.findOne({ key: 'business_whatsapp' });
    if (setting && setting.value) {
      return setting.value.replace(/[^0-9]/g, '');
    }
  } catch (err) {
    console.error('Error fetching whatsapp setting:', err);
  }
  const fallback = process.env.BUSINESS_WHATSAPP_NUMBER || '919840735842';
  return fallback.replace(/[^0-9]/g, '');
};

// Format WhatsApp message
export const formatWhatsAppMessage = (booking) => {
  return [
    `🚗 *BISMILLAH MULTI CAR SERVICE BOOKING*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📌 *Booking ID:* ${booking.bookingId}`,
    `👤 *Customer Name:* ${booking.customerName}`,
    `📞 *Mobile:* ${booking.mobileNumber}`,
    `📍 *Doorstep Address:* ${booking.customerLocation}`,
    `🚘 *Vehicle:* ${booking.carBrand}${booking.carModel ? ` - ${booking.carModel}` : ''}`,
    `🔧 *Required Service:* ${booking.requiredService}`,
    booking.preferredDate ? `📅 *Preferred Date:* ${booking.preferredDate}` : null,
    booking.preferredTime ? `⏰ *Preferred Time:* ${booking.preferredTime}` : null,
    booking.additionalDetails ? `📝 *Notes:* ${booking.additionalDetails}` : null,
    `━━━━━━━━━━━━━━━━━━━━`,
    `⚡ *100% Doorstep Service: Mechanics visit directly to customer location.*`,
    `Please confirm mechanic dispatch and schedule.`
  ].filter(Boolean).join('\n');
};

// POST /api/bookings - Create new doorstep booking
export const createBooking = async (req, res) => {
  try {
    const {
      customerName,
      mobileNumber,
      customerLocation,
      carBrand,
      carModel,
      requiredService,
      preferredDate,
      preferredTime,
      additionalDetails,
    } = req.body;

    // Field validations - mandatory: name, contact, required service, car brand, location
    const errors = [];
    if (!customerName || !customerName.trim()) errors.push('Customer Name is required');
    if (!mobileNumber || !mobileNumber.trim()) errors.push('Mobile / Contact Number is required');
    if (!customerLocation || !customerLocation.trim()) errors.push('Customer Location / Address is required');
    if (!carBrand || !carBrand.trim()) errors.push('Car Brand is required');
    if (!requiredService || !requiredService.trim()) errors.push('Required Service is required');

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields.',
        errors,
      });
    }

    // Generate unique Booking ID
    let bookingId = generateBookingId();
    let idExists = await Booking.findOne({ bookingId });
    while (idExists) {
      bookingId = generateBookingId();
      idExists = await Booking.findOne({ bookingId });
    }

    // Save to MongoDB
    const booking = new Booking({
      bookingId,
      customerName: customerName.trim(),
      mobileNumber: mobileNumber.trim(),
      customerLocation: customerLocation.trim(),
      carBrand: carBrand.trim(),
      carModel: carModel ? carModel.trim() : '',
      requiredService: requiredService.trim(),
      preferredDate: preferredDate || '',
      preferredTime: preferredTime || '',
      additionalDetails: additionalDetails ? additionalDetails.trim() : '',
      status: 'Pending',
    });

    const savedBooking = await booking.save();

    // Generate WhatsApp text and URL
    const targetPhone = await getBusinessWhatsApp();
    const messageText = formatWhatsAppMessage(savedBooking);
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(messageText)}`;

    return res.status(201).json({
      success: true,
      message: 'Doorstep car service booking successfully created!',
      booking: savedBooking,
      bookingId: savedBooking.bookingId,
      whatsappUrl,
      whatsappNumber: targetPhone,
      messageText,
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to save booking. Please try again.',
      error: err.message,
    });
  }
};

// GET /api/bookings - Protected: Get all bookings with filtering & search
export const getBookings = async (req, res) => {
  try {
    const { status, search, limit = 50, page = 1 } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { bookingId: searchRegex },
        { customerName: searchRegex },
        { mobileNumber: searchRegex },
        { carBrand: searchRegex },
        { carModel: searchRegex },
        { customerLocation: searchRegex },
        { requiredService: searchRegex },
      ];
    }

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.json({
      success: true,
      total,
      page: Number(page),
      bookings,
    });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching bookings' });
  }
};

// PATCH /api/bookings/:id/status - Protected: Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    return res.json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking,
    });
  } catch (err) {
    console.error('Error updating status:', err);
    return res.status(500).json({ success: false, message: 'Failed to update booking status' });
  }
};

// DELETE /api/bookings/:id - Protected: Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Booking.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    return res.json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (err) {
    console.error('Error deleting booking:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete booking' });
  }
};

// GET /api/bookings/stats - Protected: Get summary metrics
export const getBookingStats = async (req, res) => {
  try {
    const total = await Booking.countDocuments();
    const pending = await Booking.countDocuments({ status: 'Pending' });
    const confirmed = await Booking.countDocuments({ status: 'Confirmed' });
    const completed = await Booking.countDocuments({ status: 'Completed' });
    const cancelled = await Booking.countDocuments({ status: 'Cancelled' });

    return res.json({
      success: true,
      stats: {
        total,
        pending,
        confirmed,
        completed,
        cancelled,
      },
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
  }
};
