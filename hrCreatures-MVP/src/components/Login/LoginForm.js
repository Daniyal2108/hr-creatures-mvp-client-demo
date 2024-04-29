/* eslint-disable */
import React from "react";
import { useState, useRef } from "react";
import { useValidate } from "../../Custom-hooks/useValidate";
import { useDispatch } from "react-redux";
import { authActions } from "./../../store/slices/auth-slice";
// import Label from "../UI/Label";
import InputField from "../UI/InputField";
import LoginBtn from "../UI/LoginBtn";
import classes from "./style.module.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { signIn, signUp } from "./Inputs";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const fNameRef = useRef(null);
  const lNameRef = useRef(null);
  const companyRef = useRef(null);
  const designationRef = useRef(null);
  const companyWebRef = useRef(null);
  const contactNoRef = useRef(null);
  const cityRef = useRef(null);
  const refs = {
    email: emailRef,
    password: passRef,
    fName: fNameRef,
    lName: lNameRef,
    company: companyRef,
    designation: designationRef,
    companyWebsite: companyWebRef,
    contactNo: contactNoRef,
    city: cityRef,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inputHandler, inputTouched, submit, inputs, inputsErr } = useValidate(
    {
      email: "",
      password: "",
      fName: "",
      lName: "",
      company: "",
      designation: "",
      companyWebsite: "",
      contactNo: "",
      city: "",
    },
    true,
    (values) => {
      const {
        email,
        password,
        fName,
        lName,
        company,
        designation,
        companyWebsite,
        contactNo,
        city,
      } = values;
      if (!props.isSignUp) {
        if (!email || !password) {
          if (!email) {
            refs.email.current.focus();
          } else if (!password) {
            refs.password.current.focus();
          }
          return;
        }

        dispatch(authActions.getUserInput(values));
      }

      if (props.isSignUp) {
        if (
          !email ||
          !fName ||
          !lName ||
          !company ||
          !designation ||
          !companyWebsite ||
          !contactNo ||
          !city
        ) {
          if (!fName) {
            refs.fName.current.focus();
          } else if (!lName) {
            refs.lName.current.focus();
          } else if (!email) {
            refs.email.current.focus();
          } else if (!company) {
            refs.company.current.focus();
          } else if (!designation) {
            refs.designation.current.focus();
          } else if (!companyWebsite) {
            refs.companyWebsite.current.focus();
          } else if (!contactNo) {
            refs.contactNo.current.focus();
          } else if (!city) {
            refs.city.current.focus();
          }
          return;
        }

        dispatch(authActions.getUserInput(values));
      }
    }
  );

  const [togglePass, setTogglePass] = useState(false);

  const togglePasswordHandler = () => {
    setTogglePass(!togglePass);
  };

  const forgetPassHandler = (e) => {
    navigate("forget-password");
  };

  const signInInputs = signIn.map((val) => ({
    ...val,
    input: {
      ...val.input,
      className: `${classes.input} ${
        inputsErr[val.input.values.name] && classes.invalid
      }`,
      values: {
        ...val.input.values,
        ref: refs[val.input.values.name],
        type:
          val.input.values.name === "password"
            ? !togglePass
              ? "password"
              : "text"
            : "email",
        value: inputs[val.input.values.name],
        onChange: inputHandler,
        onBlur: inputTouched,
      },
      icon:
        val.input.values.name === "password" ? (
          !togglePass ? (
            <FaEyeSlash
              onClick={togglePasswordHandler}
              className={`${classes.passIcon} text-gray-700`}
            />
          ) : (
            <FaEye onClick={togglePasswordHandler} className="text-gray-700" />
          )
        ) : (
          ""
        ),

      error: inputsErr[val.input.values.name] && (
        <p className={classes.errorText}>{inputsErr[val.input.values.name]}</p>
      ),
    },
  }));

  const signUpInputs = signUp.map((val) => ({
    ...val,
    input: {
      ...val.input,
      className: `${classes.input} ${
        inputsErr[val.input.values.name] && classes.invalid
      }`,
      values: {
        ...val.input.values,
        ref: refs[val.input.values.name],
        value: inputs[val.input.values.name],
        onChange: inputHandler,
        onBlur: inputTouched,
      },
      error: inputsErr[val.input.values.name] && (
        <p className={classes.errorText}>{inputsErr[val.input.values.name]}</p>
      ),
    },
  }));

  return (
    <form
      onSubmit={submit}
      className={`${props.className} ${classes.form}`}
      autoComplete="off"
      autoSave="off"
    >
      <div
        className={`flex flex-wrap ${
          !props.isSignUp ? classes.inputsContainer : classes.signUpContainer
        }`}
      >
        {!props.isSignUp
          ? signInInputs.map((inputFieldValue, index) => (
              <InputField {...inputFieldValue} key={index} />
            ))
          : signUpInputs.map((inputFieldValue, index) => (
              <InputField {...inputFieldValue} key={index} />
            ))}
      </div>

      <div className="flex flex-wrap justify-between align-middle ">
        {/* <div className="flex align-middle ">
          <Checkbox
            values={{
              className: classes.checkbox,
              type: "checkbox",
              id: "remember",
              value: "remember",
            }}
          />
          <Label
            properties={{
              className: `${classes.checkboxLabel} ml-1`,
              htmlFor: "remember",
            }}
            value="Rememeber Me"
          />
        </div> */}

        {!props.isSignUp && (
          <p className={`ml-auto`} onClick={forgetPassHandler}>
            Forget Password?
          </p>
        )}
      </div>
      <LoginBtn className={classes.loginBtn}>
        {!props.isSignUp ? "Sign In" : "Sign Up"}
      </LoginBtn>
    </form>
  );
};

export default React.memo(LoginForm);
