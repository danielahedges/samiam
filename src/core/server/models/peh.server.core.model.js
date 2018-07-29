import mongoose from 'mongoose';

export const PehSchema = mongoose.Schema({
  code: {
    required: true,
    type: String
  },
  firstName: String,
  lastName: String,
  birthDate: String
});

mongoose.model('Peh', PehSchema);
