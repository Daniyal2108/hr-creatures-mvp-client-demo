import classes from "./style.module.css";
import Header from "../../../../Layout/Header/Header";
import Container from "../../../../Layout/Container";
import HomeSection from "../../../../Layout/HomeSection";
import Card from "../../../../Layout/Card";
import Input from "../../../../UI/Input";
import { columns } from "./table-data";
import Table from "../../../../UI/Table/Table";
import { FaSearch } from "react-icons/fa";
import useFetch from "../../../../../Custom-hooks/useFetch";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewVacancyTemplateData } from "../../../../../store/slices/Add-Templates/view-vacancy-template";
import { useValidate } from "../../../../../Custom-hooks/useValidate";
import useFilter from "../../../../../Custom-hooks/use-filter";
import SkeletonLoader from "../../../../UI/SkeletonLoader";
import reactDOM from "react-dom";
import Modal from "../../../../UI/Modal";
import Button from "../../../../UI/Button";
import Loader from "../../../../UI/Loader";
import moment from "moment";

const Vacancies = (props) => {
  const { inputHandler, inputs } = useValidate({ search: "" }, false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const [vacancyId, setVacancyId] = useState();
  const [isModal, setIsModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [{ response, error }, fetchVacancies] = useFetch(
    "vacancy-templates/my-templates"
  );
  const [{ response: res, error: err }, deleteVacancy] = useFetch(
    `vacancy-templates/${vacancyId}`
  );
  const [{ response: openVacancyRes, error: openVacancyErr }, openVacancy] =
    useFetch(`vacancy-templates/detail/${vacancyId}`);

  const searchData = useFilter(response?.data, inputs.search, "name");

  useEffect(() => {
    fetchVacancies({
      method: "GET",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  }, [fetchVacancies, res, userCredentials]);

  useEffect(() => {
    if (openVacancyRes?.data) {
      navigate("view-vacancy-details");
      dispatch(viewVacancyTemplateData(openVacancyRes?.data));
    }
  }, [openVacancyRes, dispatch, navigate]);

  useEffect(() => {
    if (error || err || openVacancyErr) {
      setIsModal(true);
    }
  }, [error, err, openVacancyErr, setIsModal]);

  useEffect(() => {
    if (res?.data || err || openVacancyRes?.data || openVacancyErr) {
      setLoader(false);
    }
  }, [setLoader, res, err, openVacancyRes, openVacancyErr]);

  const deleteVacancyHandler = (e) => {
    const id = e.target.id;
    setVacancyId(id);
    setLoader(true);

    deleteVacancy({
      method: "DELETE",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  };

  const viewVacancyHandler = (e) => {
    const id = e.target.id;
    setVacancyId(id);
    setLoader(true);

    openVacancy({
      method: "GET",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  };

  const tableData = searchData?.map((data) => ({
    name: data?.name,
    createdAt: moment(data?.createdAt).format("MMM Do YY"),
    action: (
      <>
        <span
          className={classes.viewAction}
          id={data?._id}
          onClick={viewVacancyHandler}
        >
          View
        </span>
        <span
          className={classes.deleteAction}
          id={data?._id}
          onClick={deleteVacancyHandler}
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
      children={<p>{error || err || openVacancyErr}</p>}
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
            title: "Vacancies",
          }}
        />

        <Card className={classes.content}>
          {loader && <Loader className={classes.loader} />}
          <div className={classes.titleBar}>
            <h3>Vacancies Templates</h3>
            <Input
              className={classes.search}
              values={{
                type: "search",
                id: "search",
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

export default Vacancies;
