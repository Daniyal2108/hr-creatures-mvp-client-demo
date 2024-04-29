import classes from "./CreatePassword.module.css";
import Logo from "../Logo";
import Loader from "../Loader";
import InputField from "../InputField";
import Button from "../Button";

const Form = (props) => {
  return (
    <>
      <Logo
        className={`mx-auto ${classes.creature}`}
        src={props.logo}
        alt="creature image"
      />
      <form onSubmit={props.onSubmit} className={classes.form}>
        {props.loader ? (
          <Loader />
        ) : (
          <>
            {props.errorElement && (
              <p className={classes.error}>{props.error}</p>
            )}
            {props.inputs.map((values, index) => (
              <InputField {...values} key={index} />
            ))}
            <Button className={classes.btn} text={props.btnText} />
          </>
        )}
      </form>
    </>
  );
};

export default Form;
