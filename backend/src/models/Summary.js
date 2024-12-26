import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, required: true },
});

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;
