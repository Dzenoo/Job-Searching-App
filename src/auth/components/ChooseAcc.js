import React from 'react'
import { Box, Typography } from '@mui/material'
import hire from '../../shared/assets/hire_icon.png'
import seek from '../../shared/assets/seeker_icon.png'
import PropTypes from 'prop-types'

const ChooseAcc = ({ isSelected, setSelectedAcc }) => {
  return (
    <>
      <Typography variant="h4" color="darkblue">
        Employer or Seeker
      </Typography>
      <Typography>
        To get started, please select whether you are an employer or job seeker.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '40px'
        }}
      >
        <div
          className={`${
            isSelected === 'Employer Account' ? 'card selectedCard' : 'card'
          }`}
          onClick={() => setSelectedAcc('Employer Account')}
        >
          <img src={hire} alt="hire" />
          <Typography fontWeight="bold">Employer Account</Typography>
          <Typography color="textSecondary">
            Find appliciants for you <br />
            available positions
          </Typography>
        </div>
        <div
          className={`${
            isSelected === 'Seeker Account' ? 'card selectedCard' : 'card'
          }`}
          onClick={() => setSelectedAcc('Seeker Account')}
        >
          <img src={seek} alt="hire" />
          <Typography fontWeight="bold">Seeker Account</Typography>
          <Typography color="textSecondary">
            Find job that fits your <br />
            experience and skills
          </Typography>
        </div>
      </Box>
    </>
  )
}

export default ChooseAcc

ChooseAcc.propTypes = {
  isSelected: PropTypes.string,
  setSelectedAcc: PropTypes.func
}
