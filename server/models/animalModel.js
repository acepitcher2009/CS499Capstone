import mongoose from "mongoose";
//schema for animals which tells the database what properties to expect
const animalSchema = mongoose.Schema({
  name: String,
  age: Number,
  animalId: Number,
  animaType: String,
  breed: String,
  color: String,
  lat: Number,
  lng: Number,
});

const Animals = mongoose.model("Animals", animalSchema);

export default Animals;
