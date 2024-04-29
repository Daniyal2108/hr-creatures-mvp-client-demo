import classes from "./style.module.css";
import HomeSection from "../../Layout/HomeSection";
import Card from "../../Layout/Card";
import Button from "../../UI/Button";
import useFetch from "../../../Custom-hooks/useFetch";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVacancyId } from "../../../store/slices/candidate-form-slice";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../../UI/SkeletonLoader";

const CandidateForm = (props) => {
  const navigate = useNavigate();
  const id = useSelector((state) => state.candidateVacancy.vacancyId);
  const dispatch = useDispatch();
  const location = useLocation();

  const vacancyId =
    location.pathname.trim().split("/")[
      location.pathname.trim().split("/").length - 1
    ] === ""
      ? location.pathname.trim().split("/")[
          location.pathname.trim().split("/").length - 2
        ]
      : location.pathname.trim().split("/")[
          location.pathname.trim().split("/").length - 1
        ];

  const [{ response, error }, fetchVacancyData] = useFetch(
    `vacancies/${vacancyId}`
  );

  useEffect(() => {
    if (vacancyId) {
      dispatch(getVacancyId(vacancyId));
    }
  }, [dispatch, vacancyId]);

  useEffect(() => {
    fetchVacancyData();
  }, [fetchVacancyData]);

  const gotToFormHandler = () => {
    if (response?.data) {
      navigate(`/vacancy/${response?.data?.vacancyTemplate?.name}/${id}/form`);
    }
  };

  return (
    <HomeSection className={classes.homeSection}>
      <Card className={`${classes.content} flex flex-col justify-between`}>
        {!error && !response?.data ? (
          <SkeletonLoader />
        ) : error ? (
          <p className={classes.errorMsg}>{error}</p>
        ) : (
          <>
            <div>
              <p className={classes.createdAt}>
                Created Date: {response?.data?.createdAt}
              </p>
              <h2 className={classes.vacancyName}>
                {response?.data?.vacancyTemplate?.name}
              </h2>
              <h3 className={classes.alltitles}>Department</h3>
              <p className={classes.allTitleData}>
                {response?.data?.vacancyTemplate?.department?.name}
              </p>
              <h3 className={classes.alltitles}>No. Of Vacancies</h3>
              <p className={classes.allTitleData}>
                {response?.data?.vacancyTemplate?.noOfVacancies}
              </p>
              <h3 className={classes.alltitles}>Job Description</h3>
              <div>
                {parse(`${response?.data?.vacancyTemplate?.jobDescription}`)}
              </div>
            </div>
            <div
              className={`${classes.documentFooter} flex justify-start items-center
          `}
            >
              <div className={classes.footerDetail}>
                <h3>Salary Range</h3>
                <p>{`${response?.data?.vacancyTemplate?.salaryRangeFrom} - ${response?.data?.vacancyTemplate?.salaryRangeTo}`}</p>
              </div>
              <div className={classes.footerDetail}>
                <h3>Last Date Of Apply</h3>
                <p>{response?.data?.lastDateOfApply}</p>
              </div>
              <div className={classes.footerDetail}>
                <h3>Joining Date</h3>
                <p>{response?.data?.joiningDate}</p>
              </div>
            </div>

            <Button
              className={classes.applyNowBtn}
              onClick={gotToFormHandler}
              text="Apply Now"
            />
          </>
        )}
      </Card>
    </HomeSection>
  );
};

export default CandidateForm;
