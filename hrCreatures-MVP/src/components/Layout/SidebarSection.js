import classes from "./SidebarSection.module.css";

const SidebarSection = (props) => {
  return <section className={classes.sidebar}>{props.children}</section>;
};

export default SidebarSection;
