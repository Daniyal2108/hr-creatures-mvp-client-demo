import { Skeleton } from "antd";
import classes from "./SkeletonLoader.module.css";

var SkeletonLoader = (props) => {
  return [1, 2, 3, 4].map((_, i) => (
    <Skeleton
      key={i}
      active
      className={`${classes.skeleton} ${props.className}`}
    />
  ));
};

export default SkeletonLoader;
