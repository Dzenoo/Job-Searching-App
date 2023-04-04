import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./shared/routes/routes";
import { JobProvider } from "./shared/context/JobContext";
import "./App.css";

function App() {
  return (
    <>
      <JobProvider>
        <RouterProvider router={routes} />
      </JobProvider>
    </>
  );
}
export default App;
