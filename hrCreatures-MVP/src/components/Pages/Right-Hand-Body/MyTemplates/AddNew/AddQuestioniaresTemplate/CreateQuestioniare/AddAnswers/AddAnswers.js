import classes from "./style.module.css";
import Header from "../../../../../../../Layout/Header/Header";
import Container from "../../../../../../../Layout/Container";
import HomeSection from "../../../../../../../Layout/HomeSection";
import Card from "../../../../../../../Layout/Card";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Button from "../../../../../../../UI/Button";
import useFetch from "../../../../../../../../Custom-hooks/useFetch";
import { FaCheck } from "react-icons/fa";
import Modal from "../../../../../../../UI/Modal";
import reactDOM from "react-dom";
import Loader from "../../../../../../../UI/Loader";
import { Link } from "react-router-dom";

const AddAnswers = (props) => {
  const [isModal, setIsModal] = useState(false);
  const [{ response, error }, postQuestioniare] = useFetch(
    "questionaire-templates/"
  );
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const { questions, timeAllowed } = useSelector((state) => state.questioniare);
  const [questionList, setQuestionList] = useState([...questions]);
  const [submitQuestioniare, setSubmitQuestioniare] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (submitQuestioniare?.questions) {
      const questions = submitQuestioniare?.questions?.map(
        (singleQuestionObject) => {
          const { Q, correctAnswer, options, question } = singleQuestionObject;
          return { Q, correctAnswer, options, question };
        }
      );

      const data = { ...submitQuestioniare, questions };

      postQuestioniare({
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + userCredentials?.token,
        },
      });
    }
  }, [submitQuestioniare, postQuestioniare, userCredentials]);

  useEffect(() => {
    if (response?.data || error) {
      setIsLoading(false);
      setIsModal(true);
    }
  }, [response, error]);

  const editAnswerHandler = (e) => {
    const { id, innerHTML } = e.target;
    setQuestionList((question) => {
      const triggeredObject = question[id];
      const updatedObject = {
        ...triggeredObject,
        getAnswer: innerHTML,
      };

      if (updatedObject.getAnswer.toLowerCase() === "a") {
        updatedObject.correctAnswer = updatedObject.options[0];
      } else if (updatedObject.getAnswer.toLowerCase() === "b") {
        updatedObject.correctAnswer = updatedObject.options[1];
      } else if (updatedObject.getAnswer.toLowerCase() === "c") {
        updatedObject.correctAnswer = updatedObject.options[2];
      } else if (updatedObject.getAnswer.toLowerCase() === "d") {
        updatedObject.correctAnswer = updatedObject.options[3];
      }
      question[id] = updatedObject;
      const updatedList = [...question];
      return updatedList;
    });
  };

  const saveAnswersHandler = () => {
    setIsLoading(true);
    setSubmitQuestioniare((prev) => ({
      ...prev,
      ...timeAllowed,
      questions: [...questionList],
    }));
  };

  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={() => setIsModal(false)}
      className={classes.modal}
      icon={<FaCheck />}
      children={<p>{error || "Added Successfully !"}</p>}
      btn={
        error ? (
          <Button text="Close" onClick={() => setIsModal(false)} />
        ) : (
          <Link
            className={classes.questioniareTemplate}
            to={"/my-templates/add-new/"}
          >
            Close
          </Link>
        )
      }
    />,
    document.getElementById("modal")
  );

  return (
    <HomeSection>
      {isModal && modalHelper}
      <Container className={`${classes.rightBodyContainer} !block`}>
        <Header
          headerContent={{
            title: "Questioniares",
          }}
        />

        <Card className={classes.content}>
          {isLoading && <Loader className={classes.loader} />}
          <h3 className={classes.title}>Add Answers</h3>
          <Card className={classes.detailsCard}>
            <div>
              <div
                className={`flex justify-between items-center ${classes.resulthHaeder}`}
              >
                <h3>Questions</h3>
                <h3>Correct Answers</h3>
              </div>
              {questionList.map((answer, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center ${classes.result}`}
                >
                  <p className={classes.questionNo}>{answer.Q}</p>
                  <p
                    id={i}
                    onBlur={editAnswerHandler}
                    contentEditable
                    dangerouslySetInnerHTML={{
                      __html: answer.getAnswer,
                    }}
                    className={classes.answer}
                  />
                </div>
              ))}
            </div>
          </Card>
          <Button
            text="Save"
            className={classes.saveBtn}
            onClick={saveAnswersHandler}
          />
        </Card>
      </Container>
    </HomeSection>
  );
};

export default AddAnswers;
