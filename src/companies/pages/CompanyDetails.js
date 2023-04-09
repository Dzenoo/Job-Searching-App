import React from "react";
import { json, Link, useRouteLoaderData } from "react-router-dom";
import {
  AiOutlineDollarCircle,
  AiOutlineFieldTime,
  AiOutlineStar,
} from "react-icons/ai";
import { Card, Container, Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";

const CompanyDetails = () => {
  const [currentTab, setcurrentTab] = useState(0);
  const data = useRouteLoaderData("company_details");
  const currentCompany = data.company;

  return (
    <Container maxWidth="md">
      <Card sx={{ padding: "30px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img src={currentCompany.em_image} alt={currentCompany.em_name} />
          <div>
            <Typography variant="h4">{currentCompany.em_name}</Typography>
            <Typography
              variant="p"
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <AiOutlineDollarCircle fill="green" size={30} />
              {currentCompany.em_salary}
            </Typography>
            <Typography
              variant="p"
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <AiOutlineStar fill="orange" size={30} />
              {currentCompany.em_rating}
            </Typography>
            <Typography
              variant="p"
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              Employees: {currentCompany.em_employees}
            </Typography>
          </div>
        </Box>
        <div className="jobs_of_company">
          <Button onClick={() => setcurrentTab(0)}>About Company</Button>
          <Button onClick={() => setcurrentTab(1)}>
            Jobs ({currentCompany.em_jobs.length})
          </Button>
        </div>
      </Card>
      {currentTab === 0 && (
        <Box sx={{ padding: "20px", wordBreak: "break-word" }}>
          <Typography variant="h4">About company</Typography>
          <Typography variant="p" color="textSecondary">
            {currentCompany.em_biography}
          </Typography>
        </Box>
      )}
      {currentTab === 1 && (
        <Box sx={{ padding: "30px" }}>
          <Typography variant="h4">Jobs</Typography>
          <div className="flex">
            {currentCompany.em_jobs.map((job) => (
              <Card
                sx={{
                  padding: "30px",
                  width: "300px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
                key={job._id}
              >
                <Typography variant="h5" fontWeight="bold">
                  {job.title}
                </Typography>
                <Typography
                  className="aligncenter"
                  variant="p"
                  fontWeight="bold"
                >
                  <CiLocationOn size={24} /> {job.city}
                </Typography>
                <Typography
                  className="aligncenter"
                  variant="p"
                  fontWeight="bold"
                >
                  <AiOutlineFieldTime size={24} fill="red" /> {job.level}
                </Typography>
                <Button variant="contained">
                  <Link className="link" to={`/jobs/${job._id}`}>
                    View job
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </Box>
      )}
    </Container>
  );
};

export default CompanyDetails;

export async function loader({ params }) {
  const companyId = params.companyId;
  const response = await fetch(
    `http://localhost:8000/api/employer/companies/${companyId}`
  );

  if (!response.ok) {
    throw json({ message: "Could not fetch company" }, { status: 500 });
  } else {
    return response;
  }
}
