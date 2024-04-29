import classes from "./style.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../../../../../Custom-hooks/useFetch";
import HomeSection from "../../../../../Layout/HomeSection";
import Card from "../../../../../Layout/Card";
import RadioBtn from "../../../../../UI/RadioBtn";
import Button from "../../../../../UI/Button";
import Header from "../../../../../Layout/Header/Header";
import Container from "../../../../../Layout/Container";
import SkeletonLoader from "../../../../../UI/SkeletonLoader";

const ShowTest = (props) => {
  const id = useSelector((state) => state.candidateVacancy.vacancyId);

  const [{ response, error }, fetchVacancyData] = useFetch(`vacancies/${id}`);

  useEffect(() => {
    fetchVacancyData();
  }, [fetchVacancyData]);

  const radioBtns = response?.data?.questionaireTemplate?.questions?.map(
    (question, i) => {
      return {
        ...question,
        options: question?.options?.map((option) => ({
          input: {
            values: {
              type: "radio",
              id: i,
              name: `question${i}`,
            },
          },
          label: {
            value: option,
          },
        })),
      };
    }
  );

  const submitTestHandler = () => {
    console.log("submitted");
  };

  return (
    <HomeSection className={classes.homeSection}>
      <Container className={`${classes.rightBodyContainer}`}>
        <Header
          headerContent={{
            title: "Candidate Form",
          }}
        />
        <Card className={classes.content}>
          <h3>Answer These Questions</h3>

          {!response?.data && !error ? (
            <SkeletonLoader />
          ) : error ? (
            <p className={classes.error}>{error}</p>
          ) : (
            <>
              {radioBtns?.map((question, i) => (
                <div key={i} className={classes.questions}>
                  <div
                    className={`flex justify-start ${classes.questionContainer}`}
                  >
                    <h3 className={classes.questionNo}>{question[`Q`]}</h3>
                    <h3 className={classes.question}>{question?.question}</h3>
                  </div>
                  <div>
                    <RadioBtn
                      className={classes.radios}
                      radioBtns={question?.options}
                    />
                  </div>
                </div>
              ))}
              <Button
                onClick={submitTestHandler}
                className={classes.submitBtn}
                text="Submit"
              />
            </>
          )}
        </Card>
      </Container>
    </HomeSection>
  );
};

export default ShowTest;
