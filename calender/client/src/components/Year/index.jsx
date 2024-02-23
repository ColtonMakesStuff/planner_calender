import { useState, useEffect } from 'react';
import DateRangeInfo from '../../utils/dateInfo';
import classes from './index.module.css';
import HandleIncrement from '../HandleIncrement';
import { useNavigate, useParams } from 'react-router-dom';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT_BY_USERNAME } from '../../utils/queries';


// 

const Year = ({date}) => {

const navigate = useNavigate();
const username = Auth.getProfile().data.username;
const params = useParams();
  //WHEN GENERATING THE MONTH I NEED TO MAKE SURE THAT THE DATE BROUGHT IN IS THE FIRST OF THE MONTH

let myMonth = new DateRangeInfo({selectedDate: date, range: "year"});
let range= myMonth.range;
myMonth.establishDateInfo()
const myMonths = myMonth.getMonthsInYear();
let firstDay = myMonth.getNameOfDay();
let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];  
let miniDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
let dateList = myMonth.getDatesInMonth();

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
    console.log(events);
  }
}, [events]);




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

    blanks = days.indexOf(firstDay);
    blanksArray = Array(blanks).fill({
      event: false,
      day: ""
    });

    let datesArray=[]

    for (let i = 0; i < dateList.length; i++) {
      let dateObject;
      let matchedDay = dateList[i].match(/(\d{4})-(\d{2})-(\d{2})/);
      let unhashedDay =  matchedDay[1]+matchedDay[2]+matchedDay[3];
      dateObject = {
        event: false,
        date: dateList[i],
        day: + dateList[i].match(/(\d{4})-(\d{2})-(\d{2})/)[3],
        events: []
      }
      for (let j = 0; j < events.length; j++) {
        let matchedEventDay = events[j].eventDate.match(/(\d{4})-(\d{2})-(\d{2})/);
        let unhashedEventDay =  matchedEventDay[1]+matchedEventDay[2]+matchedEventDay[3];
        if (unhashedDay === unhashedEventDay) {
          dateObject.event = true;
          dateObject.date = dateList[i];
          dateObject.day = +dateList[i].match(/(\d{4})-(\d{2})-(\d{2})/)[3];
          dateObject.events.push(events[j]);
        }
      }
      datesArray.push(dateObject);
    }
    console.log(datesArray);
    
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
let monthNumber;
if (i < 9) {
  monthNumber = `0${i+1}`
} else {
  monthNumber = i+1
}


      let monthSquare = (
        <div className="flex flex-col text-content justify-center m-2 p-1 cursor-pointer hover:bg-accent-1 rounded-md border-2 border-transparent active:border-accent-2" onClick={()=> navigate(`/month/${myMonth.year}${monthNumber}01`)}>
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


    return (
     
      <div className="mr-2 ml-2 sm:mr-2 sm:ml-2 flex flex-col text-content justify-center m-2">
         <h1 className='flex justify-center text-2xl font-thin mt-5'>{myMonth.year}
         </h1>
         <div className=" text-xs sm:text-xs md:text-sm grid grid-cols-2  gap-0 w-full  font-bold mx-auto">

            

        {monthSquares}
            

        </div>
        
        <HandleIncrement date={date} range={range}/></div>
     )
     
}

export default Year;
