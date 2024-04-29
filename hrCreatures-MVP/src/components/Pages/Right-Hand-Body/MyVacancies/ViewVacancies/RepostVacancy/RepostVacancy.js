import classes from "./style.module.css";
import Container from "../../../../../Layout/Container";
import Header from "../../../../../Layout/Header/Header";
import Card from "../../../../../Layout/Card";
import HomeSection from "../../../../../Layout/HomeSection";
import { useValidate } from "../../../../../../Custom-hooks/useValidate";
import InputField from "../../../../../UI/InputField";
import Button from "../../../../../UI/Button";
import { useSelector } from "react-redux";
import useFetch from "../../../../../../Custom-hooks/useFetch";

const inputsProps = [
  {
    className: classes.formControl,
    label: {
      value: "Last Date Of Apply",
      properties: {
        htmlFor: "last-date-of-apply",
      },
    },
    input: {
      values: {
        className: classes.input,
        type: "date",
        id: "last-date-of-apply",
        name: "lastDateOfApply",
      },
    },
  },
];

const RepostVacancy = (props) => {
  const repostVacancy = useSelector((state) => state.postVacancy.repostVacancy);
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const [{ response, error }, respotVacancy] = useFetch(
    `vacancies/${repostVacancy?._id}`
  );
  const { inputHandler, inputTouched, submit, inputs, inputsErr } = useValidate(
    {
      lastDateOfApply: "",
    },
    true,
    (data) => {
      if (!data.lastDateOfApply) return;

      respotVacancy({
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + userCredentials?.token,
        },
      });
    }
  );

  console.log(response);

  const inputProperties = inputsProps.map((prop) => ({
    ...prop,
    input: {
      ...prop.input,
      values: {
        ...prop.input.values,
        onChange: inputHandler,
        onBlur: inputTouched,
        value: inputs[prop.input.values.name],
        className: classes.input,
      },
    },
  }));

  return (
    <HomeSection>
      <Container className={`${classes.rightBodyContainer} !block`}>
        <Header
          headerContent={{
            title: "Repost Vacancy",
          }}
        />

        <Card className={classes.content}>
          <h3 className={classes.title}>Repost Vacancy</h3>
          <form onSubmit={submit}>
            {inputProperties.map((itm, index) => (
              <InputField key={index} {...itm} />
            ))}

            <Button className={classes.btn} text="Repost" />
          </form>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default RepostVacancy;
