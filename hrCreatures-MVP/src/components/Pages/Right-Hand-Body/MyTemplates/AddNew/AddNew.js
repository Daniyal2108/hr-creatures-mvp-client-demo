import classes from "./style.module.css";
import ProgressRate from "../../../../Widgets/ProgressRate";
import Header from "../../../../Layout/Header/Header";
import Container from "../../../../Layout/Container";
import HomeSection from "../../../../Layout/HomeSection";
import { addNew } from "../boxes-data";
import Card from "../../../../Layout/Card";

const AddNew = (props) => {
  const progressComponentHelper = addNew.map((data, index) => {
    const { title, path } = data;

    return (
      <ProgressRate
        key={index}
        progressRateContainer={classes.progressBox}
        title={title}
        path={path}
      />
    );
  });

  return (
    <HomeSection>
      <Container className={`${classes.rightBodyContainer} !block`}>
        <Header
          headerContent={{
            title: "Add New Template",
          }}
        />

        <Card className={classes.content}>
          <h3>Add New Template</h3>
          <div className={classes.dashboardContentContainer}>
            {progressComponentHelper}
          </div>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default AddNew;
