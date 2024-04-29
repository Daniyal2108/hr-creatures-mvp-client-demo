import classes from "./Container.module.css";

const Container = (props) => {
  return (
    <div
      className={`absolute top-0 bottom-0 left-0 right-0 m-auto flex flex-col justify-between content-between ${props.className} ${classes.container}`}
    >
      {props.children}
    </div>
  );
};

export default Container;
