import React from "react";

const Textarea = (props) => {
  return <textarea {...props.textarea}>{props.children}</textarea>;
};

export default Textarea;
