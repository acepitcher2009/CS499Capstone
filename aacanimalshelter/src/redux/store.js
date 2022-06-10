import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import AnimalSlice from "./AnimalSlice";
import UserSlice from "./UserSlice";

//sets the redux store and exports the AuthSlice to be used within the project
export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    animal: AnimalSlice,
    users: UserSlice,
  },
});
