import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { routes } from './shared/routes/routes'
import { JobProvider } from './shared/context/JobContext'
import './App.css'
import { AuthProvider } from './shared/context/AuthContext'

function App () {
  return (
    <>
      <AuthProvider>
        <JobProvider>
          <RouterProvider router={routes} />
        </JobProvider>
      </AuthProvider>
    </>
  )
}
export default App
