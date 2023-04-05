import {
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { jobtypes } from "../../shared/data/data";
import React from "react";

const NewJob = () => {
  return (
    <Container maxWidth="md" sx={{ padding: "60px", backgroundColor: "#fff" }}>
      <Card>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "40px",
            gap: "3em",
          }}
        >
          {/* Job Title */}
          <FormControl>
            <label htmlFor="">Job Title</label>
            <Typography color="textSecondary">
              Job titles must describe position
            </Typography>
            <TextField placeholder="Job Title" />
          </FormControl>

          {/* Job short description */}
          <FormControl>
            <label htmlFor="">Job description</label>
            <Typography color="textSecondary">
              Short description about job
            </Typography>
            <textarea style={{ height: "180px", resize: "none" }} />
          </FormControl>

          {/* Job Location */}
          <FormControl>
            <label htmlFor="">Job Location work</label>
            <Typography color="textSecondary">
              Job titles must describe location work
            </Typography>
            <RadioGroup>
              <FormControlLabel
                value="Remote"
                label="Remote"
                control={<Radio />}
              />
              <FormControlLabel
                value="Hybrid"
                label="Hybrid"
                control={<Radio />}
              />
              <FormControlLabel
                value="On-Site"
                label="On-Site"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>

          {/* Job type */}
          <FormControl>
            <label htmlFor="">Job type</label>
            <Typography color="textSecondary">
              You can select multiple job types
            </Typography>
            <RadioGroup>
              {jobtypes.map((type) => (
                <FormControlLabel
                  value={type.label}
                  label={type.label}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Location */}
          <FormControl>
            <label htmlFor="">Location</label>
            <Typography color="textSecondary">
              Enter location where is your position
            </Typography>
            <TextField placeholder="e.g, London.." />
          </FormControl>

          {/* Salary */}
          <FormControl>
            <label htmlFor="">Salary</label>
            <Typography color="textSecondary">
              Enter estimated salary for that job
            </Typography>
            <TextField placeholder="e.g, 2000" />
          </FormControl>

          {/* Seniority */}
          <FormControl>
            <label htmlFor="">Seniority</label>
            <Typography color="textSecondary">
              Enter estimated Seniority for that job
            </Typography>
            <RadioGroup>
              <FormControlLabel
                value="Junior"
                label="Junior"
                control={<Radio />}
              />
              <FormControlLabel
                value="Medior"
                label="Medior"
                control={<Radio />}
              />
              <FormControlLabel
                value="Senior"
                label="Senior"
                control={<Radio />}
              />
              <FormControlLabel
                value="Entry"
                label="Entry"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>

          {/* Requirements */}
          <FormControl>
            <label htmlFor="">Requirements</label>
            <Typography color="textSecondary">
              Add multiple requirements
            </Typography>
            <textarea className="textarea" placeholder="e.g," />
          </FormControl>

          {/* Job Description */}
          <FormControl>
            <label htmlFor="">Job Description </label>
            <Typography color="textSecondary">Add Description</Typography>
            <textarea className="textarea" placeholder="e.g," />
          </FormControl>
          <Button variant="contained">Post</Button>
        </form>
      </Card>
    </Container>
  );
};

export default NewJob;
