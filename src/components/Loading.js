import classes from "./Loading.module.css";
import image from "../images/loading.gif";

const Loading = () => {
  return <img className={classes.imageLoading} src={image}></img>;
};

export default Loading;
