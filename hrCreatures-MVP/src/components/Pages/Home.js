import { memo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "../../Routes/ErrorPage";
import Login from "../Login/Login";
import remainingPublicRouter from "../../Routes/PublicRouter";
import remainingPrivateRouter from "../../Routes/PrivateRouter";
import classes from "./Home.module.css";
import logo from "../../images/CreatureLogo.png";
import SplashScreen from "../UI/SplashScreen";
import Card from "../Layout/Card";
import CreatePassword from "../UI/CreatePassword/CreatePassword";
import { createPassword } from "../../components/Login/Inputs";

const Home = (props) => {
  const { splash, resData } = props.isSplash;
  const publicRouter = createBrowserRouter([
    {
      path: "/",
      element: splash ? (
        <section className={classes.backgropund}>
          <Card className={classes.card}>
            <SplashScreen
              userCredentials={resData}
              logoClass={classes.creatureAnimate}
              heading2={`${classes.heading2} ${classes.heading2Transition}`}
              heading3={`${classes.heading3} ${classes.heading3Transition}`}
              splashLogo={logo}
              userName={"DK"}
              welcomeText={"Welcome to our HR Creature World !"}
              greetingText={"Hi " + resData?.data?.user?.firstName}
            />
          </Card>
        </section>
      ) : (
        <Login
          isLoading={props.isLoading}
          onSignUp={(signUp) => {
            props.onSignUp(signUp);
          }}
          isAnimate={(animate) => {
            props.isAnimate(animate);
          }}
        />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "create-password/:id",
      element: (
        <CreatePassword
          inputsKeys={{ password: "", passwordConfirm: "" }}
          inputs={createPassword}
          btnText="Create Password"
          popupBtnText="Close"
          popupText={
            createPassword.length > 2
              ? "Password have been changed"
              : "Password have been created."
          }
          logo={logo}
          splashLogo={logo}
        />
      ),
      errorElement: <ErrorPage />,
    },
    ...remainingPublicRouter,
  ]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root isLogout={props.isLogout} onLogout={props.onLogout} />,
      errorElement: <ErrorPage />,
      children: [...remainingPrivateRouter],
    },
  ]);

  return <RouterProvider router={props?.token ? router : publicRouter} />;
};

export default memo(Home);
