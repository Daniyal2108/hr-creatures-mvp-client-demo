import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const HeaderTitle = (props) => {
  const navigate = useNavigate();
  const path = window.location.pathname.split("/");
  const isBackButton = path.length >= 3;

  const goBackPageHandler = () => {
    navigate(-1);
  };

  return (
    <div className={classes.title}>
      {isBackButton && <FaRegArrowAltCircleLeft onClick={goBackPageHandler} />}
      <h2 className={props.className}>{props.title}</h2>
    </div>
  );
};

export default HeaderTitle;
