const Label = (props) => {
  const properties = props.properties;

  return (
    <label {...properties}>
      {props.value} {props.children}
    </label>
  );
};

export default Label;
