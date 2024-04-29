import classes from "./style.module.css";
import Header from "../../../../../Layout/Header/Header";
import Container from "../../../../../Layout/Container";
import HomeSection from "../../../../../Layout/HomeSection";
import Card from "../../../../../Layout/Card";
import InputField from "../../../../../UI/InputField";
import { inputsProps } from "./inputs";
import { useValidate } from "../../../../../../Custom-hooks/useValidate";
import Textarea from "../../../../../UI/Textarea";
import Label from "../../../../../UI/Label";
import Button from "../../../../../UI/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTimeAllowed,
  getQuestioniare,
} from "../../../../../../store/slices/Add-Templates/Create-Questioniare";
import { useState, useEffect } from "react";
import Loader from "../../../../../UI/Loader";

const AddQuestioniaresTemplate = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { timeAllowed } = useSelector((state) => state.questioniare);
  const { inputHandler, inputTouched, submit, inputs, inputsErr } = useValidate(
    {
      title: "",
      timeAllowed: "",
      otherDetails: "",
    },
    true,
    (data) => {
      if (!data.title || !data.timeAllowed || !data.otherDetails) return;
      const updatedVal = {
        ...data,
      };
      setIsLoading(true);

      dispatch(getTimeAllowed(updatedVal));
      dispatch(getQuestioniare([]));
    }
  );

  useEffect(() => {
    if (timeAllowed?.title) {
      if (isLoading) {
        setIsLoading(false);
        navigate("questioniare/");
      }
    }
  }, [timeAllowed, isLoading, setIsLoading, navigate]);

  const inputProperties = inputsProps.map((prop) => ({
    ...prop,
    input: {
      ...prop.input,
      className: `${prop.input?.className} ${
        inputsErr[prop.input?.values?.name] && classes.invalidInput
      } `,
      values: {
        ...prop?.input?.values,
        onChange: inputHandler,
        onBlur: inputTouched,
        value: inputs[prop.input?.values?.name],
      },
    },
    textarea: {
      ...prop.textarea,
      onChange: inputHandler,
      onBlur: inputTouched,
      value: inputs[prop.textarea?.name],
      className: `${classes.textarea} ${
        inputsErr[prop.textarea?.name] && classes.invalidInput
      }`,
    },
  }));

  return (
    <HomeSection>
      <Container className={`${classes.rightBodyContainer} !block`}>
        <Header
          headerContent={{
            title: "Add Questioniares Template",
          }}
        />

        <Card className={classes.content}>
          <h3 className={classes.title}>Set Questioniare Time</h3>

          <Card className={classes.detailsCard}>
            <form onSubmit={submit}>
              {isLoading && <Loader className={classes.loader} />}
              {inputProperties.slice(0, 2).map((itm, i) => (
                <InputField key={i} {...itm} />
              ))}

              {inputProperties.slice(2).map((itm, i) => (
                <div key={i} className={classes.formControl}>
                  <Label {...itm.label} />
                  <Textarea textarea={{ ...itm.textarea }} />
                </div>
              ))}
              <Button className={classes.continueBtn} text="Continue" />
            </form>
          </Card>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default AddQuestioniaresTemplate;
