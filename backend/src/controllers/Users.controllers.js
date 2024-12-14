import bcrypt from "bcrypt";
import { User } from "../models/User.models.js";

// Register User
const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    // Validation
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already registered" });
    }

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      fullname,
      username,
      email,
      password,
    });

    // Generate tokens
    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();
    newUser.refreshToken = refreshToken; // Store refresh token in database
    await newUser.save();

    // Set cookies for the tokens
    const cookieOptions = {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "Strict",
    };
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        username: newUser.username,
        rewardPoints: newUser.rewardpoints,
        isPremium: newUser.isPremium,
      },
    });
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
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate new tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Update user with the new refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookies
    const cookieOptions = {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "Strict",
    };
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        totalRewardPoints: user.rewardpoints,
        isPremium: user.isPremium,
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

const upgradeToPremium = async (req, res) => {
  /*
  find and update the user is preminum or not
  user validate */
  try {
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(
      userId,
      { isPremium: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User upgraded to premium successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        isPremium: user.isPremium,
        rewardPoints: user.rewardpoints,
      },
    });
  } catch (error) {
    console.error("Error upgrading to premium:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated and userId is available in `req.user._id`
    const user = await User.findById(userId); // Fetch user from database

    // Map and send the correct response
    res.json({
      user: {
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        rewardPoints: user.rewardpoints,  // Ensure it's properly mapped
        isPremium: user.isPremium,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
};


export {
  registerUser,
  loginUser,
  logoutUser,
  upgradeToPremium,
  getUserProfile,
};