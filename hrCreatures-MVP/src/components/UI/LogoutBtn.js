import classes from "./LogoutBtn.module.css";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutBtn = (props) => {
  return (
    <button
      onClick={props.onLogout}
      className={`${classes.logoutBtn} ${props.className}`}
    >
      <div className={`${classes.logoutImg} ${props.logoutImgClass}`}>
        <FaSignOutAlt />
      </div>
      <h3>Logout</h3>
    </button>
  );
};

export default LogoutBtn;
