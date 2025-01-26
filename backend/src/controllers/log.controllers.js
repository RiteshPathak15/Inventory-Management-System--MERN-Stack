import Log from "../models/Log.models.js";

const getLogs = async (req, res) => {
  try {
    const logs = await Log.find().populate("userId", "fullname username");
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs", error });
  }
};

export { getLogs };