import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import DateRangeInfo from '../../utils/dateInfo';
import Auth from '../../utils/auth';
import { Circle } from '@phosphor-icons/react';
import { Pencil } from '@phosphor-icons/react';
import HandleIncrement from '../HandleIncrement';
import Day from '../Day';
import { QUERY_EVENT_BY_USERNAME } from '../../utils/queries';

const Week = ({ date }) => {
  // Navigation and authentication
  const navigate = useNavigate();
  const username = Auth.getProfile().data.username;
  const params = useParams();

  // Date and week information
  const selectedDate = date;
  const myWeek = new DateRangeInfo({ selectedDate, range: "week" });
  const days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // State variables
  const [paramValue, setParamValue] = useState(params);
  const [events, setEvents] = useState([]);
  const [dataFromQuery, setDataFromQuery] = useState([]);
  const [waitForContent, setWaitForContent] = useState(true);
  const [daySections, setDaySections] = useState([]);

  // Apollo Client query setup
  const { loading, data, refetch } = useQuery(QUERY_EVENT_BY_USERNAME, {
    variables: { username },
    enabled: true, // This will let the query run on mount
  });

  // Refetch function to be called when needed
  const handleRefetch = () => {
    refetch();
  };

  // Effect to update paramValue state when params change
  useEffect(() => {
    setParamValue(params);
  }, [params]);

  // Effect to refetch data when paramValue changes
  useEffect(() => {
    handleRefetch();
  }, [paramValue]);

  // Effect to update dataFromQuery state when loading or data changes
  useEffect(() => {
    if (!loading && data) {
      setDataFromQuery(data);
    }
  }, [loading, data]);

  // Effect to update events state when dataFromQuery changes
  useEffect(() => {
    if (dataFromQuery.eventsByUsername) {
      setEvents(dataFromQuery.eventsByUsername);
    }
  }, [dataFromQuery]);

  // Effect to log the first event when events change
  useEffect(() => {
    if (events[0]) {
      console.log(events[0]);
    }
  }, [events]);

let range = myWeek.range;

// Establish date info and get week info
myWeek.establishDateInfo();

let weekArray = myWeek.getWeekInfo();
let weekNumber = myWeek.getWeekNumber();

// Initialize datesArray
let datesArray = [];

useEffect(() => {
setDaySections([]);
console.log(events);

// Create datesArray
// This part will set the layout of the week
 for (let i = 0; i < weekArray.length; i++) {
    let matchedDay = weekArray[i].match(/(\d{4})-(\d{2})-(\d{2})/);
    let unhashedDay =  matchedDay[1]+matchedDay[2]+matchedDay[3];
    let dateObject = {
      event: false,
      date: weekArray[i],
      day: +weekArray[i].match(/(\d{4})-(\d{2})-(\d{2})/)[3],
      events: []
    };
// match the date of the event to the date of the day
    for (let j = 0; j < events.length; j++) {
      let matchedEventDay = events[j].eventDate.match(/(\d{4})-(\d{2})-(\d{2})/);
      let unhashedEventDay =  matchedEventDay[1]+matchedEventDay[2]+matchedEventDay[3];
      if (unhashedDay === unhashedEventDay) {
        dateObject.event = true;
        dateObject.date = weekArray[i];
        dateObject.day = +weekArray[i].match(/(\d{4})-(\d{2})-(\d{2})/)[3];
        dateObject.events.push(events[j]);
      }
    }
    datesArray.push(dateObject);
 }
 
// Create daySections
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
    // add the day section to the daySections array
    setDaySections(daySections => [...daySections, daySection]);
 }
 // set waitForContent to false so the content will render
 setWaitForContent(false);
}, [events, paramValue]);

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
