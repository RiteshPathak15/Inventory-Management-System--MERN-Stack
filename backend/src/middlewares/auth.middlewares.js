import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized request. No token provided." });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken?._id) {
      return res
        .status(401)
        .json({ message: "Invalid Access Token. User not found." });
    }

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid Access Token. User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token has expired. Please login again." });
    }

    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid Access Token" });
  }
};

export{verifyJWT}