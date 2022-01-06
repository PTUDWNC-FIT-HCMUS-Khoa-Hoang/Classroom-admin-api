import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Roles from '../../constants/role';

const SALT_ROUNDS = 10;

const accountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Role',
    },
  },
  { timestamps: true }
);

accountSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.secretOtp;
  delete userObject.googleId;
  return userObject;
};

accountSchema.methods.generateToken = function () {
  const account = this;
  const token = jwt.sign(
    {
      data: {
        id: account._id.toString(),
        email: account.email,
        isVerified: account.isVerified,
        role: account.role,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

accountSchema.statics.findByCredentials = async (email, password) => {
  const account = await Account.findOne({ email });

  // no existing email
  if (!account) {
    throw new Error('Email or password is not correct');
  }

  const isMatch = await bcrypt.compare(password, account.password);
  // no matching password
  if (!isMatch) {
    throw new Error('Email or password is not correct');
  }

  return account;
};

accountSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
  next();
});

const Account = mongoose.model('Account', accountSchema);
export default Account;
