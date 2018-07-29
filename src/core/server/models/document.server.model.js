import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  pehid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  filename: String,
  docType: String,
  format: String,
  base64: String,
  status: String,
  binarySize: Number
});

mongoose.model('Document', DocumentSchema);
