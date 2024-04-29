import classes from "./HomeSection.module.css";

const HomeSection = (props) => {
  return (
    <section className={`${props.className} ${classes.homeSection} `}>
      {props.children}
    </section>
  );
};

export default HomeSection;
