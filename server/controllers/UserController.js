import UserModel from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

// Get a user
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all users
export const getAllUsers = async (req, res) => {

  try {
    let users = await UserModel.find();
    users = users.map((user)=>{
      const {password, ...otherDetails} = user._doc
      return otherDetails
    })
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a user by their phone number -- used when a user clicks "New Chat"
export const getUserByPhoneNumber = async (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  try {
    const user = await UserModel.findOne({ phoneNumber: phoneNumber });
    if (user) {
      const { password, ...otherDetails } = user._doc;

      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWTKEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ otherDetails, token });
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// udpate a user

export const updateUser = async (req, res) => {
  const id = req.params.id;
  // console.log("Data Received", req.body)
  const { _id, currentUserAdmin, password } = req.body;
  
  if (id === _id) {
    try {
      // if we also have to update password then password will be bcrypted again
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      // have to change this
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWTKEY,
        { expiresIn: "1h" }
      );
      console.log({user, token})
      res.status(200).json({user, token});
    } catch (error) {
      console.log("Error agya hy")
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("Access Denied! You can update only your own Account.");
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  // Extracting user ID from authentication middleware
  const currentUserId = req.params.id;

  try {
    // Fetch user information to check for admin status
    const currentUser = await UserModel.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json("User not found");
    }

    // Check if the current user is an admin or owner of the account
    if (currentUser._id.toString() === id || currentUser.isAdmin) {
      await UserModel.findByIdAndDelete(id);
      return res.status(200).json("User Deleted Successfully!");
    } else {
      return res.status(403).json("Access Denied!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};