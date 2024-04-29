import classes from "./style.module.css";
import ReactQuill from "react-quill";
import "./Quill.css";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import Button from "../../../../../UI/Button";

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ align: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
    ],
  },
};

const formats = [
  "header",
  "font",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "size",
  "align",
  "list",
  "bullet",
  "indent",
];

const JobDescription = (props) => {
  const [value, setValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    props.onDescription(value);
    props.onIsJobDescription();
  };

  return (
    <div className={classes.jobDescription}>
      <h1>Add Job Description</h1>

      <h3>Job Title</h3>
      <h4>UI Design Expert</h4>
      <h2>Type Job Description</h2>

      <div className={classes.quillContainer}>
        <form onSubmit={submitHandler}>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={setValue}
          />
          <Button className={classes.saveBtn} text="Save" />
        </form>
      </div>
    </div>
  );
};

export default JobDescription;
