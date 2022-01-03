import mongoose from 'mongoose';

const functionalitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
});

functionalitySchema.index({ title: 1 });

const Functionality = mongoose.model('Functionality', functionalitySchema);

export default Functionality;
