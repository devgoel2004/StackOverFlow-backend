import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    // required: true,
  },
  tags: {
    type: [String],
    // required: true,
  },
  score1: {
    type: Number,
    default: 0,
  },

  score2: {
    type: Number,
    default: 0,
  },
  badge: {
    type: String,
    enum: [
      "Newbie",
      "Pupil",
      "Specialist",
      "Expert",
      "Candidate Master",
      "Master",
      "Grand Master",
    ],
    default: "Newbie",
  },
  answerGiven: {
    type: Number,
    default: 0,
  },
  joinedOn: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("User", userSchema);
