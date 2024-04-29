import classes from "./FileBar.module.css";
import { FaRegEye, FaDownload } from "react-icons/fa";

const FileBar = (props) => {
  return (
    <div className={`${classes.container} ${props.className}`}>
      <h3>{props.fileFormat}</h3>
      <div className="flex flex-col">
        <p>{props.fileName}</p>
        <small>{props.fileSize}</small>
      </div>
      {props.isEvents && (
        <>
          <FaRegEye className={`${classes.eye} ${props.eyeClass}`} />
          <FaDownload />
        </>
      )}
    </div>
  );
};

export default FileBar;
