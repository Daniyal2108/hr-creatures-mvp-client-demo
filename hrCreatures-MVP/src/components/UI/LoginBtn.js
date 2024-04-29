import classes from "./LoginBtn.module.css";

const LoginBtn = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${classes.loginBtn} ${props.className}`}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

export default LoginBtn;
