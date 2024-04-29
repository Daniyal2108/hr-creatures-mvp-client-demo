import React from "react";
import Header from "../../../Layout/Header/Header";
import Container from "../../../Layout/Container";
import HomeSection from "../../../Layout/HomeSection";
import classes from "./style.module.css";
import Profile from "./Profile";
import Card from "../../../Layout/Card";
import useFetch from "../../../../Custom-hooks/useFetch";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SkeletonLoader from "../../../UI/SkeletonLoader";

const UserProfile = () => {
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
    <HomeSection>
      <Container className={`${classes.rightBodyContainer}`}>
        <Header
          headerContent={{
            title: "Profile",
          }}
        />

        <Card className={`${classes.content} flex `}>
          <Card className={`${classes.detailsContainer}`}>
            {!response?.data ? (
              <div className={classes.skeleotn}>
                <SkeletonLoader className={classes.skeleton} />
              </div>
            ) : error ? (
              <p className={classes.error}>{error}</p>
            ) : (
              <Profile user={response?.data?.user} />
            )}
          </Card>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default UserProfile;
