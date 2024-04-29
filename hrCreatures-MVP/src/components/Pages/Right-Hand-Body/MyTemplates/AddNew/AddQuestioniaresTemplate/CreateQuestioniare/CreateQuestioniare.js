import classes from "./style.module.css";
import Header from "../../../../../../Layout/Header/Header";
import Container from "../../../../../../Layout/Container";
import HomeSection from "../../../../../../Layout/HomeSection";
import Card from "../../../../../../Layout/Card";
import Button from "../../../../../../UI/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestioniare } from "../../../../../../../store/slices/Add-Templates/Create-Questioniare";
import Loader from "../../../../../../UI/Loader";

const CreateQuestioniare = (props) => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.questioniare);
  const [dynamicQuestions, setDynamicQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  console.log(questions);
  useEffect(() => {
    if (questions.length >= 1) {
      if (isLoading) {
        setIsLoading(false);
        navigate("answers/");
      }
    }
  }, [questions, isLoading, setIsLoading, navigate]);

  useEffect(() => {
    if (warning) {
      setIsLoading(false);
    }
  }, [warning, setIsLoading]);

  const continueToAnswersHandler = () => {
    setWarning(false);
    setIsLoading(true);
    if (dynamicQuestions.length > 0) {
      dispatch(getQuestioniare(dynamicQuestions));
      return;
    }
    setWarning(true);
  };

  const addQuestionsHandler = () => {
    setWarning(false);
    setDynamicQuestions((questions) => {
      const add = [...questions, {}];
      const generateQuestions = add.map((question, i) => {
        const questionNo = `Q`;
        const questionText = `question`;
        return {
          ...question,
          [questionNo]: `Q ${i + 1}`,
          [questionText]: question["question"] || "Write Your Question Here..",
          options: question.options || [
            "Ans here",
            "Ans here",
            "Ans here",
            "Ans here",
          ],
          correctAnswer: "",
        };
      });
      return generateQuestions;
    });
  };

  const questionEditableHandler = (e) => {
    const indexId = e.target.id;
    setDynamicQuestions((questionList) => {
      const questionObject = questionList[indexId];
      const updatedObj = { ...questionObject };
      updatedObj[`question`] = e.target.innerHTML;
      questionList[indexId] = updatedObj;
      const updatedList = [...questionList];
      return updatedList;
    });
  };

  const answerEditableHandler = (e) => {
    const { id, tabIndex } = e.target;
    setDynamicQuestions((questionList) => {
      const questionObject = questionList[id];
      const updatedObj = { ...questionObject };
      let option = updatedObj["options"][tabIndex];
      option = e.target.innerHTML;
      questionList[id]["options"][tabIndex] = option;
      const updatedList = [...questionList[id]["options"]];
      questionList[id]["options"] = [...updatedList];
      return questionList;
    });
  };

  return (
    <HomeSection>
      <Container className={`${classes.rightBodyContainer} !block`}>
        <Header
          headerContent={{
            title: "Questioniares",
          }}
        />

        <Card className={classes.content}>
          <h3 className={classes.title}>Write Questions</h3>
          <div className={classes.questionContainer}>
            {isLoading && <Loader className={classes.loader} />}
            {dynamicQuestions.map((question, i) => (
              <div key={i}>
                <div
                  className={`flex justify-start ${classes.questionContainer}`}
                >
                  <h3 className={classes.questionNo}>{question[`Q`]}</h3>
                  <h3
                    className={classes.question}
                    id={i}
                    onBlur={questionEditableHandler}
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: question[`question`] }}
                  />
                </div>
                <div className={classes.options}>
                  <ol type="A">
                    {question.options.map((options, index) => (
                      <li
                        key={index}
                        id={i}
                        tabIndex={index}
                        onBlur={answerEditableHandler}
                        contentEditable
                        dangerouslySetInnerHTML={{ __html: options }}
                      />
                    ))}
                  </ol>
                </div>
              </div>
            ))}

            {warning && (
              <p className={classes.warningMsg}>
                Please add questions to proceed !
              </p>
            )}

            <Button
              className={classes.addMoreBtn}
              text="Add More"
              onClick={addQuestionsHandler}
              type="button"
            />

            <Button
              className={classes.continueBtn}
              text="Continue"
              onClick={continueToAnswersHandler}
            />
          </div>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default CreateQuestioniare;
