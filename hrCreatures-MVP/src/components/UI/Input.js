const Input = (props) => {
  return (
    <div className={props.className} style={props.style}>
      {props?.file ? (
        <input {...props.values} multiple />
      ) : (
        <input {...props.values} />
      )}
      {props.icon}
      {props.children}
    </div>
  );
};

export default Input;
