import classes from "./style.module.css";
import { NavLink } from "react-router-dom";

const SidebarMenu = (props) => {
  return (
    <NavLink
      to={props.path}
      className={({ isActive, isPending }) =>
        isActive ? props.linkActive : isPending ? classes.pending : ""
      }
    >
      <div
        className={`${classes.sidebarLink}  ${props.className} `}
        onClick={props.onCloseSidebar}
      >
        <div className={classes.menuIcon}>{props.icon}</div>
        <p>{props.text}</p>
      </div>
    </NavLink>
  );
};

export default SidebarMenu;
