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
  //WHEN GENERATING THE MONTH I NEED TO MAKE SURE THAT THE DATE BROUGHT IN IS THE FIRST OF THE MONTH
 date = '2024-02-01';

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


let myMonth = new DateRangeInfo({selectedDate: date, range: "week"});
console.log(myMonth.range);
console.log(myMonth.selectedDate)
myMonth.establishDateInfo()

//this part will set the layout of the calender
console.log(myMonth.day);

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];  
let firstDay = myMonth.getNameOfDay();
let miniDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
let dateList = myMonth.getDatesInMonth();
console.log(dateList);
let monthAtAGlance = [];
let blanks = days.indexOf(firstDay);
let blanksArray = Array(blanks).fill({
  event: false,
  day: ""
});

let datesArray=[]
for (let i = 0; i < dateList.length; i++) {
  let dateObject;
  dateObject = {
    event: false,
    date: dateList[i],
    day: + dateList[i].match(/(\d{4})-(\d{2})-(\d{2})/)[3],
  }
  // THIS NEEDS TO BE REFACTORED WHEN ACTUAL DATA IS BEING BROUGHT IN!!!!
  for (let j = 0; j < testEventArray.length; j++) {
    if (dateList[i] === testEventArray[j].date) {
      dateObject = {
        event: true,
        date: dateList[i],
        day: +dateList[i].match(/(\d{4})-(\d{2})-(\d{2})/)[3],
        events: testEventArray[j]
      }
    }
  }
  datesArray.push(dateObject)
}

monthAtAGlance = [...blanksArray, ...datesArray];


const dateSquares = Array.from({ length: 42 }).map((_, i) => (
  <div 
  key={i} 
  className={`flex items-end aspect-w-3 aspect-h-3 border border-black ${monthAtAGlance[i]?.day && monthAtAGlance[i].day >= 1 ? classes.valid_day : classes.invalid_day} cursor-pointer`}
  // HEY!!! this is where i need to add the onClick function to go to the week view
  onClick={() => {
     if (monthAtAGlance[i]?.day && monthAtAGlance[i].day >= 1) {
       console.log(monthAtAGlance[i].date);
     }
  }}
>
     <div className="flex flex-col justify-center h-full">
         <div className="flex justify-center" >
           {/* THIS NEEDS TO BE REFACTORED WHEN ACTUAL DATA IS BEING BROUGHT IN!!!! */}
           {monthAtAGlance[i]?.event ? <div className='w-[calc(3vw)] h-[calc(3vw)] rounded-full mt-1' style={{backgroundColor: 'black'}}></div> : <h3></h3>}
           {/* */}
         </div>
         <div className="mt-auto flex justify-center">
             <h2>{monthAtAGlance[i]?.day || ''}</h2>
         </div>
     </div>
  </div>
 ));
 



    return (
      <div className="flex flex-col  justify-center mt-10">
         <h1 className='flex justify-center text-2xl font-thin mb-5'>{myMonth.getNameOfMonth()}</h1>
        
         <div className="flex flex-row justify-between items-center w-5/6 md:w-3/4 mx-auto">
          {daysDisplay}
         </div>
         <div className="grid grid-cols-7 gap-0 w-5/6 md:w-3/4 mx-auto">
           {dateSquares}
         </div>
      </div>
     )
     
}

export default Month;
