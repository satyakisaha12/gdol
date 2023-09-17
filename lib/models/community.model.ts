import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true, // Remove leading/trailing spaces
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "", 
  },
  bio: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  gdol: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

communitySchema.index({ username: 1 }, { unique: true });

const Community =
  mongoose.models.Community || mongoose.model("Community", communitySchema);

export default Community;
