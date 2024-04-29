import { Link } from "react-router-dom";
import classes from "./User.module.css";

const User = (props) => {
  const { userIcon, userName, userDesignation } = props.user;
  const user = userName.split("!")[userName.split("!").length - 1];
  return (
    <div
      className={`${classes.user} ${props.className} flex justify-between items-center`}
    >
      <Link
        to={`/profile/${user}/`}
        className=" flex flex-row-reverse items-center justify-center gap-2"
      >
        <img src={userIcon} alt="user-icon" />
        {props.userInfo && (
          <div className="flex flex-col">
            <p>{userName}</p>
            {userDesignation && <small>{userDesignation}</small>}
          </div>
        )}
      </Link>
    </div>
  );
};

export default User;
