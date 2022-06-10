import express from "express";
import mongoose from "mongoose";
import animalRoutes from "./routes/animalRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//initiates usage of express function for server to run
const app = express();
//allows for objects to be returned in json format
app.use(express.json({ extended: true }));
//route to use when the create, update, read, or delete routes.
app.use("/animals", animalRoutes);
app.use("/users", userRoutes);
// app.use(cors());

const URL =
  "mongodb+srv://admin:superSecure@cluster0.3xvqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
//connect mongoose to the Mongo Atlas DB
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
