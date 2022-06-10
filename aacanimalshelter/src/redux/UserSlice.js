import { createSlice } from "@reduxjs/toolkit";

//sets the initial state of the authorization
const initialState = {
  users: [],
};

//creates a reducer like normal redux but allows for less code preventing messy files
export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //method used in dispatch calls to set and store animals within an area
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers } = UserSlice.actions;

export default UserSlice.reducer;
