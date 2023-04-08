import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, Container, Button } from "@mui/material";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineSave } from "react-icons/ai";
import { MdOutlineHomeWork } from "react-icons/md";
import { JobContext } from "../../shared/context/JobContext";

const JobDetails = () => {
  const jobId = useParams().idOfJob;
  const { jobs } = useContext(JobContext);
  const currentJob = jobs.find((j) => j.id === jobId);
  const userData = JSON.parse(localStorage.getItem("employer"));

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          border: "1px solid #1482e8",
          borderRadius: "30px",
          padding: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            position: "relative",
          }}
        >
          <img src={userData.em_image} alt={currentJob.title} />
          <div className="job_details_titles">
            <Typography variant="h3" color="textPrimary">
              {currentJob.title}
            </Typography>
            <Typography
              variant="p"
              color="textSecondary"
              fontWeight="bold"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "17px",
                position: "relative",
              }}
            >
              <MdOutlineHomeWork size={20} />
              <Link
                to={`/companies/${currentJob._id}`}
                style={{ textDecoration: "none" }}
              >
                {userData.em_name}
              </Link>
            </Typography>

            <Typography variant="h5" color="textPrimary">
              <CiLocationOn /> {currentJob.city}, {currentJob.schedule}
            </Typography>
          </div>
          <div className="save_button_div">
            <Button>
              <AiOutlineSave size={40} />
            </Button>
          </div>
        </Box>
        <ul className="job_details_list">
          <Box
            sx={{
              backgroundColor: "rgba(205, 9, 195, 0.148)",
              padding: "30px",
              borderRadius: "30px",
              border: "2px solid rgba(205, 9, 195, 0.148) ",
              textAlign: "center",
              width: "200px",
            }}
          >
            <h3>Job type</h3>
            <Typography color="purple" fontWeight="bold">
              {currentJob.time}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "rgba(23, 240, 81, 0.148)",
              padding: "30px",
              borderRadius: "30px",
              border: "2px solid rgba(23, 240, 81, 0.148) ",
              textAlign: "center",
              width: "200px",
            }}
          >
            <h3>Salary</h3>
            <Typography color="green" fontWeight="bold">
              {currentJob.salary}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "rgba(25, 74, 236, 0.148)",
              padding: "30px",
              borderRadius: "30px",
              border: "2px solid rgba(25, 74, 236, 0.148) ",
              textAlign: "center",
              width: "200px",
            }}
          >
            <h3>Seniority</h3>
            <Typography color="royalblue" fontWeight="bold">
              {currentJob.level}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "rgba(236, 219, 32, 0.228)",
              padding: "30px",
              borderRadius: "30px",
              border: "2px solid rgba(236, 219, 32, 0.228)",
              maxWidth: "200px",
              textAlign: "center",
            }}
          >
            <h3>Number of applicans</h3>
            <Typography color="orange" fontWeight="bold">
              20
            </Typography>
          </Box>
        </ul>
        <Box sx={{ marginTop: "60px" }}>
          <Typography variant="p" color="gray">
            {currentJob.shortDescription}
          </Typography>
        </Box>
        <Box sx={{ marginTop: "30px" }}>
          <Typography variant="h4" fontWeight="bold" color="textPrimary">
            Skills and Expertise
          </Typography>
          <ul className="skills_list">
            {currentJob.skills.split(",").map((s) => (
              <li>
                <Typography>{s}</Typography>
              </li>
            ))}
          </ul>
        </Box>
        <Box sx={{ marginTop: "40px" }}>
          <Typography variant="h4" fontWeight="bold" color="textPrimary">
            Job Description
          </Typography>
          <ul className="list_description">
            {currentJob.jobDescription.split(",").map((jd) => (
              <li>
                <Typography> {jd}</Typography>
              </li>
            ))}
          </ul>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="textPrimary">
            Requirements
          </Typography>
          <ul className="list_description">
            {currentJob.requirements.split(",").map((t) => (
              <li>
                <Typography>{t}</Typography>
              </li>
            ))}
          </ul>
        </Box>

        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: "40px" }}
          fullWidth
        >
          Apply
        </Button>
      </Container>
    </>
  );
};

export default JobDetails;
