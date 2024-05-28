import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
  
    if (existingUser) {
      const isPasswordInvalid = await bcrypt.compare(
        password,
        existingUser.password
      );
  
      if (isPasswordInvalid) {
        createToken(res, existingUser._id);
        res.status(201).json({
          _id: existingUser._id,
          username: existingUser.username,
          gender: existingUser.gender
        });
        return;
      } else {
        res.status(400);
        throw new Error("Invalid password");
      }
    } else {
      res.status(404);
      throw new Error("Invalid email or password");
    }
});
const logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httyOnly: true,
        expires: new Date(0),
      });
    
      res.status(200).json({ message: "Logged out successfully" });
});
const signup = asyncHandler(async (req, res) => {   
  const { fullName, username, password, gender } = req.body;

  if (!username || !fullName || !password) {
    throw new Error("Please input all fields");
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) res.status(400).send("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    fullName,
    username,
    password: hashedPassword,
    gender,
  });

  try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      gender: newUser.gender,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { login, logout, signup };
