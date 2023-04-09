import React, { useContext, useState } from 'react'
import logo from '../../shared/assets/logo.png'
import {
  Button,
  Card,
  Container,
  FormControl,
  Typography
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useFormHook } from '../../shared/hooks/useForm'
import Input from '../../shared/components/Input'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH
} from '../../shared/util/Validators'
import { AuthContext } from '../../shared/context/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
  const [isType, setisType] = useState(false)
  const { login } = useContext(AuthContext)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [formState, inputHandler, setFormData] = useFormHook(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  )

  const switchAccTypeLogin = () => {
    if (isType) {
      setFormData(
        {
          ...formState.inputs,
          em_email: {
            value: '',
            isValid: false
          },
          em_password: {
            value: '',
            isValid: false
          }
        },
        false
      )
    } else {
      setFormData(
        {
          ...formState.inputs,
          em_email: undefined,
          em_password: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      )
    }

    setisType(!isType)
  }

  const submitLoginHandler = async (e) => {
    e.preventDefault()

    if (isType) {
      try {
        const response = await fetch(
          'http://localhost:8000/api/employer/login',
          {
            method: 'POST',
            body: JSON.stringify({
              em_email: formState.inputs.em_email.value,
              em_password: formState.inputs.em_password.value
            }),
            headers: { 'Content-Type': 'application/json' }
          }
        )
        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(responseData.message)
        }
        login(responseData.employerId, responseData.token)
        localStorage.setItem('type', JSON.stringify(responseData.type))
        navigate('/')
      } catch (err) {
        setError(err.message)
      }
    } else {
      try {
        const response = await fetch('http://localhost:8000/api/seeker/login', {
          method: 'POST',
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          headers: { 'Content-Type': 'application/json' }
        })
        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(responseData.message)
        }
        login(responseData.seekerId, responseData.token)
        navigate('/')
      } catch (err) {
        setError(err.message)
      }
    }
  }

  if (error) {
    toast.error(error)
  }

  return (
    <Container maxWidth="xs">
      <ToastContainer />
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <Card
        sx={{
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '60px'
        }}
      >
        <Typography variant="h4">
          Login as {isType ? 'Employer' : 'Seeker'}
        </Typography>
        <Typography variant="p">
          Dont have account?{' '}
          <Link to="/auth/signup" className="link">
            Register
          </Link>
        </Typography>
        <form className="login_form" onSubmit={submitLoginHandler}>
          {!isType && (
            <FormControl>
              <label>Seeker Email</label>
              <Input
                placeholder="email"
                onInput={inputHandler}
                validators={[VALIDATOR_EMAIL()]}
                type="email"
                id="email"
                errorText="Please enter valid email"
              />
            </FormControl>
          )}
          {!isType && (
            <FormControl>
              <label>Seeker Password</label>
              <Input
                placeholder="password"
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(6)]}
                type="password"
                id="password"
                errorText="Please enter valid password"
              />
            </FormControl>
          )}

          {isType && (
            <FormControl>
              <label>Employer Email</label>
              <Input
                placeholder="email"
                onInput={inputHandler}
                validators={[VALIDATOR_EMAIL()]}
                type="email"
                id="em_email"
                errorText="Please enter valid email"
              />
            </FormControl>
          )}

          {isType && (
            <FormControl>
              <label>Employer Password</label>
              <Input
                placeholder="password"
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(6)]}
                type="password"
                id="em_password"
                errorText="Please enter valid password"
              />
            </FormControl>
          )}
          <Button type="submit" variant="contained">
            Login
          </Button>
        </form>
        <Button variant="outlined" onClick={switchAccTypeLogin}>
          Login as {isType ? 'Seeker' : 'Employer'}
        </Button>
      </Card>
    </Container>
  )
}

export default Login
