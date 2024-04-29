import classes from "./style.module.css";
import HomeSection from "../../../../../../Layout/HomeSection";
import Container from "../../../../../../Layout/Container";
import Header from "../../../../../../Layout/Header/Header";
import Card from "../../../../../../Layout/Card";
import Table from "../../../../../../UI/Table/Table";
import { columns } from "./table-data";
import useFetch from "../../../../../../../Custom-hooks/useFetch";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SkeletonLoader from "../../../../../../UI/SkeletonLoader";

const Selected = (props) => {
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const viewVacancyId = useSelector((state) => state.viewVacancy.vacancyId);
  const [{ response, error }, getSelectedEmployees] = useFetch(
    `vacancies/${viewVacancyId}`
  );

  useEffect(() => {
    getSelectedEmployees({
      method: "GET",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  }, [getSelectedEmployees, userCredentials]);

  const tableData = response?.data?.selected?.map((data) => ({
    ...data,
    email: <span className="text-blue-600">{data?.email}</span>,
    uploadCv: (
      <a
        href={`https://hr-management-development.s3.eu-west-2.amazonaws.com/${data?.uploadCv}`}
      >
        Download CV
      </a>
    ),
  }));

  return (
    <HomeSection>
      <Container className={`${classes.rightBodyContainer} !block`}>
        <Header
          headerContent={{
            title: "Selected Candidates",
          }}
        />

        <Card className={classes.content}>
          {!response?.data ? (
            <SkeletonLoader />
          ) : error ? (
            <p className={classes.error}>{error}</p>
          ) : (
            <>
              <h3 className={classes.title}>Selected Candidates</h3>

              <div className={classes.tableContainer}>
                <Table
                  className={classes.table}
                  columns={columns}
                  data={tableData}
                />
              </div>
            </>
          )}
        </Card>
      </Container>
    </HomeSection>
  );
};

export default Selected;
