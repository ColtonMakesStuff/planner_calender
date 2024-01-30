import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HandleIncrement = ({date, range}) => {

console.log(date);
console.log(range);
const navigate = useNavigate();
//the date getting passed in as date is  2024-02-01
let match = date.match(/(\d{4})-(\d{2})-(\d{2})/);
let year = match[1];
let month = match[2];
let day = match[3];
let daysInMonth = new Date(year, month, 0).getDate();
let DaysInPrevMonth = new Date(year, month - 1, 0).getDate();
console.log(daysInMonth);
console.log(DaysInPrevMonth);


const [currentMonth, setCurrentMonth] = useState(month);
const [currentYear, setCurrentYear] = useState(year);
const [currentDay, setCurrentDay] = useState(day);

const handleClick = (direction) => {
    let newMonth = +currentMonth;
    let newDay = +currentDay;
    let newYear = +currentYear;
switch (range) {
    case 'week':
        direction === 'back' ? newDay = currentDay - 7 : newDay = currentDay + 7;
    case 'month':
        direction === 'back' ? newMonth = newMonth - 1 : newMonth = newMonth + 1;
    case 'year':
        direction === 'back' ? newYear = newYear - 1 : newYear = newYear + 1;
    default:


// chcek if the date is out of bounds
    if (newMonth > 12) {
        newMonth = 1;
        newYear = +newYear + 1;
    }
    if (newMonth < 1) {
        newMonth = 12;
        newYear = +currentYear - 1;
    }
// normalize the date
if (newMonth < 10) {
    newMonth = `0${newMonth}`;
}
if (newDay < 10) {
       newDay = `0${newDay}`;
} 

  setCurrentMonth(newMonth);
  setCurrentYear(newYear);
  navigate(`/month/${newYear}${newMonth}01`);
}
};


    return (
      <div className="flex flex-col text-content justify-center mt-10">
         <button onClick={() => handleClick("back")}>Go back</button>
         <button onClick={() => handleClick()}>Go forward</button>
      </div>
     )
     
}

export default HandleIncrement;
