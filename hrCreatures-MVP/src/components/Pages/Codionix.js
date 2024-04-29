/* eslint-disable */
import reactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { authActions } from "../../store/slices/auth-slice";
import { userCredentialsActions } from "../../store/slices/userCredentials-slice";
import useFetch from "../../Custom-hooks/useFetch";
import Home from "./Home";
import classes from "./Codionix.module.css";
import Modal from "../UI/Modal";
import { FaCheck } from "react-icons/fa";
import GoToDesktopView from "../UI/GoToDesktopView";

const Codionix = (props) => {
  const { origin } = window.location;
  const auth = useSelector((state) => state.auth.auth);
  const isUserSubmitted = useSelector(
    (state) => state.auth.isUserInputSubmitted
  );
  const user = useSelector((state) => state.auth.user);
  const userInput = useSelector((state) => state.auth.userInput);
  const isLoading = useSelector((state) => state.auth.loader);
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const [isSignUp, setIsSignUp] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [splash, setSplash] = useState({ splash: false, resData: "" });
  const dispatch = useDispatch();
  const [{ response, error }, doFetch] = useFetch(
    !isSignUp ? "users/login" : "users/signup",
    (resData) => {
      if (isSignUp) {
        (resData?.message || error) && setIsModal(true);
        dispatch(authActions.signUp());
        return;
      }

      if (resData?.message || resData?.data) {
        setSplash((prev) => ({ ...prev, splash: true, resData }));
        // dispatch(authActions.login(resData));
        setTimeout(() => {
          setSplash((prev) => ({ ...prev, splash: false, resData }));
        }, 7000);
      }
    }
  );
  const [{ response: logoutRes, error: logoutError }, doLogout] =
    useFetch("users/logout");

  console.log(loader, isLoading);

  useEffect(() => {
    if (error) {
      dispatch(authActions.login(error));
      dispatch(authActions.signUp());
      setLoader(false);
    }
  }, [error, authActions, dispatch, setLoader]);

  useEffect(() => {
    if (isUserSubmitted) {
      let userInputData;
      if (!isSignUp) {
        const { email, password } = userInput;
        userInputData = {
          email,
          password,
        };
      }

      if (isSignUp) {
        const {
          email,
          password,
          fName: firstName,
          lName: lastName,
          company,
          designation,
          companyWebsite,
          contactNo,
          city,
        } = userInput;
        userInputData = {
          email,
          password,
          firstName,
          lastName,
          company,
          designation,
          companyWebsite,
          contactNo,
          city,
          baseOrigin: origin,
        };
      }
      doFetch({
        method: "POST",
        body: JSON.stringify(userInputData),
        headers: {
          "content-type": "application/json",
        },
      });
    }
  }, [isUserSubmitted, isSignUp, userInput, doFetch, dispatch, setLoader]);

  useEffect(() => {
    let loaderTimeOut;

    if (animate && (isSignUp || !isSignUp)) {
      setLoader(true);
      loaderTimeOut = setTimeout(() => {
        setLoader(false);
      }, 1000);
    }

    return () => clearTimeout(loaderTimeOut);
  }, [isSignUp, animate, setLoader]);

  useEffect(() => {
    if (auth) {
      dispatch(userCredentialsActions.userCredentialsReducer(user));
    }
  }, [auth, dispatch, user]);

  useEffect(() => {
    if (logoutRes?.status) {
      dispatch(authActions.logout());
      dispatch(
        userCredentialsActions.userCredentialsReducer(localStorage.clear())
      );
    }
  }, [logoutRes]);

  const logoutHandler = async () => {
    await doLogout({
      method: "POST",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  };

  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={() => setIsModal(false)}
      className={classes.modal}
      icon={<FaCheck />}
      children={
        <p>{error || "Verification Link Has Been Sent To Your Email"}</p>
      }
    />,
    document.getElementById("modal")
  );

  return (
    <>
      {isModal && modalHelper}
      <GoToDesktopView />
      <div className={`w-full h-full ${classes.mbileView}`}>
        <Home
          isLogout={logoutRes?.status}
          token={userCredentials?.token}
          isLoading={{ isLoading, loader }}
          isSplash={splash}
          onSignUp={(signUp) => {
            setIsSignUp(signUp);
          }}
          isAnimate={(animate) => {
            setAnimate(animate);
          }}
          onLogout={logoutHandler}
        />
      </div>
    </>
  );
};

export default Codionix;
