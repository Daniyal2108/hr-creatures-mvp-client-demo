import classes from "./FileUploadDesign.module.css";
import { FaUpload } from "react-icons/fa";

const FileUploadDesign = (props) => {
  return (
    <div
      className={`${classes.uploadFile} ${props.className}`}
      style={props.style}
    >
      <FaUpload />
      <p>Upload File</p>
    </div>
  );
};

export default FileUploadDesign;
