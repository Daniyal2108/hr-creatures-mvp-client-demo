const Anchor = (props) => {
  return (
    <a {...props.attr}>
      {props.children} {props.icon}
    </a>
  );
};

export default Anchor;
