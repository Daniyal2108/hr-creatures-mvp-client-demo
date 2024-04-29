import classes from "./FileUpload.module.css";
import { FaUpload } from "react-icons/fa";

const FileUpload = (props) => {
  return (
    <div className={classes.uploadFile}>
      <FaUpload />
      <p></p>
    </div>
  );
};

export default FileUpload;
