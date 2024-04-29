import React from "react";
import classes from "./style.module.css";
import LoginSideViewContent from "./LoginSideViewContent";
import InstallPWAButton from "../UI/InstallPWAButton";

const LoginSideView = (props) => {
  return (
    <>
      <section className={`${classes.loginSideView}  relative h-full `}>
        <video className={`${classes.bgVideo}`} autoPlay loop muted>
          <source src={props.video} type="video/mp4" />
        </video>

        <InstallPWAButton className={classes.installBtn} />

        <LoginSideViewContent animation={props.isAnimate} />
      </section>
    </>
  );
};

export default React.memo(LoginSideView);
