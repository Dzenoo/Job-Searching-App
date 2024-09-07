import mongoose from "mongoose";

const NotificationSchemas = new mongoose.Schema({
  data: {
    type: Object,
    default: {},
  },
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
    enum: {
      values: ["jobs", "applications", "reviews", "followers"],
      message: "{VALUE} is not defined",
    },
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

NotificationSchemas.index({ type: 1 });

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchemas);

export default Notification;
