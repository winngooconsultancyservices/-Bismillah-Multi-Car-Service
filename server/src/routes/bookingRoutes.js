import express from 'express';
import {
  createBooking,
  getBookings,
  updateBookingStatus,
  deleteBooking,
  getBookingStats,
} from '../controllers/bookingController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public route to book service from homepage
router.post('/', createBooking);

// Protected routes for Admin Portal
router.get('/', requireAuth, getBookings);
router.get('/stats', requireAuth, getBookingStats);
router.patch('/:id/status', requireAuth, updateBookingStatus);
router.delete('/:id', requireAuth, deleteBooking);

export default router;
