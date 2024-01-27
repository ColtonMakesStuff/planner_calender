import classes from './index.module.css';
import { useState, useEffect } from 'react';
import DateRangeInfo from '../../utils/dateInfo';


const Month = () => {

let testDate = '2024-2-06';


let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30];
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];  
let firstDay = "Monday";
let miniDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const [windowSize, setWindowSize] = useState("");

useEffect(() => {
    const handleResize = () => {
        setWindowSize(''); // Reset the state to an empty array
        if (window.innerWidth > 768) {
            setWindowSize('large');
        } else {
            setWindowSize('small');
        }
    };

    // Call the function immediately to set the initial state
    handleResize();

    // Add the event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);

const [daysDisplay, setDaysDisplay] = useState([]);

useEffect(() => {
 switch (windowSize) {
    case "small":
      setDaysDisplay(miniDays.map((day, index) => (
        <h3 key={`${day}-${index}`} className=" flex justify-center w-full">
          {day}
        </h3>
      )));
      break;
    case "large":
      setDaysDisplay(days.map((day, index) => (
        <h3 key={`${day}`} className=" flex justify-center w-full">
          {day}
        </h3>
      )));
      break;
 }
}, [windowSize]);


let testEventArray = [{
  title: "test event",
  date: "2021-10-01",
  startTime: "12:00",
  endTime: "13:00",
  description: "this is a test event",
  location: "test location",
  color: "red",
  allDay: false,
  recurring: false,
  recurringDays: [],
  recurringEnds: false,
  recurringFrequency: "",
  recurringStartDate: "",
  recurringEndDate: "",
  recurringType: "",
  userId: "6160b4b4b8b7d4b4a0f3b3b4",
  __typename: "Event"
},
{
  title: "test event",
  date: "2021-10-02",
  startTime: "12:00",
  endTime: "13:00",
  description: "this is a test event",
  location: "test location",
  color: "red",
  allDay: false,
  recurring: false,
  recurringDays: [],
  recurringEnds: false,
  recurringFrequency: "",
  recurringStartDate: "",
  recurringEndDate: "",
  recurringType: "",
  userId: "6160b4b4b8b7d4b4a0f3b3b4",
  __typename: "Event"
},

]

// i need to find out waht day of the week the first day of the month is on and then i need to add the correct number of blank spaces to the beginning of the array

let blanksBeforeNumbers = Array(days.indexOf(firstDay)).fill(" ");

let combinedArray = [...blanksBeforeNumbers, ...numbers];


    const squares = Array.from({ length: 42 }).map((_, i) => (
        <div key={i} className="flex items-end aspect-w-3 aspect-h-3 border border-black">
         
          <div className="flex flex-col justify-center h-full">
              <div className="flex justify-center" >
              </div>
              <div className="mt-auto flex justify-center">
                  <h2>{combinedArray[i]}</h2>
              </div>
          </div>
        </div>
    ));

    return (
      <div className="flex flex-col  justify-center mt-10">
         <div className="flex flex-row justify-between items-center w-5/6 md:w-3/4 mx-auto">
          {daysDisplay}
         </div>
         <div className="grid grid-cols-7 gap-0 w-5/6 md:w-3/4 mx-auto">
           {squares}
         </div>
      </div>
     )
     
}

export default Month;
