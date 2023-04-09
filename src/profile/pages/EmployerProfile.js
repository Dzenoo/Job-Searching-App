import { Box, Card, Container, Grid, Typography } from '@mui/material'
import React from 'react'

const ProfilePage = () => {
  const employerData = JSON.parse(localStorage.getItem('employer'))

  return (
    <Container sx={{ padding: '60px' }} maxWidth="md">
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '20px'
        }}
      >
        <img
          src={employerData.em_image}
          alt="profileimg"
          style={{ width: '160px', borderRadius: '60%' }}
        />
        <Box>
          <Typography variant="p">Its nice to see you here</Typography>
          <Typography variant="h4">{employerData.em_name}</Typography>
          <Typography variant="p" color="gray">
            {employerData.em_email}
          </Typography>
        </Box>
      </Card>
      <Grid container justifyContent="center" spacing={2} padding={6}>
        <Grid item>
          <Typography variant="h4">Biography</Typography>
          <Typography sx={{ wordBreak: 'break-word' }}>
            {employerData.em_biography}
          </Typography>
        </Grid>
        <Grid item>Jobs</Grid>
        <Grid item></Grid>
      </Grid>
    </Container>
  )
}

export default ProfilePage
