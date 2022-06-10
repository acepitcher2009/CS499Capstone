import { Box, Divider, Drawer, List, Toolbar } from "@mui/material";
import NavLink from "./NavLink";
import { navItems } from "./NavItems";

//render side navigation bar
const SideNav = () => {
  return (
    <Box component="nav">
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: "200px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "200px",
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {navItems.map((navItem) => (
            <NavLink key={navItem.to} title={navItem.title} to={navItem.to} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
export default SideNav;
