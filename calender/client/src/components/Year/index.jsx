import { useState, useEffect } from 'react';
import DateRangeInfo from '../../utils/dateInfo';
import classes from './index.module.css';
import { useParams } from "react-router-dom";

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
  date: "2024-02-02",
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

let myMonth = new DateRangeInfo({selectedDate: date, range: "week"});
console.log(myMonth.range);
console.log(myMonth.selectedDate)
myMonth.establishDateInfo()
const myMonths = myMonth.getMonthsInYear();
console.log(myMonths);
let firstDay = myMonth.getNameOfDay();
let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];  
let miniDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
let dateList = myMonth.getDatesInMonth();

//this part will set the layout of the calender
let monthSquares=[]
let monthAtAGlance = [];
let blanks;
let blanksArray;

for (let i = 0; i < myMonths.length; i++) {
    monthAtAGlance = [];
    let month = new DateRangeInfo({selectedDate: myMonths[i].dateString, range: "month"});
    month.establishDateInfo()
    firstDay = month.getNameOfDay();
    dateList = month.getDatesInMonth();
    let monthName = month.getNameOfMonth();

    console.log(dateList);
    blanks = days.indexOf(firstDay);
    blanksArray = Array(blanks).fill({
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
    const dateSquares = Array.from({ length: 42 }).map((_, j) => (
      <div 
         key={j} 
         style={monthAtAGlance[j]?.event ? {backgroundColor: '#46372b', color: '#fbe2c2', borderRadius: '5px'} : {}}
         className="flex items-end p-2 sm:p-3 aspect-w-1 aspect-h-1 m-1">
         <div className="flex flex-col justify-center h-full">
           <div className="flex justify-center"></div>
           <div className="mt-auto flex justify-center">
             <h2>{monthAtAGlance[j]?.day || ''}</h2>
           </div>
         </div>
      </div>
     ));
     
       
       const miniDaysDisplay = miniDays.map((day, index) => (
        <h3 key={`${day}-${index}`} className=" flex justify-center w-full">
          {day}
        </h3>
      ))



      let monthSquare = (
        <div className="flex flex-col text-content justify-center m-2 cursor-pointer hover:bg-accent-1 rounded-md border-2 border-transparent active:border-accent-2" onClick={() => console.log('lol')}>
        <p className='flex justify-center text-xl font-thin mt-5'>{monthName}</p>
            <div className="flex flex-row justify-between items-center w-5/6 w-full mx-auto font-light">
            {miniDaysDisplay}
            </div>
            <div className="grid grid-cols-7 gap-0 w-full  font-bold mx-auto">
            {dateSquares}
            </div>
            
        </div>)
    
        monthSquares.push(monthSquare);
}
console.log(monthSquares);


    return (
      <div className="mr-5 m1-5sm:mr-10 sm:ml-10 flex flex-col text-content justify-center m-2">
         <h1 className='flex justify-center text-2xl font-thin mt-5'>{myMonth.year}
         </h1>
         <div className=" text-xs sm:text-xs md:text-sm grid grid-cols-2 sm:grid-cols-3 gap-0 w-full  font-bold mx-auto">

            

        {monthSquares}
            


         </div>

      </div>
     )
     
}

export default Year;
