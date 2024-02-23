import { useRouteError } from "react-router-dom";
import Week from "../components/Week";
import { useParams } from "react-router-dom";
import HandleIncrement from "../components/HandleIncrement";
import { useNavigate } from 'react-router-dom';

import Auth from '../utils/auth';
import { useEffect } from "react";
import { useState } from "react";

export default function WeekPage() {
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

  let { weekday } = useParams();
  let weekdayStr = weekday.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
  console.log(weekdayStr); 
  

  return (
<>
 { loggedIn ? <> <p onClick={()=> Auth.logout() }>logout</p> <Week date={weekdayStr}/> </>: <p>...loading</p> }
</>

  );
}