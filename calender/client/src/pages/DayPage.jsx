import Day from "../components/Day";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { useEffect } from "react";
import { useState } from "react";


export default function DayPage() {
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
    if (checkedLogin) {
      if (!loggedIn) {
       navigate('/login');
      }
    }
   console.log(loggedIn);
}



, [checkedLogin]);

 let { day } = useParams();
 let dayStr = day.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
 console.log(dayStr); // Outputs: 2024-01-01

 return (
   <>
  
   {loggedIn ? <> <p onClick={()=> Auth.logout() }>logout</p> <Day date={dayStr}/> </> : <p>...loading</p>}
    </>
 );
}
