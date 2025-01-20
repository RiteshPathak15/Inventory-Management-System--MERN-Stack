import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { User } from "../models/User.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import dotenv from "dotenv";
dotenv.config();

// Register User
const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    const avatarFile = req.file;
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already registered" });
    }

    let avatarUrl = "";
    if (avatarFile) {
      const uploadResult = await uploadOnCloudinary(avatarFile.path);
      avatarUrl = uploadResult.url;
    }
    const newUser = new User({
      fullname,
      username,
      email,
      password,
      avatar: avatarUrl,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error with registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


// Login User
const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validation
    if (!email && !username) {
      return res.status(400).json({ message: "Email or username is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate new tokens
    const accessToken = jwt.sign(
      {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" }
    );
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
    );

    // Update user with the new refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Login successful",
      token: accessToken, // Sending the access token in response
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Logout User
const logoutUser = async (req, res) => {
  try {
    // Clear refresh token from the database
    await User.findByIdAndUpdate(
      req.user._id,
      { refreshToken: null }, // Keep null instead of deletion
      { new: true }
    );

    // Clear cookies
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true, // Set true in production
        sameSite: "Strict",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true, // Set true in production
        sameSite: "Strict",
      })
      .status(200)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error in logoutUser:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated and userId is available in req.user._id
    const user = await User.findById(userId).select("-password -refreshToken"); // Fetch user from database
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
};

// Update User Avatar
const updateUserAvatar = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated and userId is available in req.user._id
    const avatarFile = req.file;

    if (!avatarFile) {
      return res.status(400).json({ message: "Avatar file is required" });
    }

    const uploadResult = await uploadOnCloudinary(avatarFile.path);
    const avatarUrl = uploadResult.url;

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true }
    ).select("-password -refreshToken");
    res.json({ message: "Avatar updated successfully", user });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ message: "Error updating avatar", error });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const employees = await User.find({ role: "employee" }).select(
      "fullname email username"
    );
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees" });
  }
};
    
// Update User Profile
const updateUserProfile = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const userId = req.user._id;

    const updatedData = { fullname, email };
    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password -refreshToken");
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

// Export controllers
export { registerUser, loginUser, logoutUser, getUserProfile, updateUserAvatar, getAllEmployees, updateUserProfile };
