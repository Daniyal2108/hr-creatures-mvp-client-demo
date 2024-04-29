import Dashboard from "../components/Pages/Right-Hand-Body/Dashboard/Dashboard";
import UserProfile from "../components/Pages/Right-Hand-Body/User-Profile/UserProfile";
import MyVacancies from "../components/Pages/Right-Hand-Body/MyVacancies/MyVacancies";
import MyTemplates from "../components/Pages/Right-Hand-Body/MyTemplates/MyTemplates";
import Statistics from "../components/Pages/Right-Hand-Body/Statistics/Statistics";
import AddNew from "../components/Pages/Right-Hand-Body/MyTemplates/AddNew/AddNew";
import Vacancies from "../components/Pages/Right-Hand-Body/MyTemplates/Vacancies/Vacancies";
import Questioniares from "../components/Pages/Right-Hand-Body/MyTemplates/Questioniares/Questioniares";
import AddVacanciesTemplate from "../components/Pages/Right-Hand-Body/MyTemplates/AddNew/AddVacanciesTemplate/AddVacanciesTemplate";
import AddQuestioniaresTemplate from "../components/Pages/Right-Hand-Body/MyTemplates/AddNew/AddQuestioniaresTemplate/AddQuestioniaresTemplate";
import PostVacancy from "../components/Pages/Right-Hand-Body/MyVacancies/PostVacancy/PostVacancy";
import ViewVacancy from "../components/Pages/Right-Hand-Body/MyVacancies/ViewVacancies/ViewVacancy";
import CreateForm from "../components/Pages/Right-Hand-Body/MyTemplates/AddNew/AddVacanciesTemplate/CreateForm/CreateForm";
import CreateQuestioniare from "../components/Pages/Right-Hand-Body/MyTemplates/AddNew/AddQuestioniaresTemplate/CreateQuestioniare/CreateQuestioniare";
import AddAnswers from "../components/Pages/Right-Hand-Body/MyTemplates/AddNew/AddQuestioniaresTemplate/CreateQuestioniare/AddAnswers/AddAnswers";
import Departments from "../components/Pages/Right-Hand-Body/MyVacancies/ViewVacancies/Departments/Departments";
import AddDepartment from "../components/Pages/Right-Hand-Body/MyVacancies/ViewVacancies/Departments/AddDepartment/AddDepartment";
import SelectQuestioniareTemplate from "../components/Pages/Right-Hand-Body/MyVacancies/PostVacancy/SelectQuestioniareTemplate.js/SelectQuestioniareTemplate";
import AddScreeningThreshold from "../components/Pages/Right-Hand-Body/MyVacancies/PostVacancy/SelectQuestioniareTemplate.js/AddScreeningThreshold/AddScreeningThreshold";
import ShowCandidateForm from "../components/Pages/Right-Hand-Body/CandidateForm/ShowCandidateForm";
import Form from "../components/Pages/Right-Hand-Body/CandidateForm/Form/ShowForm";
import ShowTest from "../components/Pages/Right-Hand-Body/CandidateForm/Form/Test/ShowTest";
import Screened from "../components/Pages/Right-Hand-Body/MyVacancies/ViewVacancies/Screened/Screened";
import Selected from "../components/Pages/Right-Hand-Body/MyVacancies/ViewVacancies/Screened/Selected/Selected";
import Rejected from "../components/Pages/Right-Hand-Body/MyVacancies/ViewVacancies/Screened/Rejected/Rejected";
import RepostVacancy from "../components/Pages/Right-Hand-Body/MyVacancies/ViewVacancies/RepostVacancy/RepostVacancy";
import ViewVacancyDetails from "../components/Pages/Right-Hand-Body/MyTemplates/Vacancies/ViewVacancyDetails";
import ViewQuestioniareDetails from "../components/Pages/Right-Hand-Body/MyTemplates/Questioniares/ViewQuestioniareDetails";

const remainingPrivateRouter = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/profile/:name/",
    element: <UserProfile />,
  },
  {
    path: "my-vacancies/",
    element: <MyVacancies />,
  },
  {
    path: "my-templates/",
    element: <MyTemplates />,
  },
  {
    path: "stats/",
    element: <Statistics />,
  },
  {
    path: "my-vacancies/post-vacancy/",
    element: <PostVacancy />,
  },
  {
    path: "my-vacancies/post-vacancy/select-questioniare-template",
    element: <SelectQuestioniareTemplate />,
  },
  {
    path: "my-vacancies/post-vacancy/select-questioniare-template/add-screening-threshold",
    element: <AddScreeningThreshold />,
  },
  {
    path: "my-vacancies/view-vacancy/",
    element: <ViewVacancy />,
  },
  {
    path: "my-vacancies/view-vacancy/repost",
    element: <RepostVacancy />,
  },

  {
    path: "my-vacancies/view-vacancy/screened/:id",
    element: <Screened />,
  },
  {
    path: "my-vacancies/view-vacancy/screened/:id/selected",
    element: <Selected />,
  },
  {
    path: "my-vacancies/view-vacancy/screened/:id/rejected",
    element: <Rejected />,
  },
  {
    path: "my-vacancies/view-vacancy/departments",
    element: <Departments />,
  },
  {
    path: "my-vacancies/view-vacancy/departments/add-department",
    element: <AddDepartment />,
  },
  {
    path: "my-templates/add-new/",
    element: <AddNew />,
  },
  {
    path: "my-templates/vacancies/",
    element: <Vacancies />,
  },
  {
    path: "my-templates/vacancies/view-vacancy-details",
    element: <ViewVacancyDetails />,
  },
  {
    path: "my-templates/questioniares/view-questioniare-details",
    element: <ViewQuestioniareDetails />,
  },
  {
    path: "my-templates/questioniares/",
    element: <Questioniares />,
  },
  {
    path: "my-templates/add-new/add-vacancies-template/",
    element: <AddVacanciesTemplate />,
  },
  {
    path: "my-templates/add-new/add-vacancies-template/create-candidate-template/",
    element: <CreateForm />,
  },

  {
    path: "my-templates/add-new/add-questioniares-template/",
    element: <AddQuestioniaresTemplate />,
  },
  {
    path: "my-templates/add-new/add-questioniares-template/questioniare/",
    element: <CreateQuestioniare />,
  },
  {
    path: "my-templates/add-new/add-questioniares-template/questioniare/answers/",
    element: <AddAnswers />,
  },
  {
    path: "/vacancy/:vacancyName/:id",
    element: <ShowCandidateForm />,
  },
  {
    path: "vacancy/:vacancyName/:id/form",
    element: <Form />,
  },
  {
    path: "vacancy/:vacancyName/:id/form/test/",
    element: <ShowTest />,
  },
];

export default remainingPrivateRouter;
