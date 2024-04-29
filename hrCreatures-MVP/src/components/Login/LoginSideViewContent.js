import React from "react";
import Logo from "../UI/Logo";
import SocialIcons from "./SocialIcons";
import classes from "./style.module.css";
import logo from "../../images/logoWithCreature.png";

const LoginSideViewContent = (props) => {
  return (
    <div
      className={`absolute bottom-0 ${classes.loginSideViewContent} ${
        props.animation && classes.loginSideViewContentTransition
      }`}
    >
      <h1 className="text-black text-3xl font-normal w-4/5">
        <span>Welcome to HR Management System</span>
        <span> By HR Creatures</span>
      </h1>
      <div className={`flex w-full ${classes.footer}`}>
        <div className="w-1/2">
          <Logo
            className="w-3/5 text-white"
            src={logo}
            alt="logo"
            width="100"
          />
        </div>
        <div className="w-1/2 text-black text-right">
          <p className="text-left ">Follow us on:</p>

          <div className={`flex justify-end ${classes.socialIcons}`}>
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LoginSideViewContent);
