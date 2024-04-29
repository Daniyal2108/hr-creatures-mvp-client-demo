import classes from "./style.module.css";
import HomeSection from "../../../../Layout/HomeSection";
import Container from "../../../../Layout/Container";
import Header from "../../../../Layout/Header/Header";
import Card from "../../../../Layout/Card";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const ViewQuestioniareDetails = (props) => {
  const viewQuestioniare = useSelector(
    (state) => state.viewQuestioniareTemplate.viewQuestioniareTemplateData
  );

  console.log(viewQuestioniare);
  return (
    <HomeSection>
      <Container className={`${classes.rightBodyContainer} !block`}>
        <Header
          headerContent={{
            title: "View Vacancy Template",
          }}
        />

        <Card className={classes.content}>
          <div className={classes.dataContainer}>
            <h3 className={classes.title}>Time Allowed</h3>
            <p className={classes.data}>{viewQuestioniare?.timeAllowed}</p>
          </div>
          <div className={classes.dataContainer}>
            <h3 className={classes.title}>Other Details</h3>
            <p className={classes.data}>{viewQuestioniare?.otherDetails}</p>
          </div>

          <div className={classes.dataContainer}>
            <h3 className={classes.title}>Questions</h3>
            {viewQuestioniare?.questions?.map((question, i) => (
              <div
                className={`flex justify-start items-center ${classes.questionContainer}`}
                key={i}
              >
                <span className={classes.questionNo}>{question?.Q}</span>
                <span className={classes.question}>{question?.question}</span>
              </div>
            ))}
          </div>

          <div
            className={`w-1/3 flex justify-between items-center ${classes.questionAnswers}`}
          >
            <div className={`${classes.questions} `}>
              <h3 className={classes.title}>Questions</h3>

              {viewQuestioniare?.questions?.map((question, i) => (
                <div key={i} className={`text-center`}>
                  <span>{question?.Q}</span>
                </div>
              ))}
            </div>
            <div className={`${classes.answers}`}>
              <h3 className={classes.title}>Correct Answers</h3>
              {viewQuestioniare?.questions?.map((question, i) => (
                <div key={i} className="text-center">
                  <span>{question?.correctAnswer}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default ViewQuestioniareDetails;
