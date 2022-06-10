import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUserCreds } from "../../redux/AuthSlice";

//renders top nav bar
const TopNav = () => {
  const dispatch = useDispatch();

  //handles logout of application
  const handleLogout = () => {
    dispatch(setUserCreds({ email: "", password: "" }));
  };

  return (
    <Box component="nav" sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" sx={{ width: 100 % -"200px", ml: "200px" }}>
        <Toolbar>
          <Button color="inherit" sx={{ flex: 0.25 }} onClick={handleLogout}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default TopNav;
