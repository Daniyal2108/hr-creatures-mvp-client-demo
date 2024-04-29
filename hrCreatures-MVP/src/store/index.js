import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import userCredentialsReducer from "./slices/userCredentials-slice";
import paramFormReducer from "./slices/Add-Templates/add-questioniare-template";
import questioniareReducer from "./slices/Add-Templates/Create-Questioniare";
import postVacancyReducer from "./slices/post-vacancy-slice";
import candidateVacancyReducer from "./slices/candidate-form-slice";
import viewVacancyReducer from "./slices/view-vacancy";
import viewVacancyTemplateReducer from "./slices/Add-Templates/view-vacancy-template";
import viewQuestioniareTemplateReducer from "./slices/Add-Templates/view-questioniare-template";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";

const userCredentialsConfig = {
  key: "userCredentials",
  storage,
  stateReconciler: autoMergeLevel2,
};

const parametersFormConfig = {
  key: "paramForm",
  storage,
  stateReconciler: autoMergeLevel2,
};

const questioniareConfig = {
  key: "questioniare",
  storage,
  stateReconciler: autoMergeLevel2,
};

const postVacancyConfig = {
  key: "postVacancy",
  storage,
  stateReconciler: autoMergeLevel2,
};

const candidateVacancyConfig = {
  key: "candidate-vacancy",
  storage,
  stateReconciler: autoMergeLevel2,
};

const viewVacancyConfig = {
  key: "view-vacancy",
  storage,
  stateReconciler: autoMergeLevel2,
};

const viewVacancyTemplateConfig = {
  key: "view-vacancy-template",
  storage,
  stateReconciler: autoMergeLevel2,
};

const viewQuestioniareTemplateConfig = {
  key: "view-vacancy-template",
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducers = combineReducers({
  auth: authReducer,
  userCredentials: persistReducer(
    userCredentialsConfig,
    userCredentialsReducer
  ),
  parametersForm: persistReducer(parametersFormConfig, paramFormReducer),
  questioniare: persistReducer(questioniareConfig, questioniareReducer),
  postVacancy: persistReducer(postVacancyConfig, postVacancyReducer),
  candidateVacancy: persistReducer(
    candidateVacancyConfig,
    candidateVacancyReducer
  ),
  viewVacancy: persistReducer(viewVacancyConfig, viewVacancyReducer),
  viewVacancyTemplate: persistReducer(
    viewVacancyTemplateConfig,
    viewVacancyTemplateReducer
  ),
  viewQuestioniareTemplate: persistReducer(
    viewQuestioniareTemplateConfig,
    viewQuestioniareTemplateReducer
  ),
});

const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk],
});

export const persistedStore = persistStore(store);

export default store;
