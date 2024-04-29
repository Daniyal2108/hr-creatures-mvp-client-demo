import classes from "./style.module.css";
import HomeSection from "../../../../Layout/HomeSection";
import Container from "../../../../Layout/Container";
import Header from "../../../../Layout/Header/Header";
import Card from "../../../../Layout/Card";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { AiFillCheckCircle } from "react-icons/ai";

const ViewVacancyDetails = () => {
  const viewVacancy = useSelector(
    (state) => state.viewVacancyTemplate.viewVacancyTemplateData
  );

  return (
    <HomeSection>
      <Container className={`${classes.rightBodyContainer} !block`}>
        <Header
          headerContent={{
            title: "View Vacancy Template",
          }}
        />

        <Card className={classes.content}>
          <section
            className={`w-3/4 h-max flex justify-between ${classes.details}`}
          >
            <div>
              <h1 className={classes.heading}>Vacancy Details</h1>
              <h3 className={classes.title}>Vacancy Name</h3>
              <p className={classes.data}>{viewVacancy?.name}</p>
              <h3 className={classes.title}>Department</h3>
              <p className={classes.data}>{viewVacancy?.department?.name}</p>
              <h3 className={classes.title}>No. Of Vacancies</h3>
              <p className={classes.data}>{viewVacancy?.noOfVacancies}</p>
              <h3 className={classes.title}>Job Title</h3>
              <p className={classes.data}>{viewVacancy?.name}</p>
              <h3 className={classes.title}>Job Description</h3>
              <p className={`${classes.data} ${classes.descriptionData}`}>
                {parse(`${viewVacancy?.jobDescription}`)}
              </p>
            </div>
            <div>
              <h3 className={classes.title}>Education</h3>
              <p className={classes.data}>{viewVacancy?.education}</p>
              <h3 className={classes.title}>Experience</h3>
              <p className={classes.data}>{viewVacancy?.experience}</p>
              <h3 className={classes.title}>Expected Joining Date</h3>
              <p className={classes.data}>{viewVacancy?.expectedJoiningDate}</p>
              <h3 className={classes.title}>Age</h3>
              <p className={classes.data}>{viewVacancy?.age}</p>
              <h3 className={classes.title}>Expected Salary</h3>
              <p className={classes.data}>{viewVacancy?.expectedSalary}</p>
              <h3 className={classes.title}>Skills</h3>
              <p className={classes.data}>
                {viewVacancy?.skills.map((skill) => " " + skill)}
              </p>
              <h3 className={classes.title}>Salary Range</h3>
              <p
                className={classes.data}
              >{`${viewVacancy?.salaryRangeFrom} - ${viewVacancy?.salaryRangeTo}`}</p>
            </div>
          </section>
          <section className={`${classes.formDetails} `}>
            <div className="flex justify-start items-center ">
              <h1 className={classes.heading}>Employee Form Details</h1>
              <p className={classes.data}>
                Following fields are added into the form
              </p>
            </div>
            <div>
              {viewVacancy?.candidateForm.map((eachInputList) => {
                return eachInputList.map((input, i) => (
                  <div className="flex justify-start items-center">
                    <AiFillCheckCircle />
                    <p key={i}>{input?.label?.value || input[`label${i}`]}</p>
                  </div>
                ));
              })}
            </div>
          </section>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default ViewVacancyDetails;
