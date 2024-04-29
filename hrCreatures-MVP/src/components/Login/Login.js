import React from "react";
import { useState, useEffect } from "react";
import LoginView from "./LoginView";
import LoginSideView from "./LoginSideView";
import classes from "./style.module.css";
import useFetch from "../../Custom-hooks/useFetch";
import SkeletonLoader from "../UI/SkeletonLoader";

const Login = (props) => {
  const [{ response, error }, fetchAssets] = useFetch("image/keys");
  const [animation, setAnimation] = useState({
    isCreature: false,
    loginViewTransition: false,
    isAnimate: false,
  });
  const { isAnimate } = animation;
  props.isAnimate(isAnimate);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  useEffect(() => {
    let creatureTimeOut = setTimeout(() => {
      setAnimation((prev) => {
        return {
          ...prev,
          isCreature: true,
        };
      });
    }, 1000);

    let loginViewTimeout = setTimeout(() => {
      setAnimation((prev) => {
        return {
          ...prev,
          loginViewTransition: true,
          isCreature: false,
        };
      });
    }, 4000);

    let animateTimeout = setTimeout(() => {
      setAnimation((prev) => {
        return {
          ...prev,
          isAnimate: true,
        };
      });
    }, 5000);

    return () => {
      clearTimeout(creatureTimeOut);
      clearTimeout(loginViewTimeout);
      clearTimeout(animateTimeout);
    };
  }, []);

  return (
    <div
      className={`${classes.loginPageContainer} flex flex-row flex-wrap h-full`}
    >
      {!response?.data ? (
        <SkeletonLoader />
      ) : error ? (
        <p className={classes.error}>{error}</p>
      ) : (
        <>
          <LoginView
            bgImage={response?.data?.image}
            isAnimate={animation}
            isLoading={props.isLoading}
            onSignUp={(isSignUp) => {
              props.onSignUp(isSignUp);
            }}
          />
          {animation.loginViewTransition && (
            <LoginSideView
              video={response?.data?.video}
              isAnimate={animation.isAnimate}
            />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(Login);
