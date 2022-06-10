import { Link } from "react-router-dom";
import { ListItem, ListItemText } from "@mui/material";
import { forwardRef, useMemo } from "react";

//turn list item for side navbar into a nav link
const NavLink = (props) => {
  const { title, to } = props;

  //initiates link for list item in side nav
  const CustomLink = useMemo(
    () =>
      forwardRef((linkProps, ref) => {
        return <Link ref={ref} to={to} {...linkProps} />;
      }),
    [to]
  );
  return (
    <li key={to}>
      <ListItem button component={CustomLink}>
        <ListItemText primary={title} />
      </ListItem>
    </li>
  );
};
export default NavLink;
