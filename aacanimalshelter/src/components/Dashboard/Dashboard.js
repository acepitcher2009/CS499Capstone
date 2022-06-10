import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import DashboardMap from "./DashboardMap";
import DashboardTable from "./DashboardTable";
import "./Dashboard.css";
import { useEffect } from "react";
import { setAnimals } from "../../redux/AnimalSlice";
import { setUsers } from "../../redux/UserSlice";

const axios = require("axios");

//renders the dashboard page
const Dashboard = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.auth);
  const url = "http://localhost:5000/";

  const getUsersAndAnimals = async () => {
    const animalRes = await axios.get(`${url}animals`);
    const userRes = await axios.get(`${url}users`);
    if (animalRes) {
      dispatch(setAnimals({ animals: [...animalRes.data] }));
    }
    if (userRes) {
      dispatch(setUsers({ users: [...userRes.data] }));
    }
  };

  useEffect(() => {
    getUsersAndAnimals();
  }, []);

  //performs a check if the email and password values then renders the dashboard page otherwise it return back to login page
  if (email && password) {
    return (
      <>
        <DashboardMap />
        <DashboardTable />
      </>
    );
  }
  dispatch(setAnimals({ animals: [] }));
  return <Redirect to="/login" />;
};
export default Dashboard;
