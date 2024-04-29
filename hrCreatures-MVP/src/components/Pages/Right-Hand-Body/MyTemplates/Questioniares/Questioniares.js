import classes from "./style.module.css";
import Header from "../../../../Layout/Header/Header";
import Container from "../../../../Layout/Container";
import HomeSection from "../../../../Layout/HomeSection";
import Card from "../../../../Layout/Card";
import Input from "../../../../UI/Input";
import { columns } from "./table-data";
import Table from "../../../../UI/Table/Table";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../../../../../Custom-hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewQuestioniareTemplateData } from "../../../../../store/slices/Add-Templates/view-questioniare-template";
import { useValidate } from "../../../../../Custom-hooks/useValidate";
import useFilter from "../../../../../Custom-hooks/use-filter";
import SkeletonLoader from "../../../../UI/SkeletonLoader";
import reactDOM from "react-dom";
import Modal from "../../../../UI/Modal";
import Button from "../../../../UI/Button";
import Loader from "../../../../UI/Loader";
import moment from "moment";

const Questioniares = (props) => {
  const { inputHandler, inputs } = useValidate({ search: "" }, false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const [isModal, setIsModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [questioniareId, setQuestioniareId] = useState();
  const [{ response, error }, fetchQuestioniare] = useFetch(
    "questionaire-templates/my-templates"
  );
  const [{ response: res, error: err }, deleteQuestioniare] = useFetch(
    `questionaire-templates/${questioniareId}`
  );
  const [
    { response: openQuestioniareRes, error: openQuestioniareErr },
    openQuestioniare,
  ] = useFetch(`questionaire-templates/detail/${questioniareId}`);

  const searchData = useFilter(response?.data, inputs.search, "title");

  useEffect(() => {
    fetchQuestioniare({
      method: "GET",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  }, [fetchQuestioniare, res, userCredentials]);

  useEffect(() => {
    if (openQuestioniareRes?.data) {
      navigate("view-questioniare-details");
      dispatch(viewQuestioniareTemplateData(openQuestioniareRes?.data));
    }
  }, [openQuestioniareRes, dispatch, navigate]);

  useEffect(() => {
    if (error || err || openQuestioniareErr) {
      setIsModal(true);
    }
  }, [error, err, openQuestioniareErr, setIsModal]);

  useEffect(() => {
    if (res?.data || err || openQuestioniareRes?.data || openQuestioniareErr) {
      setLoader(false);
    }
  }, [setLoader, res, err, openQuestioniareRes, openQuestioniareErr]);

  const deleteQuestioniareHandler = (e) => {
    const id = e.target.id;
    setQuestioniareId(id);
    setLoader(true);

    deleteQuestioniare({
      method: "DELETE",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  };

  const viewQuestioniareHandler = (e) => {
    const id = e.target.id;
    setQuestioniareId(id);
    setLoader(true);

    openQuestioniare({
      method: "GET",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  };

  const tableData = searchData?.map((data) => ({
    title: data?.title,
    createdAt: moment(data?.createdAt).format("MMM Do YY"),
    action: (
      <>
        <span
          className={classes.viewAction}
          id={data?._id}
          onClick={viewQuestioniareHandler}
        >
          View
        </span>
        <span
          className={classes.deleteAction}
          id={data?._id}
          onClick={deleteQuestioniareHandler}
        >
          Delete
        </span>
      </>
    ),
  }));

  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={() => setIsModal(false)}
      className={classes.modal}
      children={<p>{error || err || openQuestioniareErr}</p>}
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
            title: "Questioniares",
          }}
        />

        <Card className={classes.content}>
          {loader && <Loader className={classes.loader} />}
          <div className={classes.titleBar}>
            <h3>My Questioniare Templates</h3>
            <Input
              className={classes.search}
              values={{
                type: "search",
                id: "search",
                placeholder: "Search",
                name: "search",
                value: inputs.search,
                onChange: inputHandler,
              }}
              icon={
                <label htmlFor="search">
                  <FaSearch />
                </label>
              }
            />
          </div>
          <div className={classes.tableContainer}>
            {!response?.data ? (
              <SkeletonLoader />
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

export default Questioniares;
