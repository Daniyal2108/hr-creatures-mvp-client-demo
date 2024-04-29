import classes from "./Loader.module.css";

const Loader = (props) => {
  return <div className={`${classes.loader} ${props.className}`}></div>;
};

export default Loader;
