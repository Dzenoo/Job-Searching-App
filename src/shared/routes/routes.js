import { createBrowserRouter } from "react-router-dom";
import Home from "../../home/pages/Home";
import Jobs, { loader as fetchJobs } from "../../jobs/pages/Jobs";
import JobDetails, { loader as jobLoader } from "../../jobs/pages/JobDetails";
import EditJob from "../../jobs/pages/EditJob";
import NewJob from "../../jobs/pages/NewJob";
import Companies from "../../companies/pages/Companies";
import Root from "./root";
import CompanyDetails from "../../companies/pages/CompanyDetails";
import SignUp from "../../auth/pages/SignUp";
import Login from "../../auth/pages/Login";
import SeekerProfile from "../../profile/pages/SeekerProfile";
import EmployerProfile from "../../profile/pages/EmployerProfile";
import Applications from "../../profile/components/Applications";
import SavedJobs from "../../profile/components/SavedJobs";
import SavedCompanies from "../../profile/components/SavedCompanies";

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
        loader: jobLoader,
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
        path: "/em_profile",
        element: <EmployerProfile />,
      },
      {
        path: "/se_profile",
        element: <SeekerProfile />,
      },
      {
        path: "/se_profile/applications",
        element: <Applications />,
      },
      {
        path: "/se_profile/saved-jobs",
        element: <SavedJobs />,
      },
      {
        path: "/se_profile/saved-companies",
        element: <SavedCompanies />,
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
