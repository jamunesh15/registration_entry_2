const User = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
    }
    return res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};
