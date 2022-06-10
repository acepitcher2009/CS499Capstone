import express from "express";
import {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animalController.js";
//start express router so routes can be used
const router = express.Router();
//routes to use to create, update, read, or delete objects in the database
router.get("/", getAnimals);
router.post("/", createAnimal);
router.get("/:id", getAnimalById);
router.put("/:id", updateAnimal);
router.delete("/:id", deleteAnimal);

export default router;
