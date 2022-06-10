import express from "express";
import mongoose from "mongoose";

import Animals from "../models/animalModel.js";
//starts the express router for the routes to be used
const router = express.Router();

export const getAnimals = async (req, res) => {
  //try block awaits for a status of 200 and returns the animals in json format
  try {
    const animalMessages = await Animals.find();

    res.status(200).json(animalMessages);
    //catch block throws an error with a status of 404 if animal can not be found
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAnimalById = async (req, res) => {
  const { id } = req.params;
  //try block tries to find an animal by the id and returns the object in json format if found
  try {
    const animal = await Animals.findById(id);

    res.status(200).json(animal);
    //catch block returns 404 status and error message if id can not be found
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createAnimal = async (req, res) => {
  const { name, age, animalId, animalType, breed, color, lat, lng } = req.body;

  const newAnimalMessage = new Animals({
    name,
    age,
    animalId,
    animalType,
    breed,
    color,
    lat,
    lng,
  });
  //try block tried to insert a new animal into the database and returns the object added if successful
  try {
    await newAnimalMessage.save();

    res.status(201).json(newAnimalMessage);
    ////catch block throws an error if the object can not be added to the database
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateAnimal = async (req, res) => {
  const { id } = req.params;
  //destructures the props of the animal model
  const { name, age, animalId, animalType, breed, color } = req.body;
  //checks if the id provided is a valid id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No animal with id: ${id}`);
  //sets the updated data to a variable to be passed in the find and update function
  const updatedAnimal = {
    name,
    age,
    animalId,
    animalType,
    breed,
    color,
    _id: id,
  };
  //waits for a response to be returned that the object has been updated
  await Animals.findByIdAndUpdate(id, updatedAnimal, { new: true });
  //return the response in json format
  res.json(updatedAnimal);
};

export const deleteAnimal = async (req, res) => {
  const { id } = req.params;
  //check for a proper id. if id is invalid it returns a 404 not found status message
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  //awaits for the animal to be found, then removes it from the database
  await Animals.findByIdAndRemove(id);
  //return message as json in console
  res.json({ message: "Animal deleted successfully." });
};

export default router;
