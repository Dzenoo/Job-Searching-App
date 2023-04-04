import { createBrowserRouter } from "react-router-dom";
import Home from "../../home/pages/Home";
import Jobs from "../../jobs/pages/Jobs";
import JobDetails from "../../jobs/pages/JobDetails";
import EditJob from "../../jobs/pages/EditJob";
import NewJob from "../../jobs/pages/NewJob";
import Companies from "../../companies/pages/Companies";
import Root from "./root";
import CompanyDetails from "../../companies/pages/CompanyDetails";
import SignUp from "../../auth/pages/SignUp";
import Login from "../../auth/pages/Login";
import ProfilePage from "../../profile/pages/ProfilePage";
import Applications from "../../profile/pages/Applications";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/jobs/:idOfJob",
        id: "job-details",
        children: [
          {
            index: true,
            element: <JobDetails />,
          },
          {
            path: "edit",
            element: <EditJob />,
          },
        ],
      },
      {
        path: "/jobs/new",
        element: <NewJob />,
      },
      {
        path: "/companies",
        element: <Companies />,
      },
      {
        path: "/companies/:companyId",
        element: <CompanyDetails />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/profile/applications",
        element: <Applications />,
      },
    ],
  },
  {
    path: "/auth",
    id: "auth",
    children: [
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
    ],
  },
]);
