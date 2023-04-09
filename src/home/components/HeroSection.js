import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import lumina from '../../shared/assets/lumina.png'
import nexa from '../../shared/assets/nexa.png'
import vantage from '../../shared/assets/vantage.png'
import React from 'react'

const HeroSection = () => {
  return (
    <Grid
      container
      justifyContent="flex-end"
      alignItems="center"
      spacing={4}
      padding={3}
    >
      <Grid
        item
        lg={4.6}
        sx={{ display: 'flex', flexDirection: 'column', gap: '2em' }}
      >
        <Typography variant="h2" fontWeight="bold">
          Make the best move to choose your new job
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Our platform features a user-friendly interface and powerful search
          tools, making it easy to find the job that's right for you.
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <TextField placeholder="Enter Your Email" />
          <Button variant="contained" size="large">
            Get started!
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.2em' }}>
          <Typography
            variant="h6"
            sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
          >
            <AiOutlineCheckCircle fill="green" />
            Easy Application
          </Typography>
          <Typography
            variant="h6"
            sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
          >
            <AiOutlineCheckCircle fill="green" />
            Update everyday
          </Typography>
        </Box>
      </Grid>
      <Grid item lg={7} className="card_hero"></Grid>
      <Grid item lg={4.7}>
        <Box sx={{ width: '500px' }}>
          <Typography variant="h6" fontWeight="bold" align="left">
            Trusted by top tier companies
          </Typography>
          <hr />
          <Box className="boxCompany">
            <img src={lumina} alt="ico" />
            <img src={nexa} alt="ico" />
            <img src={vantage} alt="ico" />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default HeroSection
