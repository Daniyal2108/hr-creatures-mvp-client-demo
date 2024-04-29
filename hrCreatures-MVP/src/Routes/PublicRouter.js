import ErrorPage from "./ErrorPage";
import CandidateForm from "../components/Pages/CandidateForm/CandidateForm";
import Form from "../components/Pages/CandidateForm/Form/Form";
import Test from "../components/Pages/CandidateForm/Form/Test/Test";
import ForgetPassword from "../components/ForgetPassword/ForgetPassword";

const remainingPublicRouter = [
  {
    path: "forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "forget-password/set-password/:id",
    element: <ForgetPassword />,
  },
  {
    path: "/vacancy/:vacancyName/:id",
    element: <CandidateForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "vacancy/:vacancyName/:id/form",
    element: <Form />,
    errorElement: <ErrorPage />,
  },
  {
    path: "vacancy/:vacancyName/:id/form/test/",
    element: <Test />,
    errorElement: <ErrorPage />,
  },
];

export default remainingPublicRouter;
