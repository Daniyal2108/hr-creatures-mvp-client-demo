import classes from "./style.module.css";
import Header from "../../../../../Layout/Header/Header";
import Container from "../../../../../Layout/Container";
import HomeSection from "../../../../../Layout/HomeSection";
import Card from "../../../../../Layout/Card";
import ProgressRate from "../../../../../Widgets/ProgressRate";
import useFetch from "../../../../../../Custom-hooks/useFetch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaPlusCircle } from "react-icons/fa";
import trashIcon from "../../../../../../images/trash-icon.png";
import SkeletonLoader from "../../../../../UI/SkeletonLoader";
import reactDOM from "react-dom";
import Modal from "../../../../../UI/Modal";
import Button from "../../../../../UI/Button";
import Loader from "../../../../../UI/Loader";

const Departments = (props) => {
  const [departmentId, setDepartmentId] = useState();
  const [isModal, setIsModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const [{ response, error }, fetchDepartments] = useFetch("department/");

  const [{ response: res, error: err }, deleteDepartment] = useFetch(
    `department/${departmentId}`
  );

  useEffect(() => {
    fetchDepartments({
      method: "GET",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  }, [fetchDepartments, res, error, err, userCredentials]);

  useEffect(() => {
    if (err) {
      setIsModal(true);
    }
  }, [err, setIsModal]);

  useEffect(() => {
    if (res || err) {
      setLoader(false);
    }
  }, [res, err, setLoader]);

  const departments = response?.data?.map((department) => ({
    ...department,
    title: department?.name,
    id: department?._id,
  }));

  const deleteDepartmentHandler = (e) => {
    const id = e.target.id;
    setLoader(true);
    setDepartmentId(id);
    deleteDepartment({
      method: "DELETE",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  };

  const progressComponentHelper = departments?.map((data, index) => {
    const { title, id } = data;

    return (
      <ProgressRate
        key={index}
        progressRateContainer={classes.progressBox}
        svg={
          <img
            src={trashIcon}
            alt="trash-icon"
            id={id}
            onClick={deleteDepartmentHandler}
          />
        }
        title={title}
      />
    );
  });

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
            title: "Departments",
          }}
        />

        <Card className={`${classes.content} overflow-auto`}>
          {loader && <Loader className={classes.loader} />}
          <div className="flex justify-between items-center flex-wrap">
            {!response?.data ? (
              <SkeletonLoader />
            ) : error ? (
              <p className={classes.error}>{error}</p>
            ) : (
              <>
                {progressComponentHelper}

                <ProgressRate
                  progressRateContainer={classes.addDepartment}
                  title="Add Department"
                  svg={<FaPlusCircle />}
                  path="add-department"
                />
              </>
            )}
          </div>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default Departments;
