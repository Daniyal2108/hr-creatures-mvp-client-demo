import classes from "./style.module.css";
import HomeSection from "../../../Layout/HomeSection";
import Card from "../../../Layout/Card";
import useFetch from "../../../../Custom-hooks/useFetch";
import { useEffect } from "react";
// import Modal from "../../../UI/Modal";
// import reactDOM from "react-dom";
// import FileBar from "../../../Widgets/FileBar";
import { useSelector } from "react-redux";
import FormControl from "./FormControl";
import SkeletonLoader from "../../../UI/SkeletonLoader";

const CreateForm = (props) => {
  const id = useSelector((state) => state.candidateVacancy.vacancyId);
  const [{ response, error }, fetchVacancyData] = useFetch(`vacancies/${id}`);
  const inputsProps = response?.data?.vacancyTemplate?.candidateForm[0];
  const dropdown = response?.data?.vacancyTemplate?.candidateForm[1];
  const dynamicInputs = response?.data?.vacancyTemplate?.candidateForm[2];
  const createInputsObjectHandler = () => {
    const inputKeys = inputsProps?.map((key) => key?.input?.values?.name);
    const dropdownKeys = dropdown?.map(
      (dropdownKey) => dropdownKey?.dropdown?.name
    );
    const dynamicKeysList = dynamicInputs?.map(
      (dynamicKey) => Object.keys(dynamicKey)[1]
    );
    const keys = {};
    for (let i = 0; i < dynamicKeysList?.length; i++) {
      keys[dynamicKeysList[i]] = "";
    }

    return {
      [inputKeys && inputKeys[0]]: "",
      [inputKeys && inputKeys[1]]: "",
      [inputKeys && inputKeys[2]]: "",
      [inputKeys && inputKeys[3]]: "",
      [inputKeys && inputKeys[4]]: "",
      [inputKeys && inputKeys[5]]: "",
      [inputKeys && inputKeys[6]]: "",
      [dropdownKeys && dropdownKeys[0]]: "",
      [dropdownKeys && dropdownKeys[1]]: "",
      [dropdownKeys && dropdownKeys[2]]: "",
      ...keys,
    };
  };

  const inputsObject = createInputsObjectHandler();
  const initializeObject = { ...inputsObject };

  useEffect(() => {
    fetchVacancyData();
  }, [fetchVacancyData]);

  console.log(response);

  return (
    <HomeSection className={classes.homeSection}>
      <Card className={classes.content}>
        {initializeObject?.fullName === "" ? (
          <FormControl
            initialInputs={initializeObject}
            inputProps={inputsProps}
            dropdown={dropdown}
            dynamicInputs={dynamicInputs}
          />
        ) : error ? (
          <p className={classes.errorMsg}>{error}</p>
        ) : (
          <SkeletonLoader />
        )}
      </Card>
    </HomeSection>
  );
};

export default CreateForm;
