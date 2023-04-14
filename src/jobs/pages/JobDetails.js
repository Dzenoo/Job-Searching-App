import React, { useState } from "react";
import { Link, json, useParams, useRouteLoaderData } from "react-router-dom";
import { Box, Typography, Container, Button } from "@mui/material";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineSave } from "react-icons/ai";
import { RiChatDeleteLine } from "react-icons/ri";
import { MdOutlineHomeWork } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { BarLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

const JobDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const data = useRouteLoaderData("job-details");
  const job = data.job;
  const jobId = useParams().idOfJob;
  const seeker = JSON.parse(localStorage.getItem("seeker"));
  const employer = JSON.parse(localStorage.getItem("employer"));

  const saveJobHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/jobs/${seeker._id}/${jobId}/save`,
        {
          method: "POST",
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      } else {
        toast.success("You are save job");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteJobHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/jobs/${employer._id}/${jobId}/delete`,
        {
          method: "DELETE",
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      toast.success("You are deleted job");
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loader_center">
        <BarLoader />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Container
        maxWidth="lg"
        sx={{
          border: "1px solid #1482e8",
          borderRadius: "30px",
          padding: "40px",
          marginBottom: "100px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          <div className="profile_img">
            {job.employer.em_name.substring(0, 2)}
          </div>
          <div className="job_details_titles">
            <Typography variant="h5" fontWeight="bold" color="textPrimary">
              {job.title}
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
                to={`/companies/${job.employer._id}`}
                style={{ textDecoration: "none" }}
              >
                {job.employer.em_name}
              </Link>
            </Typography>

            <Typography variant="h6" color="textPrimary">
              <CiLocationOn /> {job.city}, <b>{job.schedule}</b>
            </Typography>
          </div>
          <div className="save_button_div">
            {!employer && (
              <Button onClick={saveJobHandler}>
                <AiOutlineSave size={40} />
              </Button>
            )}
            {employer && employer._id === job.employer._id && (
              <Button onClick={deleteJobHandler}>
                <RiChatDeleteLine size={40} fill="red" />
              </Button>
            )}
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
              {job.time}
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
              {job.salary}
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
              {job.level}
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
              {job.applicians.length}
            </Typography>
          </Box>
        </ul>
        <Box sx={{ marginTop: "60px" }}>
          <Typography variant="p" color="gray">
            {job.shortDescription}
          </Typography>
        </Box>
        <Box sx={{ marginTop: "30px" }}>
          <Typography variant="h5" fontWeight="bold" color="textPrimary">
            Skills and Expertise
          </Typography>
          <ul className="skills_list">
            {job.skills.split(",").map((s) => (
              <li key={s}>
                <Typography fontWeight="bold">{s}</Typography>
              </li>
            ))}
          </ul>
        </Box>
        <Box sx={{ marginTop: "40px" }}>
          <Typography variant="h4" fontWeight="bold" color="textPrimary">
            Job Description
          </Typography>
          <ul className="list_description">
            {job.jobDescription.split("\n").map((jd) => (
              <li key={jd}>
                <Typography
                  sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  {jd}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="textPrimary">
            Requirements
          </Typography>
          <ul className="list_description">
            {job.requirements.split("\n").map((t) => (
              <li key={t}>
                <Typography
                  sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  {t}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
        {!employer && (
          <Link to="apply">
            <Button
              variant="contained"
              size="large"
              sx={{ marginTop: "40px" }}
              fullWidth
            >
              Apply
            </Button>
          </Link>
        )}
      </Container>
    </>
  );
};

export default JobDetails;

export async function loader({ params }) {
  const jobId = params.idOfJob;

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/jobs/${jobId}`
  );

  if (!response.ok) {
    throw json({ message: "Could not fetch job" }, { status: 500 });
  } else {
    return response;
  }
}
