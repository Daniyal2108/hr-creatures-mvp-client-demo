import classes from "./ProgressRate.module.css";
import { Link } from "react-router-dom";

const ProgressRate = (props) => {
  return (
    <Link
      to={props.path}
      className={`${props.progressRateContainer} ${classes.progressRate}`}
      style={props.style}
    >
      <h3 className="flex justify-center items-center">
        {props.svg && (
          <span onClick={props.onSvg} id={props.svgId}>
            {props.svg}
          </span>
        )}
        {props.title}
      </h3>
      <div className={`flex justify-between ${props.className}`}>
        {props.result && (
          <p
            id={props.resultId}
            onClick={props.onResult}
            style={props.resultStyle}
          >
            {props.result}
          </p>
        )}
        {props.extraResult}
        <img src={props.src} alt={props.alt} className="ml-auto" />
      </div>
    </Link>
  );
};

export default ProgressRate;
