import classes from "./style.module.css";
import HomeSection from "../../../../Layout/HomeSection";
import Card from "../../../../Layout/Card";
import useFetch from "../../../../../Custom-hooks/useFetch";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FormControl from "./FormControl";
import Header from "../../../../Layout/Header/Header";
import Container from "../../../../Layout/Container";
import SkeletonLoader from "../../../../UI/SkeletonLoader";

const CreateForm = (props) => {
  const id = useSelector((state) => state.candidateVacancy.vacancyId);
  const [{ response, error }, fetchVacancyData] = useFetch(`vacancies/${id}`);
  const inputsProps = response?.data?.vacancyTemplate?.candidateForm[0];
  const dropdown = response?.data?.vacancyTemplate?.candidateForm[1];
  const dynamicInputs = response?.data?.vacancyTemplate?.candidateForm[2];

  useEffect(() => {
    fetchVacancyData();
  }, [fetchVacancyData, error]);

  return (
    <HomeSection className={classes.homeSection}>
      <Container className={`${classes.rightBodyContainer}`}>
        <Header
          headerContent={{
            title: "Candidate Form",
          }}
        />
        <Card className={classes.content}>
          {!response?.data && !error ? (
            <SkeletonLoader />
          ) : error ? (
            <p className={classes.errorMsg}>{error}</p>
          ) : (
            <FormControl
              id={response?.data?._id}
              inputProps={inputsProps}
              dropdown={dropdown}
              dynamicInputs={dynamicInputs}
            />
          )}
        </Card>
      </Container>
    </HomeSection>
  );
};

export default CreateForm;
