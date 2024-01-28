import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      required: [true, "Sender must be defined"],
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      required: [true, "Receiver must be defined"],
    },
    content: {
      type: String,
      minlength: [3, "Message cannot be empty"],
      maxlength: [300, "Message cannot be longer"],
      required: [true, "Message cannot be empty"],
    },
  },
  { timestamps: true }
);
const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;
