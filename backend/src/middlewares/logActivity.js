import Activity from '../models/Activity.js';

export const logActivity = (action, targetType) => {
  return async (req, res, next) => {
    try {
      const activity = new Activity({
        user: req.user._id,
        action,
        target: req.params.id || req.body._id, // Assuming ID is in params or body
        targetType,
      });
      await activity.save();
      next();
    } catch (error) {
      console.error("Error logging activity:", error);
      next(error);
    }
  };
};
