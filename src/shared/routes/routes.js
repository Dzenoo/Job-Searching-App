import { createBrowserRouter } from "react-router-dom";
import Home from "../../home/pages/Home";
import Jobs from "../../jobs/pages/Jobs";
import JobDetails from "../../jobs/pages/JobDetails";
import EditJob from "../../jobs/pages/EditJob";
import NewJob from "../../jobs/pages/NewJob";
import Auth from "../../auth/pages/Auth";
import Companies from "../../companies/pages/Companies";
import Root from "./root";

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
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);
