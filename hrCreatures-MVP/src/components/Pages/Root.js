import { memo } from "react";
import classes from "./Root.module.css";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Root = (props) => {
  return (
    <>
      <div className={classes.desktopView}>
        <p>Go to Desktop View !</p>
      </div>
      <div className={`h-full flex ${classes.home}`}>
        <Sidebar isLogout={props.isLogout} onLogout={props.onLogout} />
        <Outlet />
      </div>
    </>
  );
};

export default memo(Root);
