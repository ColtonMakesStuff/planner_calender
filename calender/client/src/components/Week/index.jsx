import classes from './index.module.css';
import { useState, useEffect } from 'react';
import DateRangeInfo from '../../utils/dateInfo';
import { Pencil } from '@phosphor-icons/react';
import { Note } from '@phosphor-icons/react';
import HandleIncrement from '../HandleIncrement';
import { useNavigate } from 'react-router-dom';


let testEventArray = [{
  title: "Haircut",
  date: "2024-02-01",
  startTime: "12:30am",
  endTime: "2pm",
  description: "this is a test event",
  location: "at the place in roseville",
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

const Week = ({ date }) => {
const navigate = useNavigate();
 const selectedDate = date;
 let myWeek = new DateRangeInfo({ selectedDate, range: "week" });

let range = myWeek.range;
 // Establish date info and get week info
 myWeek.establishDateInfo();
 let weekArray = myWeek.getWeekInfo();
 let weekNumber = myWeek.getWeekNumber();
 console.log(`
 ~~~~~~~~~~~~~~~~~
 week number: ${weekNumber}
 ~~~~~~~~~~~~~~~~~`);
 // Define days of the week
 const days = [ 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat','Sun'];
 const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

 // Initialize datesArray
 let datesArray = [];

 // Loop through weekArray to populate datesArray
 for (let i = 0; i < weekArray.length; i++) {
    let dateObject = {
      event: false,
      date: weekArray[i],
      day: +weekArray[i].match(/(\d{4})-(\d{2})-(\d{2})/)[3],
      events: []
    };

    // Loop through testEventArray to check if there are events on the current date
    for (let j = 0; j < testEventArray.length; j++) {
      if (weekArray[i] === testEventArray[j].date) {
        dateObject.event = true;
        dateObject.date = weekArray[i];
        dateObject.day = +weekArray[i].match(/(\d{4})-(\d{2})-(\d{2})/)[3];
        dateObject.events.push(testEventArray[j]);
      }
    }

    datesArray.push(dateObject);
 }

 // Generate day sections
 let daySections = [];
 for (let i = 0; i <= weekArray.length - 1; i++) {
    daySections.push(
      <div key={i} className="flex flex-row border-t border-b border-content w-full h-full hover:bg-accent-3 hover:cursor-pointer ">
        <div className="ml-8 flex flex-col font-light w-1/6">
          <p className='text-sm'>{days[i]}</p>
          <p>{+weekArray[i].match(/(\d{4})-(\d{2})-(\d{2})/)[3]}</p>
        </div>

        <div className=" flex flex-col pt pb text-xs ">
          <p className='text-sm' style={{ minHeight: '17px' }}>
            {datesArray[i].events[0]?.title || null}
          </p>

          <p style={{ minHeight: '17px' }}>
            {datesArray[i].events[0]?.startTime ? `${datesArray[i].events[0]?.startTime}-${datesArray[i].events[0]?.endTime}` : null}
          </p>

          <p style={{ minHeight: '17px' }}>
            {datesArray[i].events[0]?.location || null}
          </p>
        </div>

        <div className='ml-auto mr-8 mt-2'>
          <Pencil size={36} color="#563c1f" weight="thin" className='hover:bg-accent-1 p-1 rounded-md border border-transparent active:border active:border-bkg-1 hover:cursor-pointer active:p-1' />
        </div>
      </div>
    );
 }
console.log(selectedDate.match(/(\d{4})-(\d{2})-(\d{2})/)[2]-1)
 console.log(months[+selectedDate.match(/(\d{4})-(\d{2})-(\d{2})/)[2]-1])

 return (
    <div className="flex flex-col items-center text-content justify-center h-screen">
      <div className="flex flex-col w-4/5 md:w-2/5 h-18">
        <div className='flex mb-2 ml-7 mr-8 text-xl font-extralight justify-between'>
          <h2 className='hover:bg-accent-1 p-1 rounded-md border border-bkg-2 active:border active:border-accent-2 active:p-1 hover:cursor-pointer' onClick={()=> navigate(`/month/${myWeek.year}${myWeek.month}01`)}>{months[+selectedDate.match(/(\d{4})-(\d{2})-(\d{2})/)[2]-1]}</h2>
          <h2 className='text-sm mt-3'>week {weekNumber}</h2>
        </div>
        {daySections}
      </div>
      
         <h1 className='hover:bg-accent-1 border-2 border-transparent rounded-lg active:border-accent-2  cursor-pointer flex justify-center text-2xl font-thin mt-5 p-2 w-1/5' onClick={()=> navigate(`/year/${myWeek.year}0101`)}>{myWeek.year}</h1>
      <HandleIncrement date={date} range={range}/>

    </div>
 );
};

export default Week;
