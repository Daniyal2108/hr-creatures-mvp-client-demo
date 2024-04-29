import classes from "./style.module.css";
import Card from "../Layout/Card";
import logo from "../../images/CreatureLogo.png";
import Logo from "../UI/Logo";
import InputField from "../UI/InputField";
import { useValidate } from "../../Custom-hooks/useValidate";
import Button from "../UI/Button";
import useFetch from "../../Custom-hooks/useFetch";
import { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import Loader from "../UI/Loader";
import reactDOM from "react-dom";
import { FaCheck } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const inputsProps = [
  {
    className: `text-left w-2/5 mx-auto ${classes.inputField}`,
    label: {
      properties: { className: classes.inputLabel, htmlFor: "email" },
      value: "Email",
    },
    input: {
      values: {
        className: classes.loginInput,
        name: "email",
        type: "email",
        id: "email",
        placeholder: "Enter username or email",
      },
    },
  },
  {
    className: `text-left w-2/5 mx-auto ${classes.inputField}`,
    label: {
      properties: { className: classes.inputLabel, htmlFor: "pass" },
      value: "New Password",
    },
    input: {
      values: {
        className: classes.loginInput,
        name: "password",
        type: "password",
        id: "pass",
        placeholder: "Enter Password Here.",
      },
    },
  },
  {
    className: `text-left w-2/5 mx-auto ${classes.inputField}`,
    label: {
      properties: { className: classes.inputLabel, htmlFor: "cPass" },
      value: "Confrim Password",
    },
    input: {
      values: {
        className: classes.loginInput,
        name: "passwordConfirm",
        type: "password",
        id: "cPass",
        placeholder: "Confirm your Password.",
      },
    },
  },
];

const ForgetPassword = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const passwordURL =
    location.pathname.split("/")[location.pathname.split("/").length - 2];
  const id =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const [isModal, setIsModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [{ response, error }, forgetPass] = useFetch(
    passwordURL === "set-password"
      ? "users/reset-password"
      : "users/forgotPassword"
  );
  const { inputHandler, inputTouched, submit, inputs, inputsErr } = useValidate(
    passwordURL === "set-password"
      ? {
          password: "",
          passwordConfirm: "",
        }
      : {
          email: "",
        },
    true,
    (values) => {
      setLoader(true);
      if (passwordURL !== "set-password") {
        if (!values.email) return;

        forgetPass({
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "content-type": "application/json",
          },
        });
      } else if (passwordURL === "set-password") {
        if (!values.password || !values.passwordConfirm) return;

        forgetPass({
          method: "PATCH",
          body: JSON.stringify({ ...values, id }),
          headers: {
            "content-type": "application/json",
          },
        });
      }

      return;
    }
  );

  useEffect(() => {
    if (response?.message) {
      setLoader(false);
      setIsModal(true);
    } else if (response?.data) {
      setLoader(false);
      setIsModal(true);
    } else if (error) {
      setLoader(false);
    }
  }, [response, error]);

  const inputProperties = inputsProps.map((val) => ({
    ...val,
    input: {
      ...val.input,
      className: `${classes.input} ${
        inputsErr[val.input.values.name] && classes.invalid
      }`,
      values: {
        ...val.input.values,
        value: inputs[val.input.values.name],
        onChange: inputHandler,
        onBlur: inputTouched,
      },
      error: inputsErr[val.input.values.name] && (
        <p className={classes.errorText}>{inputsErr[val.input.values.name]}</p>
      ),
    },
  }));

  const goToLoginPageHandler = () => {
    navigate("/");
  };

  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={() => setIsModal(false)}
      className={classes.modal}
      icon={<FaCheck />}
      children={
        <p>
          {passwordURL === "set-password"
            ? "Password have been reset successfully"
            : "Email have been sent successfully!"}
        </p>
      }
      btn={
        passwordURL === "set-password" ? (
          <Button
            text="Now Login"
            onClick={goToLoginPageHandler}
            className={classes.modalBtn}
          />
        ) : (
          ""
        )
      }
    />,
    document.getElementById("modal")
  );

  return (
    <section className={`${classes.background} h-full w-full`}>
      {isModal && modalHelper}
      <Card className={classes.card}>
        <Logo
          className={`mx-auto ${classes.creature}`}
          src={logo}
          alt="creature-image"
        />
        <form onSubmit={submit} className={classes.forgetPassForm}>
          {loader ? (
            <Loader />
          ) : (
            <>
              {error && <p className={`w-2/5 ${classes.errorMsg}`}>{error}</p>}

              {passwordURL !== "set-password"
                ? inputProperties
                    .slice(0, 1)
                    .map((email, i) => <InputField key={i} {...email} />)
                : inputProperties
                    .slice(1)
                    .map((pass, i) => <InputField key={i} {...pass} />)}

              <Button text="Send" className={classes.sendBtn} />
            </>
          )}
        </form>
      </Card>
    </section>
  );
};

export default ForgetPassword;
