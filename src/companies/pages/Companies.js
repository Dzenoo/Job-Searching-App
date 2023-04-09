import React from "react";
import CompanyList from "../components/CompanyList";
import { Typography } from "@mui/material";
import { json, useRouteLoaderData } from "react-router-dom";

const Companies = () => {
  const data = useRouteLoaderData("companies");

  return (
    <>
      <div className="company_header">
        <Typography variant="h3" color="#fff">
          Companies on our platform
        </Typography>
        <Typography variant="p" color="#fff">
          Here, you can explore a variety of top-rated companies and their job
          opportunities.
          <br />
          Our platform features companies from various industries, so you can
          find the perfect fit for your career goals.
        </Typography>
      </div>
      <div className="company_list_main">
        <CompanyList companies={data.companies} />
      </div>
    </>
  );
};

export default Companies;

export async function loader() {
  const response = await fetch("http://localhost:8000/api/employer/companies");

  if (!response.ok) {
    throw json({ message: "Could not fetch companies" }, { status: 500 });
  } else {
    return response;
  }
}
