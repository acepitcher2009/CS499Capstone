import express from "express";
import mongoose from "mongoose";

import Users from "../models/userModel.js";
//starts the express router for the routes to be used
const router = express.Router();

export const getUsers = async (req, res) => {
  //try block awaits for a status of 200 and returns the Users in json format
  try {
    const userMessages = await Users.find();

    res.status(200).json(userMessages);
    //catch block throws an error with a status of 404 if user can not be found
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  //try block tries to find an user by the id and returns the object in json format if found
  try {
    const user = await Users.findById(id);

    res.status(200).json(user);
    //catch block returns 404 status and error message if id can not be found
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, role, email } = req.body;

  const newUserMessage = new Users({ name, role, email });
  //try block tried to insert a new user into the database and returns the object added if successful
  try {
    await newUserMessage.save();

    res.status(201).json(newUserMessage);
    ////catch block throws an error if the object can not be added to the database
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  //destructures the props of the user model
  const { name, role, email } = req.body;
  //checks if the id provided is a valid id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);
  //sets the updated data to a variable to be passed in the find and update function
  const updatedUser = { name, role, email, _id: id };
  //waits for a response to be returned that the object has been updated
  await Users.findByIdAndUpdate(id, updatedUser, { new: true });
  //return the response in json format
  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  //check for a proper id. if id is invalid it returns a 404 not found status message
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);
  //awaits for the user to be found, then removes it from the database
  await Users.findByIdAndRemove(id);
  //return message as json in console
  res.json({ message: "User deleted successfully." });
};

export default router;
