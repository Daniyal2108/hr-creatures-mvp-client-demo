const Button = (props) => {
  return (
    <button
      id={props.id}
      className={props.className}
      style={props.style}
      onClick={props.onClick}
      type={props.type}
    >
      {props.svg && props.svg}
      {props.btnImg && <img src={props.btnImg} alt={props.btnAlt} />}
      {props.text}
    </button>
  );
};

export default Button;
