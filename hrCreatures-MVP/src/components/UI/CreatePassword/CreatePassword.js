import classes from "./CreatePassword.module.css";
import { useState, useEffect } from "react";
import { useValidate } from "../../../Custom-hooks/useValidate";
import { useLocation } from "react-router-dom";
import Card from "../../Layout/Card";
import useFetch from "../../../Custom-hooks/useFetch";
import Form from "./Form";
import Popup from "./Popup";
import { mappingInputs } from "./mapping-inputs";
import SplashScreen from "../SplashScreen";

const CreatePassword = (props) => {
  const location = useLocation();
  const id =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const [togglePass, setTogglePass] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isSplash, setIsSplash] = useState(false);
  const [errorElement, setErrorElement] = useState(false);
  const [{ response, error }, post] = useFetch(
    "users/createPasswordDone",
    (resData) => resData && setLoader(false)
  );
  const { inputHandler, inputTouched, submit, inputs, inputsErr } = useValidate(
    {
      ...props.inputsKeys,
    },
    true,
    (val) => {
      const data = { ...val };
      const keyList = Object.keys(data);
      const isData = keyList.map((key) => data[key] !== "");
      const isDataFalse = isData.find((data) => data === false);
      if (isDataFalse === false) return;
      setErrorElement(false);
      setLoader(true);
      post({
        method: "POST",
        body: JSON.stringify({ ...val, id: id }),
        headers: {
          "content-type": "application/json",
        },
      });
    }
  );

  useEffect(() => {
    if (response?.token) {
      setIsModal(true);
    }
  }, [response, setIsModal]);

  useEffect(() => {
    if (error) {
      setErrorElement(true);
      return;
    }
  }, [error, setErrorElement]);

  const togglePasswordHandler = () => {
    setTogglePass(!togglePass);
  };

  const inputsfun = mappingInputs(
    props.inputs,
    inputsErr,
    togglePass,
    inputs,
    inputHandler,
    inputTouched,
    togglePasswordHandler
  );

  const modalHelper = (
    <Popup
      onBackdrop={() => setIsModal(false)}
      popupBtnText={props.popupBtnText}
      popupText={props.popupText}
      onClose={() => {
        setIsModal(false);
        setIsSplash(true);
      }}
    />
  );

  return (
    <>
      {isModal && modalHelper}
      <section className={`${classes.background} h-full w-full`}>
        <Card className={classes.card}>
          {!isSplash ? (
            <Form
              onSubmit={submit}
              loader={loader}
              errorElement={errorElement}
              error={error}
              inputs={inputsfun}
              btnText={props.btnText}
              logo={props.logo}
            />
          ) : (
            <SplashScreen
              logoClass={classes.creatureAnimate}
              heading2={`${classes.heading2} ${classes.heading2Transition}`}
              heading3={`${classes.heading3} ${classes.heading3Transition}`}
              userCredentials={response || error}
              splashLogo={props.splashLogo}
              userName={props.userName || "DK"}
              welcomeText={
                props.welcomeText || inputsfun.length > 2
                  ? "Congratulation! Your password have been changed successfully"
                  : "Congratulation! Your are the new member of HR Creatures."
              }
              greetingText={
                props.greetingText || "Hi " + response.data.user.firstName
              }
            />
          )}
        </Card>
      </section>
    </>
  );
};

export default CreatePassword;
