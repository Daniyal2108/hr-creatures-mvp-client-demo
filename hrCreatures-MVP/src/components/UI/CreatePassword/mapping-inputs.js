import { FaEyeSlash, FaEye } from "react-icons/fa";
import classes from "./CreatePassword.module.css";

const mappingInputs = (
  inputs,
  error,
  togglePass,
  inputKeys,
  inputHandler,
  inputTouched,
  togglePasswordHandler
) =>
  inputs.map((val) => ({
    ...val,
    input: {
      ...val.input,
      className: `${classes.input} ${
        error[val.input.values.name] && classes.invalid
      }`,
      values: {
        ...val.input.values,
        type: !togglePass ? "password" : "text",
        value: inputKeys[val.input.values.name],
        onChange: inputHandler,
        onBlur: inputTouched,
      },
      icon: !togglePass ? (
        <FaEyeSlash
          onClick={togglePasswordHandler}
          className={`${classes.passIcon} text-gray-700`}
        />
      ) : (
        <FaEye onClick={togglePasswordHandler} className="text-gray-700" />
      ),

      error: error[val.input.values.name] && (
        <p className={classes.errorText}>{error[val.input.values.name]}</p>
      ),
    },
  }));

export { mappingInputs };
