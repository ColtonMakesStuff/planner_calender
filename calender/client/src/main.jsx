import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx'
import Home from './pages/oldPages/Home';
import Signup from './pages/oldPages/Signup';
import LoginPage from './pages/oldPages/LoginPage';
import SingleThought from './pages/oldPages/SingleThought';
import ErrorPage from './pages/ErrorPage';
import MonthPage from './pages/MonthPage.jsx';
import WeekPage from './pages/WeekPage.jsx';
import YearPage from './pages/YearPage.jsx';
import DayPage from './pages/DayPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <LoginPage />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/thoughts/:thoughtId',
        element: <SingleThought />
      }, 
      {
        path: '/year/:year',
        element: <YearPage />
      },{
        path: '/month/:month',
        element: <MonthPage />
      }, {
        path: '/week/:weekday',
        element: <WeekPage />
      }, {
        path: 'day/:day',
        element: <DayPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
