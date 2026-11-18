import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    customerLocation: {
      type: String,
      required: [true, 'Doorstep location / address is required'],
      trim: true,
    },
    carBrand: {
      type: String,
      required: [true, 'Car brand is required'],
      trim: true,
    },
    carModel: {
      type: String,
      trim: true,
      default: '',
    },
    requiredService: {
      type: String,
      required: [true, 'Required service is required'],
      trim: true,
    },
    preferredDate: {
      type: String,
      default: '',
    },
    preferredTime: {
      type: String,
      default: '',
    },
    additionalDetails: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    source: {
      type: String,
      default: 'Doorstep Web Booking',
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model('Booking', bookingSchema);
