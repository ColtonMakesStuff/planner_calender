import Year from "../components/Year";
import { useParams } from "react-router-dom";
import Auth from '../utils/auth';
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';



export default function YearPage() {


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

 let { year } = useParams();

 if (year === undefined) {
   let currentDate = new Date();
   year = currentDate.getFullYear();
   year = `${year}0101`
 }

 let yearStr = year.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
 console.log(yearStr); // Outputs: 2024-01-01



 return (
    <>
    { loggedIn ? <> <p onClick={()=> Auth.logout() }>logout</p> <Year date={yearStr}/></> : <p>...loading</p> }
    </>
 );
}
