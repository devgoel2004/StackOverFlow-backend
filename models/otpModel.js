import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
  name: { type: String },
  email: {
    type: String,
    unique: true,
  },
  otp: { type: String },
  createdAt: Date,
  expiresAt: Date,
});

const OTP = mongoose.model("OTP", OTPSchema);
export default OTP;
