import classes from "./style.module.css";
import Header from "../../../../Layout/Header/Header";
import Container from "../../../../Layout/Container";
import HomeSection from "../../../../Layout/HomeSection";
import { useValidate } from "../../../../../Custom-hooks/useValidate";
import { useCallback, useState, useEffect, useMemo } from "react";
import useDropdownId from "../../../../../Custom-hooks/use-dropdown-id";
import useFetch from "../../../../../Custom-hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPostedId } from "../../../../../store/slices/post-vacancy-slice";
import Form from "./Form";
import Popup from "./Popup";

const PostVacancy = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );

  const [{ response, error }, getVacancyTemplates] = useFetch(
    "vacancy-templates/my-templates"
  );
  const [
    { response: questioniareRes, error: questioniareErr },
    fetchQuestioniares,
  ] = useFetch("questionaire-templates/my-templates");
  const [{ response: res, error: err }, postVacancy] = useFetch("vacancies/");
  const vacancyTemplateId = useDropdownId(response);
  const [ids, setIds] = useState({
    vacancyTemplate: {},
  });
  const [isParameters, setIsParameters] = useState(false);
  const [selected, setIsSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { inputHandler, inputTouched, submit, inputs, inputsErr } = useValidate(
    {
      vacancyTemplate: "",
      lastDateOfApply: "",
      joiningDate: "",
      education: false,
      experience: false,
      expectedJoiningDate: false,
      age: false,
      expectedSalary: false,
      skills: false,
    },
    true,
    (data) => {
      if (!data.vacancyTemplate || !data.lastDateOfApply || !data.joiningDate)
        return;
      if (
        !data.education &&
        !data.experience &&
        !data.expectedJoiningDate &&
        !data.age &&
        !data.expectedSalary &&
        !data.skills
      ) {
        setIsParameters(true);
        return;
      }

      setIsLoading(true);

      const updatedVal = {
        ...data,
        vacancyTemplate: ids.vacancyTemplate,
      };

      postVacancy({
        method: "POST",
        body: JSON.stringify(updatedVal),
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + userCredentials?.token,
        },
      });
    }
  );

  const parameters = isParameters && (
    <p className={classes.parametersText}>
      Select atleast one parameter to filter out the candidate.
    </p>
  );

  const vacanciesTemplate = useMemo(() => ({ ...response }), [response]);
  const questioniareTemplate = useMemo(
    () => ({ ...questioniareRes }),
    [questioniareRes]
  );
  const postedVacancy = useMemo(() => ({ ...res }), [res]);
  const user = useMemo(() => ({ ...userCredentials }), [userCredentials]);

  useEffect(() => {
    if (!vacanciesTemplate?.data) {
      setIsSelected("Loading...");
      if (error) {
        setIsSelected(error);
      }
    } else if (vacanciesTemplate?.data?.length < 1) {
      setIsSelected("No Template");
    } else {
      setIsSelected("Select Vacancy Template");
    }
  }, [vacanciesTemplate, error, setIsModal, setIsSelected]);

  useEffect(() => {
    if (
      vacanciesTemplate?.data?.length < 1 ||
      questioniareTemplate?.data?.length < 1
    ) {
      setIsModal(true);
    }
  }, [vacanciesTemplate, questioniareTemplate, setIsModal]);

  useEffect(() => {
    if (questioniareErr) {
      setIsModal(true);
    }
  }, [questioniareErr, setIsModal]);

  useEffect(() => {
    if (postedVacancy?.data) {
      const id = postedVacancy?.data?._id;
      dispatch(getPostedId(id));
      navigate("select-questioniare-template");
    } else if (err) {
      setIsLoading(false);
      setIsModal(true);
    }
  }, [postedVacancy, err, dispatch, navigate]);

  useEffect(() => {
    getVacancyTemplates({
      method: "GET",
      headers: {
        authorization: "Bearer " + user?.token,
      },
    });

    fetchQuestioniares({
      method: "GET",
      headers: {
        authorization: "Bearer " + user?.token,
      },
    });
  }, [getVacancyTemplates, fetchQuestioniares, user]);

  const getIdHandler = useCallback((obj) => {
    const { name, id } = obj;
    setIds((prev) => ({ ...prev, [name]: id }));
  }, []);

  return (
    <HomeSection>
      <Popup
        isModal={isModal}
        response={vacanciesTemplate}
        questioniareRes={questioniareTemplate}
        err={err}
        questioniareErr={questioniareErr}
        onClick={() => {
          setIsModal(false);
        }}
        onBackdrop={() =>
          vacanciesTemplate?.data?.length >= 1 &&
          questioniareTemplate?.data?.length >= 1 &&
          setIsModal(false)
        }
      />
      <Container className={`${classes.rightBodyContainer} !block`}>
        <Header
          headerContent={{
            title: "Post a Vacancy",
          }}
        />

        <Form
          inputsErr={inputsErr}
          inputs={inputs}
          selected={selected}
          inputHandler={inputHandler}
          inputTouched={inputTouched}
          submit={submit}
          getIdHandler={getIdHandler}
          vacancyTemplateId={vacancyTemplateId}
          isLoading={isLoading}
          parameters={parameters}
        />
      </Container>
    </HomeSection>
  );
};

export default PostVacancy;
