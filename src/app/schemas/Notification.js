import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      requerid: true,
    },
    user: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      requerid: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Notification', NotificationSchema);
