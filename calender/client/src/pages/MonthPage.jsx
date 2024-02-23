import { useRouteError } from "react-router-dom";
import Month from "../components/Month";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { useEffect } from "react";
import { useState } from "react";


export default function MonthPage() {

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkedLogin, setCheckedLogin] = useState(false);
  
  useEffect(() => {
     if (Auth.loggedIn()) {
        setLoggedIn(true);
     }
     setCheckedLogin(true);

  }
  , []);
  
  useEffect(() => {
    console.log(checkedLogin);
    console.log(loggedIn);
      if (checkedLogin) {
        console.log(checkedLogin);
        if (!loggedIn) { 
          console.log(loggedIn);
          navigate('/login');
        }
      }
  }
  , [checkedLogin]);

  let { month } = useParams();
  let monthStr = month.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
  console.log(monthStr); // Outputs: 2024-01-01

  return (
    <>
    {
      loggedIn ? <> <p onClick={()=> Auth.logout() }>logout</p> <Month date={monthStr}/> </> : <p>...loading</p>
    }
    
    </>
  );
}