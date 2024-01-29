import { useState, useEffect } from 'react';
import DateRangeInfo from '../../utils/dateInfo';
import classes from './index.module.css';

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

// 

const Year = ({date}) => {
  //WHEN GENERATING THE MONTH I NEED TO MAKE SURE THAT THE DATE BROUGHT IN IS THE FIRST OF THE MONTH
 date = '2024-02-01';

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
  className={`flex items-end aspect-w-3 aspect-h-3 ${monthAtAGlance[i]?.day && monthAtAGlance[i].day >= 1 ? classes.valid_day : classes.invalid_day} cursor-pointer`}
  // HEY!!! this is where i need to add the onClick function to go to the week view
  onClick={() => {
     if (monthAtAGlance[i]?.day && monthAtAGlance[i].day >= 1) {
       console.log(monthAtAGlance[i].date);
     }
  }}
>
     <div className="flex flex-col justify-center h-full">
         <div className="flex justify-center" >
         </div>
         <div className="mt-auto flex justify-center">
             <h2>{monthAtAGlance[i]?.day || ''}</h2>
         </div>
     </div>
  </div>
 ));
 
 const miniDaysDisplay = miniDays.map((day, index) => (
  <h3 key={`${day}-${index}`} className=" flex justify-center w-full">
    {day}
  </h3>
))



    return (
      <div className="flex flex-col text-content justify-center mt-10">
         <h1 className='flex justify-center text-2xl font-thin mb-5'>{myMonth.getNameOfMonth()}</h1>
        
         <div className="flex flex-row justify-between items-center w-5/6 md:w-3/4 mx-auto">
          {miniDaysDisplay}
         </div>
         <div className="grid grid-cols-7 gap-0 w-5/6 md:w-3/4 mx-auto">
           {dateSquares}
         </div>
         <h1 className='flex justify-center text-2xl font-thin mt-5'>{myMonth.year}</h1>
      </div>
     )
     
}

export default Year;