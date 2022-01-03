import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  functionalityList: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Functionality',
    },
  ],
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
