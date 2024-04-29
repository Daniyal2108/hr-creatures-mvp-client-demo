import classes from "./style.module.css";
import verify from "../../images/module-verify.svg";

const ModuleName = (props) => {
  return (
    <div
      className={`${classes.moduleName} ${props.className} flex justify-between items-center`}
      onClick={props.onCloseSidebar}
    >
      <h3>Recruitoo</h3>
      <img src={verify} alt="verify" />
    </div>
  );
};

export default ModuleName;
