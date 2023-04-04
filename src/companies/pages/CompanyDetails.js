import React from "react";
import { companies, JOBSLIST } from "../../shared/data/data";
import { Link, useParams } from "react-router-dom";
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
  const compId = useParams().companyId;
  const currentCompany = companies.find((c) => c.id === compId);
  const companyJobs = JOBSLIST.find((j) => j.company === currentCompany.name);

  return (
    <Container maxWidth="md">
      <Card sx={{ padding: "30px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img src={currentCompany.logo} alt={currentCompany.name} />
          <div>
            <Typography variant="h4">{currentCompany.name}</Typography>
            <Typography
              variant="p"
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <AiOutlineDollarCircle fill="green" size={30} />
              {currentCompany.salary}
            </Typography>
            <Typography
              variant="p"
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <AiOutlineStar fill="orange" size={30} />
              {currentCompany.rating}
            </Typography>
          </div>
        </Box>
        <div className="jobs_of_company">
          <Button onClick={() => setcurrentTab(0)}>About Company</Button>
          <Button onClick={() => setcurrentTab(1)}>
            Jobs ({currentCompany.jobs})
          </Button>
        </div>
      </Card>
      {currentTab === 0 && (
        <Box sx={{ padding: "20px" }}>
          <Typography variant="h4">About company</Typography>
          <Typography variant="p" color="textSecondary">
            {currentCompany.bio}
          </Typography>
        </Box>
      )}
      {currentTab === 1 && (
        <Box sx={{ padding: "30px" }}>
          <Typography variant="h4">Jobs</Typography>
          <Card
            sx={{
              padding: "30px",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {companyJobs.title}
            </Typography>
            <Typography className="aligncenter" variant="p" fontWeight="bold">
              <CiLocationOn size={24} /> {companyJobs.city}
            </Typography>
            <Typography className="aligncenter" variant="p" fontWeight="bold">
              <AiOutlineFieldTime size={24} fill="red" /> {companyJobs.level}
            </Typography>
            <Button variant="contained">
              <Link className="link" to={`/jobs/${companyJobs.id}`}>
                View job
              </Link>
            </Button>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default CompanyDetails;
