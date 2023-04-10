import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { BarLoader } from "react-spinners";

import Root from "./root";
import Applications from "../../profile/components/Applications";
import SavedJobs from "../../profile/components/SavedJobs";
import SavedCompanies from "../../profile/components/SavedCompanies";
import Error from "../components/Error";

const Home = lazy(() => import("../../home/pages/Home"));
const SeekerProfile = lazy(() => import("../../profile/pages/SeekerProfile"));
const EmployerProfile = lazy(() =>
  import("../../profile/pages/EmployerProfile")
);
const ApplyJob = lazy(() => import("../../jobs/pages/ApplyJob"));
const Jobs = lazy(() => import("../../jobs/pages/Jobs"));
const JobDetails = lazy(() => import("../../jobs/pages/JobDetails"));
const SignUp = lazy(() => import("../../auth/pages/SignUp"));
const Login = lazy(() => import("../../auth/pages/Login"));
const NewJob = lazy(() => import("../../jobs/pages/NewJob"));
const Companies = lazy(() => import("../../companies/pages/Companies"));
const CompanyDetails = lazy(() =>
  import("../../companies/pages/CompanyDetails")
);

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <div className="loader_center">
                <BarLoader />
              </div>
            }
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/jobs",
        element: (
          <Suspense
            fallback={
              <div className="loader_center">
                <BarLoader />
              </div>
            }
          >
            <Jobs />
          </Suspense>
        ),
      },
      {
        path: "/jobs/:idOfJob",
        id: "job-details",
        loader: (meta) =>
          import("../../jobs/pages/JobDetails").then((m) => m.loader(meta)),
        children: [
          {
            index: true,
            element: (
              <Suspense
                fallback={
                  <div className="loader_center">
                    <BarLoader />
                  </div>
                }
              >
                <JobDetails />
              </Suspense>
            ),
          },
          {
            path: "apply",
            element: (
              <Suspense
                fallback={
                  <div className="loader_center">
                    <BarLoader />
                  </div>
                }
              >
                <ApplyJob />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/jobs/new",
        element: (
          <Suspense
            fallback={
              <div className="loader_center">
                <BarLoader />
              </div>
            }
          >
            <NewJob />
          </Suspense>
        ),
      },
      {
        path: "/companies",
        loader: (meta) =>
          import("../../companies/pages/Companies").then((m) => m.loader(meta)),
        id: "companies",
        element: (
          <Suspense
            fallback={
              <div className="loader_center">
                <BarLoader />
              </div>
            }
          >
            <Companies />
          </Suspense>
        ),
      },
      {
        path: "/companies/:companyId",
        loader: (meta) =>
          import("../../companies/pages/CompanyDetails").then((m) =>
            m.loader(meta)
          ),
        id: "company_details",
        element: (
          <Suspense
            fallback={
              <div className="loader_center">
                <BarLoader />
              </div>
            }
          >
            <CompanyDetails />
          </Suspense>
        ),
      },
      {
        path: "/em_profile",
        element: (
          <Suspense
            fallback={
              <div className="loader_center">
                <BarLoader />
              </div>
            }
          >
            <EmployerProfile />
          </Suspense>
        ),
      },
      {
        path: "/se_profile",
        element: (
          <Suspense
            fallback={
              <div className="loader_center">
                <BarLoader />
              </div>
            }
          >
            <SeekerProfile />
          </Suspense>
        ),
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
      {
        path: "signup",
        element: (
          <Suspense
            fallback={
              <div className="loader_center">
                <BarLoader />
              </div>
            }
          >
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense
            fallback={
              <div className="loader_center">
                <BarLoader />
              </div>
            }
          >
            <Login />
          </Suspense>
        ),
      },
    ],
  },
]);
