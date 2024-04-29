import { FaRegBell } from "react-icons/fa";

const Notifications = (props) => {
  return (
    <div className={props.className}>
      <div>{props.notifications}</div>
      <FaRegBell />
    </div>
  );
};

export default Notifications;
