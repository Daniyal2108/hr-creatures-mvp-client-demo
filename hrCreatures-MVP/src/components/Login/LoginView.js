import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import classes from "./style.module.css";
import Card from "../Layout/Card";
import Logo from "../UI/Logo";
import LoginForm from "./LoginForm";
import LoginViewBackground from "./LoginViewBackground";
import Loader from "../UI/Loader";
import SignUp from "./SignUp";
import logo from "../../images/CreatureLogo.png";
import creaturesHeadingImg from "../../images/Creatures-heading.png";

const LoginView = (props) => {
  const userIncorrect = useSelector((state) => state.auth.incorrectUser);
  const [isSignUp, setIsSignUp] = useState(false);
  const { isCreature, loginViewTransition, isAnimate } = props.isAnimate;
  props.onSignUp(isSignUp);
  const { isLoading, loader } = props.isLoading;

  const incorrectUser = userIncorrect && (
    <p className={classes.errorText}>{userIncorrect}</p>
  );
  const loginFormContent = (
    <>
      {isAnimate && (
        <h1 className={`${classes.loginHeading} ${classes.formContent}`}>
          {!isSignUp ? "Sign In" : "Sign Up"}
        </h1>
      )}

      {incorrectUser}
      {isAnimate && (
        <LoginForm className={classes.formContent} isSignUp={isSignUp} />
      )}
    </>
  );

  const isLoginContentShow =
    !isLoading && !loader ? (
      loginFormContent
    ) : (
      <Loader className={classes.loader} />
    );

  const signUpToggleHandler = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <LoginViewBackground
      className={`${classes["login-bg"]} ${
        loginViewTransition && classes["login-bgTransition"]
      } h-full flex flex-col justify-center align-middle relative `}
    >
      <img
        className={`${
          loginViewTransition && classes.bgImg && classes.bgImgRotate
        }`}
        src={props.bgImage}
        alt={"background-img"}
      />
      <Card
        className={`z-10 absolute m-auto text-center flex flex-col align-middle justify-center `}
      >
        {!isLoading && !loader && (
          <>
            <Logo
              className={`mx-auto ${
                loginViewTransition && !isAnimate && classes.creatureHide
              } ${classes.logo} ${isCreature && classes.creatureAnimate} ${
                isAnimate && classes.creature
              }`}
              src={logo}
              alt="logo"
            />
            {!loginViewTransition && (
              <img
                src={creaturesHeadingImg}
                className={classes.creatureImg}
                alt="creature-heading-img"
              />
            )}
          </>
        )}

        {isLoginContentShow}
        {isAnimate && (
          <SignUp
            question={
              isSignUp ? "Already have an account?" : "Don't have an account?"
            }
            account={isSignUp ? "Sign In" : "Sign Up"}
            onSignUp={signUpToggleHandler}
          />
        )}
      </Card>
    </LoginViewBackground>
  );
};

export default React.memo(LoginView);
