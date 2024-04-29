import classes from "./style.module.css";
import Header from "../../../../../../Layout/Header/Header";
import Container from "../../../../../../Layout/Container";
import HomeSection from "../../../../../../Layout/HomeSection";
import Card from "../../../../../../Layout/Card";
import { useState, useEffect } from "react";
import Button from "../../../../../../UI/Button";
import { useSelector } from "react-redux";
import useFetch from "../../../../../../../Custom-hooks/useFetch";
import Modal from "../../../../../../UI/Modal";
import reactDOM from "react-dom";
import { Link } from "react-router-dom";
import SkeletonLoader from "../../../../../../UI/SkeletonLoader";
import Loader from "../../../../../../UI/Loader";
import {
  EmailShareButton,
  EmailIcon,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const AddScreeningThreshold = (props) => {
  const [editScoring, setEditScoring] = useState([
    { score: 0, title: "SP Score" },
    { score: 0, title: "QA Score" },
    { score: 0, title: "Total Score" },
  ]);
  const [isModal, setIsModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [isSocialShare, setIsSocialShare] = useState(false);

  const vacancyId = useSelector((state) => state.postVacancy.vacancyId);
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const [{ response, error }, getScoring] = useFetch(`vacancies/${vacancyId}`);
  const [{ response: res, error: err }, postScoring] = useFetch(
    `vacancies/${vacancyId}`
  );

  const paScore = response?.data?.totalVacancyPaScore?.toString();
  const qaScore = response?.data?.totalVacancyQaScore?.toString();
  const totalScore = response?.data?.totalVacancyScore;
  const vacancyNameForLink = res?.data?.vacancyTemplate?.name.replace(" ", "-");

  useEffect(() => {
    if (res?.data || err) {
      setLoader(false);
      setIsModal(true);
    }
  }, [res, err, setIsModal, setLoader]);

  useEffect(() => {
    getScoring({
      method: "GET",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  }, [getScoring, userCredentials]);

  useEffect(() => {
    if (isScoring) {
      setIsModal(true);
    }
  }, [isScoring, setIsModal]);

  console.log(isScoring);

  const generateLinkHandler = () => {
    if (
      editScoring[0].score == 0 ||
      editScoring[1].score == 0 ||
      editScoring[2].score == 0
    ) {
      setIsScoring(true);
      return;
    }

    setLoader(true);
    postScoring({
      method: "PATCH",
      body: JSON.stringify({
        status: "Active",
        paScore: editScoring[0].score,
        qaScore: editScoring[1].score,
        totalScore: editScoring[2].score,
      }),
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  };

  const editObtainedScoring = (e) => {
    const { id } = e.target;
    setEditScoring((data) => {
      const newEditScoring = [...data];
      const editScore = newEditScoring[id];
      const updateScore = {
        ...editScore,
        score: e.target.innerHTML,
      };
      data[id] = updateScore;
      const updatedList = [...data];
      return updatedList;
    });
  };

  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={() => {
        setIsModal(false);
        if (isScoring) {
          setIsScoring(false);
        }
      }}
      className={classes.modal}
      btn={
        <Button
          text={/* err ?  */ "Close" /* : "Share" */}
          className={classes.modalBtn}
          onClick={() => {
            // if (err) {
            setIsModal(false);
            // } else {
            //   setIsSocialShare(true);
            // }
            if (isScoring) {
              setIsScoring(false);
            }
          }}
        />
      }
      children={
        err ? (
          <p className={classes.error}>{err}</p>
        ) : isScoring ? (
          <p className={classes.addScoringValue}>
            Please add scoring to generate link.
          </p>
        ) : (
          <>
            {/* {isSocialShare && (
              <div className={classes.socialShareContainer}>
                <div className={classes.email}>
                  <EmailShareButton
                    url={`https://recruitoo.hrcreatures.com/vacancy/${vacancyNameForLink}/${res?.data?._id}`}
                    quote={"Dummy text!"}
                    hashtag="#muo"
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </div>

                <LinkedinShareButton
                  url={`https://recruitoo.hrcreatures.com/vacancy/${vacancyNameForLink}/${res?.data?._id}`}
                  quote={"Dummy text2!"}
                  hashtag="#muo"
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>

                <div>
                  <WhatsappShareButton
                    url={`https://recruitoo.hrcreatures.com/vacancy/${vacancyNameForLink}/${res?.data?._id}`}
                    quote={"Dummy text3!"}
                    hashtag="#muo"
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              </div>
            )} */}

            <div className="text-center">
              <Link
                className={classes.generateLink}
                to={`/vacancy/${vacancyNameForLink}/${res?.data?._id}`}
              >
                Vacancy Link
              </Link>
            </div>
          </>
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
            title: "Questioniare",
          }}
        />

        <Card className={classes.content}>
          {loader && <Loader className={classes.loader} />}
          <h3 className={classes.thresholdHeading}>Add Screening Threshold</h3>
          {!response?.data ? (
            error ? (
              <p className={classes.error}>{error}</p>
            ) : (
              <SkeletonLoader />
            )
          ) : (
            <>
              <Card className={classes.detailsCard}>
                <div className="flex justify-start items-center">
                  {editScoring.map((score, i) => (
                    <div key={i} className={classes.threesHold}>
                      <h3>{score.title}</h3>
                      <div className="flex">
                        <h3
                          id={i}
                          onBlur={editObtainedScoring}
                          contentEditable
                          dangerouslySetInnerHTML={{ __html: score.score }}
                          className={classes.thresholdObtained}
                        />
                        <h3 className={classes.thresholdOutOf}>
                          {score.title === "SP Score"
                            ? paScore
                            : score.title === "QA Score"
                            ? qaScore
                            : totalScore?.toString()}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Button
                text="Generate Link"
                className={classes.generateLinkBtn}
                onClick={generateLinkHandler}
              />
            </>
          )}
        </Card>
      </Container>
    </HomeSection>
  );
};

export default AddScreeningThreshold;
