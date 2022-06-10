import { createSlice } from "@reduxjs/toolkit";

//sets the initial state of the authorization
const initialState = {
  animalsInArea: [],
  animals: [],
};

//creates a reducer like normal redux but allows for less code preventing messy files
export const AnimalSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {
    //method used in dispatch calls to set and store animals within an area
    setAnimalsInArea: (state, action) => {
      state.animalsInArea = action.payload;
    },
    setAnimals: (state, action) => {
      state.animals = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAnimalsInArea, setAnimals } = AnimalSlice.actions;

export default AnimalSlice.reducer;
