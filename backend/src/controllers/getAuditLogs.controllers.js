import AuditLog from '../models/AuditLog.models.js';

const getAuditLogs = async (req, res) => {
  try {
    const auditLogs = await AuditLog.find().sort({ timestamp: -1 });
    res.status(200).json(auditLogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching audit logs', error });
  }
};

export { getAuditLogs };