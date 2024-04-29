import classes from "./style.module.css";
import HomeSection from "../../../../../Layout/HomeSection";
import Container from "../../../../../Layout/Container";
import Header from "../../../../../Layout/Header/Header";
import Card from "../../../../../Layout/Card";
import useFetch from "../../../../../../Custom-hooks/useFetch";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SkeletonLoader from "../../../../../UI/SkeletonLoader";

const Screened = (props) => {
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const viewVacancyId = useSelector((state) => state.viewVacancy.vacancyId);

  const [{ response, error }, fetchScreened] = useFetch(
    `vacancies/${viewVacancyId}`
  );

  const totalCandidates =
    response?.data?.selected?.length + response?.data?.rejected?.length;
  const screenRatio = isNaN(response?.data?.selected?.length / totalCandidates)
    ? 0
    : (response?.data?.selected?.length / totalCandidates) * 100;

  useEffect(() => {
    fetchScreened({
      method: "GET",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  }, [fetchScreened, userCredentials]);

  return (
    <HomeSection>
      <Container className={`${classes.rightBodyContainer} !block`}>
        <Header
          headerContent={{
            title: "Screened",
          }}
        />

        <Card className={classes.ratioHeader}>
          <h3>
            Total Applications
            <span
              className={`${error && classes.h3Error} ${
                !response?.data ? classes.loadingText : ""
              }`}
            >
              {!response?.data
                ? "Loading..."
                : error
                ? error
                : response?.data?.selected?.length +
                  response?.data?.rejected?.length}
            </span>
          </h3>
          <h3>
            Screen Ratio
            <span
              className={`${error && classes.screenRatioError} ${
                !response?.data ? classes.loadingText : ""
              }`}
            >{`${
              !response?.data ? "Loading..." : error ? error : screenRatio + "%"
            }`}</span>
          </h3>
        </Card>

        <Card className={classes.content}>
          {!response?.data ? (
            <SkeletonLoader />
          ) : error ? (
            <p className={classes.error}>{error}</p>
          ) : (
            <>
              <div
                className={`flex justify-between items-center absolute m-auto top-0 bottom-0 left-0 right-0 w-1/2 ${classes.screeningResultContainer}`}
              >
                <Link to={"selected"}>
                  <div className={classes.screeningResult}>
                    <h2>
                      Selected <span>{response?.data?.selected?.length}</span>
                    </h2>
                  </div>
                </Link>
                <Link to={"rejected"}>
                  <div className={classes.screeningResult}>
                    <h2>
                      Rejected <span>{response?.data?.rejected?.length}</span>
                    </h2>
                  </div>
                </Link>
              </div>
            </>
          )}
        </Card>
      </Container>
    </HomeSection>
  );
};

export default Screened;
