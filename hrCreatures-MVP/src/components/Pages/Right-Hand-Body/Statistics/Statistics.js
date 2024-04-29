import classes from "./style.module.css";
import ProgressRate from "../../../Widgets/ProgressRate";
import Header from "../../../Layout/Header/Header";
import Container from "../../../Layout/Container";
import HomeSection from "../../../Layout/HomeSection";
import boxData from "./box-data";
import Card from "../../../Layout/Card";
import Dropdown from "../../../UI/Dropdown";
import useFetch from "../../../../Custom-hooks/useFetch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SkeletonLoader from "../../../UI/SkeletonLoader";

const Statistics = (props) => {
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const [days, setDays] = useState("");
  const [{ response, error }, fetchStats] = useFetch(
    `vacancies/statistics${days && `?days=${days}`}`
  );

  useEffect(() => {
    fetchStats({
      method: "GET",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  }, [fetchStats, days, error, userCredentials]);

  const filterStatsResultHandler = (e) => {
    const days = e.target.value;
    setDays(days);
  };

  const progressComponentHelper = boxData.map((data, index) => {
    const updatedData = {
      ...data,
      result:
        (data.title === "Vacancies Posted" &&
        response?.data?.vacanciesPosted === 0
          ? "0"
          : response?.data?.vacanciesPosted) ||
        (data.title === "Candidates Applied" &&
        response?.data?.candidatesApplied === 0
          ? "0"
          : response?.data?.candidatesApplied) ||
        (data.title === "Shortlisted Candidates" &&
        response?.data?.shortlistedCandidates === 0
          ? "0"
          : response?.data?.shortlistedCandidates) ||
        (data.title === "Average Score" && isNaN(response?.data?.averageScore)
          ? "0"
          : response?.data?.averageScore),
    };

    return (
      <ProgressRate
        key={index}
        className={classes.result}
        result={<span>{updatedData.result}</span>}
        resultStyle={{ background: updatedData.style }}
        progressRateContainer={classes.progressBox}
        title={updatedData.title}
        path={updatedData.path}
      />
    );
  });

  return (
    <HomeSection>
      <Container className={`${classes.rightBodyContainer} !block`}>
        <Header
          headerContent={{
            title: "Statistics",
          }}
        />

        <Card className={classes.content}>
          <div
            className={`flex justify-between items-center ${classes.titleBar}`}
          >
            <h3>Stats</h3>
            <Dropdown
              className={classes.dropdown}
              onChange={filterStatsResultHandler}
              dropdownData={
                response?.data?.vacanciesPosted === 0
                  ? []
                  : ["30 days", "60 days", "90 days", "180 days"]
              }
            />
          </div>
          <div className={classes.dashboardContentContainer}>
            {!response?.data ? (
              <SkeletonLoader />
            ) : error ? (
              <p className={classes.error}>{error}</p>
            ) : (
              progressComponentHelper
            )}
          </div>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default Statistics;
