import axios from 'axios';

const API_BASE = '/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Public
  getConfig: async () => {
    const res = await client.get('/config');
    return res.data;
  },

  createBooking: async (bookingData) => {
    const res = await client.post('/bookings', bookingData);
    return res.data;
  },

  // Auth
  login: async (credentials) => {
    const res = await client.post('/auth/login', credentials);
    return res.data;
  },

  verifySession: async (token) => {
    const res = await client.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  // Protected Bookings
  getBookings: async (token, params = {}) => {
    const res = await client.get('/bookings', {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return res.data;
  },

  getStats: async (token) => {
    const res = await client.get('/bookings/stats', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  updateStatus: async (token, id, status) => {
    const res = await client.patch(`/bookings/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  deleteBooking: async (token, id) => {
    const res = await client.delete(`/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  // Config management
  updateConfig: async (token, configData) => {
    const res = await client.put('/config', configData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
