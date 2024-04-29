import classes from "./style.module.css";
import ProgressRate from "../../../Widgets/ProgressRate";
import Header from "../../../Layout/Header/Header";
import Container from "../../../Layout/Container";
import HomeSection from "../../../Layout/HomeSection";
import boxData from "./boxes-data";
import Card from "../../../Layout/Card";

const MyTemplates = (props) => {
  const progressComponentHelper = boxData.map((data, index) => {
    const { style, title, path } = data;

    return (
      <ProgressRate
        key={index}
        progressRateContainer={classes.progressBox}
        style={style}
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
            title: "My Templates",
          }}
        />

        <Card className={classes.content}>
          <h3>My Templates</h3>
          <div className={classes.dashboardContentContainer}>
            {progressComponentHelper}
          </div>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default MyTemplates;
