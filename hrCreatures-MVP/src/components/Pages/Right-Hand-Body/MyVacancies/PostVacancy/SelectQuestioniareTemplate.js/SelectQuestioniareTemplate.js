import classes from "./style.module.css";
import Header from "../../../../../Layout/Header/Header";
import Container from "../../../../../Layout/Container";
import HomeSection from "../../../../../Layout/HomeSection";
import Card from "../../../../../Layout/Card";
import Table from "../../../../../UI/Table/Table";
import { columns } from "./table-data";
import useFetch from "../../../../../../Custom-hooks/useFetch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../../../../UI/Input";
import { FaSearch } from "react-icons/fa";
import { useValidate } from "../../../../../../Custom-hooks/useValidate";
import useFilter from "../../../../../../Custom-hooks/use-filter";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import SkeletonLoader from "../../../../../UI/SkeletonLoader";
import Loader from "../../../../../UI/Loader";
import reactDOM from "react-dom";
import Modal from "../../../../../UI/Modal";
import Button from "../../../../../UI/Button";

const SelectQuestioniareTemplate = (props) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { inputHandler, inputs } = useValidate({ search: "" }, false);
  const vacancyId = useSelector((state) => state.postVacancy.vacancyId);
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const [{ response, error }, fetchQuestioniares] = useFetch(
    "questionaire-templates/my-templates"
  );
  const [{ response: res, error: err }, selectQuestioniareTemplate] = useFetch(
    `vacancies/${vacancyId}`
  );

  const searchData = useFilter(response?.data, inputs.search, "title");

  useEffect(() => {
    if (!res?.data) {
    }
    if (res?.data) {
      navigate("add-screening-threshold");
    }
  }, [res, navigate]);

  useEffect(() => {
    if (err) {
      setLoader(false);
      setIsModal(true);
    }
  }, [err, setIsModal, setLoader]);

  useEffect(() => {
    fetchQuestioniares({
      method: "GET",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  }, [fetchQuestioniares, userCredentials]);

  const selectTemplateHandler = (e) => {
    const templateId = e.target.id;
    setLoader(true);
    selectQuestioniareTemplate({
      method: "PATCH",
      body: JSON.stringify({ questionaireTemplate: templateId }),
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  };

  const tableData = searchData?.map((data) => ({
    ...data,
    createdAt: moment(data?.createdAt).format("MMM Do YY"),
    actions: (
      <span
        id={data?._id}
        className={classes.action}
        onClick={selectTemplateHandler}
      >
        Select
      </span>
    ),
  }));

  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={() => setIsModal(false)}
      className={classes.modal}
      children={<p>{err}</p>}
      btn={
        <Button
          text="Close"
          onClick={() => {
            setIsModal(false);
          }}
          className={classes.modalBtn}
        />
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
            title: "View Vacancy",
          }}
        />

        <Card className={classes.content}>
          {loader && <Loader className={classes.loader} />}
          <div className={classes.title}>
            <h3>My Questioniare Templates</h3>
            <Input
              className={`${classes.searcBar} flex justify-between items-center flex-row-reverse`}
              values={{
                type: "search",
                placeholder: "Search",
                name: "search",
                value: inputs.search,
                onChange: inputHandler,
              }}
              icon={<FaSearch />}
            />
          </div>

          <div className={classes.tableContainer}>
            {!response?.data ? (
              error ? (
                <p className={classes.error}>{error}</p>
              ) : (
                <SkeletonLoader />
              )
            ) : (
              <Table
                className={classes.table}
                columns={columns}
                data={tableData}
              />
            )}
          </div>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default SelectQuestioniareTemplate;
