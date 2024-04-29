import classes from "./FilesList.module.css";
import { FaFileAlt } from "react-icons/fa";
import Title from "./Title";
import FileBar from "./FileBar";

const FilesList = (props) => {
  return (
    <div className={props.className}>
      <Title title={props.title} />
      <div
        className={`flex justify-start items-center flex-wrap ${classes.files}`}
      >
        {props.files.map((file, index) => (
          <FileBar
            key={index}
            className={`${props.fileClass} ${classes.file}`}
            fileFormat={<FaFileAlt />}
            {...file}
          />
        ))}
      </div>
    </div>
  );
};

export default FilesList;
