const Logo = (props) => {
  return (
    <img
      className={props.className}
      src={props.src}
      width={props.width}
      style={props.style}
      alt={props.alt}
    />
  );
};

export default Logo;
