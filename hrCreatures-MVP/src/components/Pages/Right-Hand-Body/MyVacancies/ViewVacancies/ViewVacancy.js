import classes from "./style.module.css";
import Header from "../../../../Layout/Header/Header";
import Container from "../../../../Layout/Container";
import HomeSection from "../../../../Layout/HomeSection";
import Card from "../../../../Layout/Card";
import Button from "../../../../UI/Button";
import Table from "../../../../UI/Table/Table";
import { columns } from "./table-data";
import useFetch from "../../../../../Custom-hooks/useFetch";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getViewVacancyId } from "../../../../../store/slices/view-vacancy";
import { repostVacancy } from "../../../../../store/slices/post-vacancy-slice";
import { useDispatch, useSelector } from "react-redux";
import SkeletonLoader from "../../../../UI/SkeletonLoader";
import reactDOM from "react-dom";
import Modal from "../../../../UI/Modal";
import Loader from "../../../../UI/Loader";

const ViewVacancy = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const [{ response, error }, fetchVacancies] = useFetch("vacancies/");

  const [{ response: res, error: err }, screenedVacancy] = useFetch(
    `vacancies/${id}`
  );

  const [{ response: statusRes, error: statusErr }, statusPatch] = useFetch(
    `vacancies/${id}`
  );

  const [{ response: delRes, error: delErr }, delVacancy] = useFetch(
    `vacancies/${id}`
  );

  useEffect(() => {
    if (res?.data) {
      navigate(`screened/${res?.data?._id}`);
      dispatch(getViewVacancyId(res?.data?._id));
    }
  }, [res, dispatch, navigate]);

  useEffect(() => {
    if (
      res?.data ||
      err ||
      delRes?.data ||
      delErr ||
      statusRes?.data ||
      statusErr
    ) {
      setLoader(false);
    }
  }, [res, err, setLoader, delRes, delErr, statusRes, statusErr]);

  useEffect(() => {
    fetchVacancies({
      method: "GET",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  }, [fetchVacancies, res, statusRes, delRes, userCredentials]);

  useEffect(() => {
    if (response?.data) {
      setData(response?.data);
    }
  }, [response, res, statusRes, delRes]);

  useEffect(() => {
    if (error || err || statusErr || delErr) {
      setIsModal(true);
    }
  }, [error, err, statusErr, delErr, setIsModal]);

  const screenVacancyHandler = (e) => {
    const { id, innerHTML } = e.target;
    if (innerHTML.trim() === "Screened") {
      navigate(`screened/${id}`);
      dispatch(getViewVacancyId(id));
      return;
    } else if (innerHTML.trim() === "Repost") {
      navigate(`repost`);
      const vacancyData = response?.data?.find((data) => data?._id === id);
      dispatch(repostVacancy(vacancyData));
      return;
    }
    setId(id);
    setLoader(true);
    screenedVacancy({
      method: "PATCH",
      body: JSON.stringify({ screeningStatus: "Screened" }),
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  };

  const selectDropdownHandler = (e) => {
    const { id, value } = e.target;
    setLoader(true);
    setId(id);

    if (value.trim() === "Delete") {
      delVacancy({
        method: "DELETE",
        headers: {
          authorization: "Bearer " + userCredentials?.token,
        },
      });
      return;
    }

    statusPatch({
      method: "PATCH",
      body: JSON.stringify({ status: value }),
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  };

  const tableData = data?.map((data, i) => ({
    ...data,
    name: data?.vacancyTemplate?.name,
    screeningStatus: (
      <span
        className={classes.screeningStatus}
        id={data?._id}
        onClick={screenVacancyHandler}
      >
        {data?.screeningStatus}
      </span>
    ),
    status: (
      <select id={data?._id} onChange={selectDropdownHandler}>
        <option hidden>{data?.status}</option>
        {data?.status !== "Expired" && (
          <option>
            {data?.status === "Inactive" ? "Activate" : "Deactivate"}
          </option>
        )}

        <option>Delete</option>
      </select>
    ),
    appliedCandidates: data?.selected?.length + data?.rejected?.length,
  }));

  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={() => setIsModal(false)}
      className={classes.modal}
      children={<p>{error || err || statusErr || delErr}</p>}
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
            <h3>Vacancies</h3>
            <Link to={"departments"}>
              <Button
                className="flex justify-between items-center flex-row-reverse"
                text="Departments"
                svg={<FaArrowRight className="ml-3" />}
              />
            </Link>
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

export default ViewVacancy;
