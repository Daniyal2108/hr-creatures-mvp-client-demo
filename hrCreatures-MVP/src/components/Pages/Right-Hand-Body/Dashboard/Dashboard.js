import classes from "./style.module.css";
import ProgressRate from "../../../Widgets/ProgressRate";
import Header from "../../../Layout/Header/Header";
import Container from "../../../Layout/Container";
import HomeSection from "../../../Layout/HomeSection";
import progressData from "./progress-data";
import Card from "../../../Layout/Card";

const Dashboard = (props) => {
  const progressComponentHelper = progressData.map((data, index) => {
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
            title: "Dashboard",
          }}
        />

        <Card className={classes.content}>
          <div className={classes.dashboardContentContainer}>
            {progressComponentHelper}
          </div>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default Dashboard;
