import { createSlice } from "@reduxjs/toolkit";

//sets the initial state of the authorization
const initialState = {
  email: "",
  password: "",
};

//creates a reducer like normal redux but allows for less code preventing messy files
export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //method used in dispatch calls to set the values of the email and password variable for global scope usage
    setUserCreds: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserCreds } = AuthSlice.actions;

export default AuthSlice.reducer;
