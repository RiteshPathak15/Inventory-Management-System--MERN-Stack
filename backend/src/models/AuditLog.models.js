import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  user: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: mongoose.Schema.Types.Mixed, required: true },
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;