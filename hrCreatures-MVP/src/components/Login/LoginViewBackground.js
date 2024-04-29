import React from "react";

const LoginViewBackground = (props) => {
  return (
    <section className={props.className} style={props.style}>
      {props.children}
    </section>
  );
};

export default React.memo(LoginViewBackground);
