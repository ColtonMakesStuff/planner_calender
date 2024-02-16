import classes from './index.module.css';
import { useState, useEffect } from 'react';
import DateRangeInfo from '../../utils/dateInfo';
import { Pencil } from '@phosphor-icons/react';
import { Note } from '@phosphor-icons/react';
import HandleIncrement from '../HandleIncrement';
import { useNavigate } from 'react-router-dom';
import Day from '../Day';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT_BY_USERNAME } from '../../utils/queries';
import Auth from '../../utils/auth';
import { Circle } from '@phosphor-icons/react';
import { useParams } from 'react-router-dom';



const Week = ({ date }) => {
const navigate = useNavigate();
 const selectedDate = date;
 let myWeek = new DateRangeInfo({ selectedDate, range: "week" });
 const username = Auth.getProfile().data.username

 const params = useParams();

  // Initialize your state variable with the parameter value
  const [paramValue, setParamValue] = useState(params);

  // If you need to update the state when the parameter changes,
  // you can use the useEffect hook
  useEffect(() => {
    setParamValue(params)
    console.log(params);
  }, [params]);

const [events, setEvents] = useState([]);
const [dataFromQuery, setDataFromQuery] = useState([]);
const [eventDate, setEventDate ] = useState(date)
const [waitForContent, setWaitForContent] = useState(true);
const [daySections, setDaySections] = useState([]);

const { loading, data } = useQuery(QUERY_EVENT_BY_USERNAME, {
  variables: { username }
});

useEffect(() => {
//I NEED TO RERENDER THE PAGE WHEN THE PARAMS CHANGE

}, [paramValue]); // Add loading to the dependency array to respond to loading state changes


useEffect(() => {
  if (!loading && data) {
    console.log(data)
    setDataFromQuery(data);
  }
}, [loading, data]); // Add loading to the dependency array to respond to loading state changes

 useEffect(() => {
    if (dataFromQuery.eventsByUsername) {
   console.log(dataFromQuery.eventsByUsername);
   console.log(dataFromQuery.eventsByUsername);
   setEvents(dataFromQuery.eventsByUsername);

    }
 }, [dataFromQuery]);

  useEffect(() => {
    if (events[0]) {
      console.log(events[0]);    
    }
  }, [events]);

////////////////////////Initializations////////////////////////
let range = myWeek.range;
 // Establish date info and get week info
 myWeek.establishDateInfo();
 let weekArray = myWeek.getWeekInfo();
 let weekNumber = myWeek.getWeekNumber();
//  console.log(`
//  ~~~~~~~~~~~~~~~~~
//  week number: ${weekNumber}
//  ~~~~~~~~~~~~~~~~~`);
 // Define days of the week
 const days = [ 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat','Sun'];
 const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

 // Initialize datesArray
 let datesArray = [];


 ////////////////////////Populate datesArray////////////////////////
 // Loop through weekArray to populate datesArray
 //this is going to need to happen when data is brought in and will need to show a loading screen white it is happening....  
 useEffect(() => {
  setDaySections([]);
  console.log(events);

 for (let i = 0; i < weekArray.length; i++) {
    let dateObject = {
      event: false,
      date: weekArray[i],
      day: +weekArray[i].match(/(\d{4})-(\d{2})-(\d{2})/)[3],
      events: []
    };
console.log(`weekArray: ${weekArray[i]} `)

    // Loop through testEventArray to check if there are events on the current date
let matchedDay = weekArray[i].match(/(\d{4})-(\d{2})-(\d{2})/);
let unhashedDay =  matchedDay[1]+matchedDay[2]+matchedDay[3];
console.log(`unhashedDay: ${unhashedDay}`);



    for (let j = 0; j < events.length; j++) {
      let matchedEventDay = events[j].eventDate.match(/(\d{4})-(\d{2})-(\d{2})/);
      let unhashedEventDay =  matchedEventDay[1]+matchedEventDay[2]+matchedEventDay[3];
      console.log(`event: ${events[j].eventDate} `)
      if (unhashedDay === unhashedEventDay) {
        console.log(`event on ${weekArray[i]}`);
        dateObject.event = true;
        dateObject.date = weekArray[i];
        dateObject.day = +weekArray[i].match(/(\d{4})-(\d{2})-(\d{2})/)[3];
        dateObject.events.push(events[j]);
      }
    }

    datesArray.push(dateObject);
 }

console.log(datesArray);
 // Generate day sections
 
 for (let i = 0; i <= weekArray.length - 1; i++) {
   let daySection = (
      <div key={i} className="flex flex-row border-t border-b border-content w-full h-full hover:bg-accent-3 hover:cursor-pointer "  onClick={()=> navigate(`/day/${datesArray[i].date}`)}>
        <div className="ml-8 flex flex-col font-light w-1/6">
          <p className='text-sm'>{days[i]}</p>
          <p>{+weekArray[i].match(/(\d{4})-(\d{2})-(\d{2})/)[3]}</p>
          {datesArray[i].events[0]?.eventColor ? <Circle size={20} color={datesArray[i].events[0]?.eventColor} weight="fill" className='border-2 rounded-full border-black'/> : null}
        </div>

        <div className=" flex flex-col pt pb text-xs ">
          <div className='text-sm' style={{ minHeight: '17px' }}>
          {datesArray[i].events[0] ?         <h1>{datesArray[i].events[0].eventTitle}</h1> : null}
          </div>

          <p style={{ minHeight: '17px' }}>
            {datesArray[i].events[0]?.eventStartTime &&  datesArray[i].events[0]?.eventEndTime ? `${datesArray[i].events[0]?.eventStartTime}-${datesArray[i].events[0]?.eventEndTime}` : null}
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
    setDaySections(daySections => [...daySections, daySection]);
 }
 setWaitForContent(false);


}, [events, paramValue]);

// console.log(selectedDate.match(/(\d{4})-(\d{2})-(\d{2})/)[2]-1)
//  console.log(months[+selectedDate.match(/(\d{4})-(\d{2})-(\d{2})/)[2]-1])

 return (


  <>
        <div className='flex pb-4 pl-7 pr-8 text-xl font-extralight justify-between border-b-2 border-accent-2 '>
          <h2 className='hover:bg-accent-1 p-1 rounded-md border border-bkg-2 active:border active:border-accent-2 active:p-1 hover:cursor-pointer' onClick={()=> navigate(`/month/${myWeek.year}${myWeek.month}01`)}>{months[+selectedDate.match(/(\d{4})-(\d{2})-(\d{2})/)[2]-1]}</h2>
          <h2 className='text-sm mt-3'>week {weekNumber}</h2>
        </div>
        {waitForContent ? <h1 className='h-full'>Loading...</h1> : daySections}
        
        <div className='flex justify-center border-t-2 border-accent-2 '>
        <h1 className='hover:bg-accent-1 border-2 border-transparent rounded-lg active:border-accent-2  cursor-pointer flex justify-center text-2xl font-thin mt-5 p-2 w-1/5' onClick={()=> navigate(`/year/${myWeek.year}0101`)}>{myWeek.year}</h1>
        </div>
        <HandleIncrement date={date} range={range}/>

      </>
    
 );
};

export default Week;
