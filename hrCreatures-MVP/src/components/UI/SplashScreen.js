import classes from "./SplashScreen.module.css";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/slices/auth-slice";
import { useNavigate } from "react-router-dom";

const SplashScreen = (props) => {
  const { userCredentials } = props;
  const [isGreeting, setIsGreeting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const greetingAnimate = setTimeout(() => {
      setIsGreeting(true);
    }, 2000);

    const waitUntilAnimate = setTimeout(() => {
      dispatch(authActions.login(userCredentials));
      navigate("/");
    }, 5000);

    return () => {
      clearTimeout(waitUntilAnimate);
      clearTimeout(greetingAnimate);
    };
  }, [dispatch, setIsGreeting, userCredentials, navigate]);

  return (
    <>
      <Logo
        className={`mx-auto ${classes.creature} ${props.logoClass}`}
        src={props.splashLogo}
        alt="creature image"
      />
      {isGreeting && <h2 className={props.heading2}>{props.greetingText}</h2>}
      {isGreeting && <h3 className={props.heading3}>{props.welcomeText}</h3>}
    </>
  );
};

export default SplashScreen;
