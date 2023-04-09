import { createBrowserRouter } from 'react-router-dom'
import Home from '../../home/pages/Home'
import Jobs from '../../jobs/pages/Jobs'
import JobDetails, { loader as jobLoader } from '../../jobs/pages/JobDetails'
import EditJob from '../../jobs/pages/EditJob'
import NewJob from '../../jobs/pages/NewJob'
import Companies, {
  loader as companiesLoader
} from '../../companies/pages/Companies'
import Root from './root'
import CompanyDetails, {
  loader as companyLoader
} from '../../companies/pages/CompanyDetails'
import SignUp from '../../auth/pages/SignUp'
import Login from '../../auth/pages/Login'
import SeekerProfile from '../../profile/pages/SeekerProfile'
import EmployerProfile from '../../profile/pages/EmployerProfile'
import Applications from '../../profile/components/Applications'
import SavedJobs from '../../profile/components/SavedJobs'
import SavedCompanies from '../../profile/components/SavedCompanies'
import Error from '../components/Error'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/jobs',
        element: <Jobs />
      },
      {
        path: '/jobs/:idOfJob',
        id: 'job-details',
        loader: jobLoader,
        children: [
          {
            index: true,
            element: <JobDetails />
          },
          {
            path: 'edit',
            element: <EditJob />
          }
        ]
      },
      {
        path: '/jobs/new',
        element: <NewJob />
      },
      {
        path: '/companies',
        loader: companiesLoader,
        id: 'companies',
        element: <Companies />
      },
      {
        path: '/companies/:companyId',
        loader: companyLoader,
        id: 'company_details',
        element: <CompanyDetails />
      },
      {
        path: '/em_profile',
        element: <EmployerProfile />
      },
      {
        path: '/se_profile',
        element: <SeekerProfile />
      },
      {
        path: '/se_profile/applications',
        element: <Applications />
      },
      {
        path: '/se_profile/saved-jobs',
        element: <SavedJobs />
      },
      {
        path: '/se_profile/saved-companies',
        element: <SavedCompanies />
      }
    ]
  },
  {
    path: '/auth',
    id: 'auth',
    children: [
      { path: 'signup', element: <SignUp /> },
      { path: 'login', element: <Login /> }
    ]
  }
])
