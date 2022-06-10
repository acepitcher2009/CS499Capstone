import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserCreds } from "../../redux/AuthSlice";
import logo from "./logo.png";

const Login = () => {
  //allows for the use of a dispatch statement to send data to redux
  const dispatch = useDispatch();
  //pulls data out of redux to be used within the application
  const { email, password } = useSelector((state) => state.auth);

  //event triggered by the sign in button when clicked
  const handleSubmit = (event) => {
    //prevents the propogation of the submit call which only allows for the call to be made once
    event.preventDefault();
    //sets the data variable to the value obtained from the onSubmit call in the form of form data
    const data = new FormData(event.currentTarget);
    //pushes the email and password values to redux for storage and usage throughout the project
    dispatch(
      setUserCreds({ email: data.get("email"), password: data.get("password") })
    );
  };

  //if email and password values are not present the application will render the login page if they are the application will direct to the dashboard page
  if (!email && !password) {
    return (
      <div>
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img style={{ height: "200px" }} alt="logo" src={logo}></img>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </div>
    );
  }
  return <Redirect to="/dashboard" />;
};
export default Login;
