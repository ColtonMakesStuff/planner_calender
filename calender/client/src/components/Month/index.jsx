import classes from './index.module.css';
import { useState, useEffect } from 'react';
import DateRangeInfo from '../../utils/dateInfo';

let testEventArray = [{
  title: "test event",
  date: "2024-02-01",
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
  date: "2024-02-12",
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


const Month = ({date}) => {
 date = '2024-05-01';


let myMonth = new DateRangeInfo({selectedDate: date, range: "week"});
console.log(myMonth.range);
console.log(myMonth.selectedDate)
myMonth.establishDateInfo()

//this part will set the layout of the calender
console.log(myMonth.day);

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];  
let firstDay = myMonth.getNameOfDay();
let miniDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];


let blanksBeforeDates = Array(days.indexOf(firstDay)).fill(" ");
let numbers = Array.from({length: myMonth.daysInMonth}, (_, i) => i + 1);
let combinedArray = [...blanksBeforeDates, ...numbers];

let dateList = myMonth.getDatesInMonth();
console.log(dateList);

// handles resizing of the window
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
