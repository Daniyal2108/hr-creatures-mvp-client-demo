import classes from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../../../../../Custom-hooks/useFetch";
import HomeSection from "../../../../Layout/HomeSection";
import Card from "../../../../Layout/Card";
import RadioBtn from "../../../../UI/RadioBtn";
import { useState, useEffect } from "react";
import Button from "../../../../UI/Button";
import { FaCheck } from "react-icons/fa";
import reactDOM from "react-dom";
import Modal from "../../../../UI/Modal";
import SkeletonLoader from "../../../../UI/SkeletonLoader";
import Loader from "../../../../UI/Loader";
import { vacancyPosted } from "../../../../../store/slices/candidate-form-slice";

const Test = (props) => {
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const id = useSelector((state) => state.candidateVacancy.vacancyId);
  const vacancyPostedId = useSelector(
    (state) => state.candidateVacancy.vacancyPostedId
  );
  const postedVacancy = useSelector(
    (state) => state.candidateVacancy.vacancyPosted
  );

  const [{ response, error }, fetchVacancyData] = useFetch(`vacancies/${id}`);
  const [{ response: res, error: err }, postTest] = useFetch(
    `result/submit/${vacancyPostedId}`
  );

  useEffect(() => {
    fetchVacancyData();
  }, [fetchVacancyData]);

  useEffect(() => {
    setQuestionAnswers(response?.data?.questionaireTemplate?.questions);
  }, [response]);

  useEffect(() => {
    if (res?.data) {
      setIsLoading(false);
      dispatch(vacancyPosted(res?.data));
      setIsModal(true);
    } else if (err) {
      setIsLoading(false);
      setIsModal(true);
    }
  }, [res, err, dispatch]);

  useEffect(() => {
    if (postedVacancy?._id) {
      setIsModal(true);
    }
  }, [postedVacancy]);

  const getAnswersHandler = (e) => {
    const { value, id } = e.target;
    setQuestionAnswers((questionsList) => {
      const list = [...questionsList];
      const singleQuestion = { ...list[id], answer: value };
      questionsList[id] = singleQuestion;
      return questionsList;
    });
  };

  const radioBtns = response?.data?.questionaireTemplate?.questions?.map(
    (question, i) => {
      return {
        ...question,
        options: question?.options?.map((option) => ({
          input: {
            values: {
              type: "radio",
              value: option,
              onChange: getAnswersHandler,
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
    setIsLoading(true);
    const data = questionAnswers?.map((singleQuestion) => ({
      question: singleQuestion?.question,
      answer: singleQuestion?.answer,
    }));

    postTest({
      method: "PATCH",
      body: JSON.stringify({ questionAnswers: [...data] }),
      headers: {
        "content-type": "application/json",
      },
    });
  };

  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={() => {
        err && setIsModal(false);
      }}
      className={classes.modal}
      icon={<FaCheck />}
      children={
        <p className={err && classes.error}>{err || "Added Successfully !"}</p>
      }
      btn={err && <Button text="Close" onClick={() => setIsModal(false)} />}
    />,
    document.getElementById("modal")
  );

  return (
    <HomeSection className={classes.homeSection}>
      {isModal && modalHelper}
      <Card className={classes.content}>
        {isLoading && <Loader className={classes.loader} />}
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
                    className={`${classes.radios} ${
                      !question?.answer && classes.isRadioInvalid
                    }`}
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
    </HomeSection>
  );
};

export default Test;
