import classes from './index.module.css';
import { useState, useEffect } from 'react';
import DateRangeInfo from '../../utils/dateInfo';
import { useNavigate, useParams } from 'react-router-dom';
import HandleIncrement from '../HandleIncrement';
import { QUERY_EVENT_BY_USERNAME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { Circle } from '@phosphor-icons/react';



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
  color: "blue",
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

const Month = ({date}) => {
const navigate = useNavigate();
const username = Auth.getProfile().data.username;
const params = useParams();

  //WHEN GENERATING THE MONTH I NEED TO MAKE SURE THAT THE DATE BROUGHT IN IS THE FIRST OF THE MONTH
let myMonth = new DateRangeInfo({selectedDate: date, range: "month"});
let range = myMonth.range;
console.log(myMonth.selectedDate)
myMonth.establishDateInfo()

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
    console.log(events);
  }
}, [events]);


//this part will set the layout of the calender
console.log(myMonth.day);

let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' , 'Sunday'];  
let firstDay = myMonth.getNameOfDay();
let miniDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
let dateList = myMonth.getDatesInMonth();
console.log(dateList);
let monthAtAGlance = [];
let blanks = days.indexOf(firstDay);
let blanksArray = Array(blanks).fill({
  event: false,
  day: ""
});

let datesArray=[]

// useEffect(() => {
//   setDaySections([]);
//   console.log(events);

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
console.log(monthAtAGlance);


const dateSquares = Array.from({ length: 42 }).map((_, i) => (
  <div 
  key={i} 
  className={`flex items-end aspect-w-3 aspect-h-3 border border-accent-2 ${monthAtAGlance[i]?.day && monthAtAGlance[i].day >= 1 ? classes.valid_day : classes.invalid_day} cursor-pointer`}
  // HEY!!! this is where i need to add the onClick function to go to the week view
  onClick={() => {
     if (monthAtAGlance[i]?.day && monthAtAGlance[i].day >= 1) {
       console.log(monthAtAGlance[i].date);
        navigate(`/week/${monthAtAGlance[i].date}`);

     }
  }}
>
     <div className="flex flex-col justify-center h-full">
         <div className="flex justify-center" >
           {/* THIS NEEDS TO BE REFACTORED WHEN ACTUAL DATA IS BEING BROUGHT IN!!!! */}
           {monthAtAGlance[i]?.event ? <div className='w-[calc(3vw)] h-[calc(3vw)] border-2 border-black rounded-full mt-1' style={{backgroundColor: `${monthAtAGlance[i].events[0].eventColor}`}}></div> : <h3></h3>}
           {/* */}
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
      
      <div className="flex flex-col text-content justify-center h-full mt-10 justify-between">
         <h1 className='flex justify-center text-2xl font-thin mb-5'>{myMonth.getNameOfMonth()}</h1>
        <div className='h-full'>
         <div className="flex flex-row justify-between items-center w-full  mx-auto">
          {miniDaysDisplay}
         </div>
         <div className="grid grid-cols-7 gap-0 w-full mx-auto ">
           {dateSquares}
         </div>
         </div>
         <div>
         <div className='flex flex-col items-center'>
         <h1 className='hover:bg-accent-1 border-2 border-transparent rounded-lg active:border-accent-2  cursor-pointer flex justify-center text-2xl font-thin mt-5 p-2 w-1/5' onClick={()=> navigate(`/year/${myMonth.year}0101`)} >{myMonth.year}</h1></div>
         <HandleIncrement date={date} range={range}/>
         </div>
      </div>
     
     )
     
}

export default Month;
