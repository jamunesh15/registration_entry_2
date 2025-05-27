const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { name, email, occupation, department, role } = req.body;

    if (!name || !email || !occupation || !role || !department) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      occupation,
      department,
      role,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
    });

    return res.status(201).json({ success: true, data: user, message: "User created successfully" });
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
