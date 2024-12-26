import Activity from '../models/Activity.js';

export const getActivityLogs = async (req, res) => {
  try {
    const activities = await Activity.find().populate('user', 'fullname email');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity logs', error });
  }
};
