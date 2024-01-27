import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import LoginPage from './pages/LoginPage';
import SingleThought from './pages/SingleThought';
import ErrorPage from './pages/ErrorPage';
import CalenderHome from './pages/CalenderHome';

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
      }, {
        path: 'CalenderHome',
        element: <CalenderHome />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
