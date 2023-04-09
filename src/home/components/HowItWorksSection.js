import { Box, Container, Grid, Typography } from '@mui/material'
import howItWorks from '../../shared/assets/getting_started.png'
import React from 'react'

const HowItWorksSection = () => {
  return (
    <Container maxWidth="xl" sx={{ paddingTop: '60px' }}>
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <span className="button_outlined">How It works</span>
        <Typography variant="h2" color="textPrimary" fontWeight="bold">
          Getting Started is easy
        </Typography>
        <Typography variant="p" color="textSecondary">
          Get started with our job searching app in just a few simple
          <br />
          steps. Sign up, create your profile, and start browsing job
          <br />
          opportunities from top companies today.
        </Typography>
      </Box>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          border: '1px solid #1482e8',
          marginTop: '30px',
          borderRadius: '60px'
        }}
      >
        <Grid item lg={7}>
          <img className="howitworksimg" src={howItWorks} alt="how" />
        </Grid>
        <Grid item lg={4}>
          <Box
            sx={{
              display: 'flex',
              gap: '1em',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h4" color="initial" fontWeight="bold">
              Fill your Personal Data
            </Typography>
            <Typography variant="p" color="textSecondary">
              Start your job search off on the right foot by creating your
              profile. Fill in your personal data, including your work
              experience, skills, and education.
              <hr />
            </Typography>
            <ol>
              <li>
                <b>More Accurate: </b>
                <Typography variant="h6" color="textSecondary">
                  Personal data helps the app recommend more relevant job
                  opportunities.
                </Typography>
              </li>
              <li>
                <b>Faster Applications: </b>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  fontWeight="normals"
                >
                  Filling out your data once saves time on future job
                  applications.
                </Typography>
              </li>
            </ol>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default HowItWorksSection
