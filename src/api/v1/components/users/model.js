import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  secretOtp: {
    type: String,
  },
  googleId: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.secretOtp;
  delete userObject.googleId;
  return {
    id: userObject._id,
    ...userObject,
  };
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
