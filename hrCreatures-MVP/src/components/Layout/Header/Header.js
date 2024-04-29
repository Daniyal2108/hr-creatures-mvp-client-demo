import { useSelector } from "react-redux";
import classes from "./Header.module.css";
import User from "../../Widgets/User";
import HeaderTitle from "./HeaderTitle";
import Card from "../Card";
import userImg from "../../../images/user.png";
import useFetch from "../../../Custom-hooks/useFetch";
import { useEffect } from "react";
import InstallPWAButton from "../../UI/InstallPWAButton";

const Header = (props) => {
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const [{ response, error }, fetchUser] = useFetch("users/me");

  useEffect(() => {
    fetchUser({
      method: "GET",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  }, [fetchUser, userCredentials]);

  return (
    <Card className={`flex items-center justify-between ${classes.header}`}>
      <HeaderTitle title={props.headerContent.title} />
      <div
        className={`flex items-center justify-between ${props.headerContent.className} ${classes.menuBox}`}
      >
        <InstallPWAButton className={classes.installPWA} />

        {!response?.data ? (
          <p className={`${classes.loading} ${error && classes.error}`}>
            {error || "Loading..."}
          </p>
        ) : (
          <User
            user={{
              userIcon: userImg,
              userName: "Hi! " + response?.data?.user?.firstName,
            }}
            userInfo={true}
            className={classes.user}
          />
        )}
      </div>
    </Card>
  );
};

export default Header;
