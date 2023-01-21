import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provided unique username'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobile: { type: Number },
    address: { type: String },
    profile: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
