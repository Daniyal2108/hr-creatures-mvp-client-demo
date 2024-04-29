/* eslint-disable */
import { useState } from "react";

export const useValidate = (inputVal, validation, formSubmitHandler) => {
  const inputTouchedObject = { ...inputVal };
  const inputErrObject = { ...inputVal };
  Object.keys(inputTouchedObject).forEach(
    (item) => (inputTouchedObject[item] = false)
  );
  Object.keys(inputErrObject).forEach((item) => (inputErrObject[item] = ""));

  const [inputs, setInputs] = useState(inputVal);
  const [inputsTouched, setInputsTouched] = useState(inputTouchedObject);
  const [inputsErr, setInputsErr] = useState(inputErrObject);

  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let passRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/g;

  const inputHandler = (e) => {
    const { name, value, type, files } = e.target;

    setInputs((prev) => ({ ...prev, [name]: files ? [...files] : value }));
    setInputsTouched((prev) => ({ ...prev, [name]: true }));
    setInputsErr((prev) => ({ ...prev, [name]: "" }));

    if (validation) {
      if (type === "email") {
        if (value.trim() === "" && inputsTouched[name]) {
          setInputsErr((prev) => ({ ...prev, [name]: "Email Required" }));
        }

        if (value !== "" && !emailRegex.test(value) && inputsTouched[name]) {
          setInputsErr((prev) => ({ ...prev, [name]: "Email must be valid!" }));
        }
      }

      if (type === "password") {
        if (value === "" && inputsTouched[name]) {
          setInputsErr((prev) => ({ ...prev, [name]: "Password Required" }));
        }

        if (value !== "" && !passRegex.test(value) && inputsTouched[name]) {
          setInputsErr((prev) => ({
            ...prev,
            [name]:
              "Password Contain special character, a capital letter and one digit !",
          }));
        }
      }

      if (type !== "email" && type !== "password") {
        if (value === "" && inputsTouched[name]) {
          setInputsErr((prev) => ({ ...prev, [name]: "Field Required!" }));
        }
      }
    }
  };

  const inputTouched = (e) => {
    const { name, type } = e.target;

    setInputsTouched((prev) => ({ ...prev, [name]: true }));

    if (validation) {
      if (type === "email") {
        if (inputs[name].trim() === "") {
          setInputsErr((prev) => ({ ...prev, [name]: "Email Required" }));
        }
      }

      if (type === "password") {
        if (inputs[name] === "") {
          setInputsErr((prev) => ({ ...prev, [name]: "Password Required" }));
        }
      }

      if (type !== "email" && type !== "password") {
        if (inputs[name] === "") {
          setInputsErr((prev) => ({ ...prev, [name]: "Field Required!" }));
        }
      }
    }
  };

  const submit = (e) => {
    e.preventDefault();

    setInputsTouched((prev) => {
      const nextState = {};
      Object.keys(prev).forEach((item) => (nextState[item] = true));
      return nextState;
    });

    setInputsErr((prev) => {
      const nextState = {};
      Object.keys(prev).forEach((key) => (nextState[key] = ""));
      return nextState;
    });

    const submittedValues = { ...inputs };

    if (validation) {
      Object.keys(submittedValues).forEach((key) => {
        if (submittedValues[key] === "") {
          setInputsErr((prev) => ({ ...prev, [key]: "Field Required" }));
          return;
        }
      });
    }

    formSubmitHandler(inputs);
  };

  return {
    inputHandler,
    inputTouched,
    submit,
    inputs,
    inputsErr,
  };
};
