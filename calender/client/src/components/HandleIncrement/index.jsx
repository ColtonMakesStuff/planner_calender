import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const HandleIncrement = ({date, range, children}) => {

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
const [currentDaysInMonth, setCurrentDaysInMonth] = useState(daysInMonth);
const [currentDaysInPrevMonth, setCurrentDaysInPrevMonth] = useState(DaysInPrevMonth);

const handleClick = (direction) => {
    let newMonth = +currentMonth;
    let newDay = +currentDay;
    let newYear = +currentYear;
    if (range === 'week') {
            direction === 'back' ? newDay = newDay - 7 : newDay = newDay + 7;
            console.log("week");
    } else if (range=== 'month') {
            direction === 'back' ? newMonth = newMonth - 1 : newMonth = newMonth + 1;
            console.log("month");
    }else if (range === 'year'){
            direction === 'back' ? newYear = newYear - 1 : newYear = newYear + 1;
            console.log("year");
    } else if (range === 'day'){
            direction === 'back' ? newDay = newDay - 1 : newDay = newDay + 1;
            console.log("day");
    }{
            console.log("error");
    }


// chcek if the date is out of bounds
   
    if (newDay > daysInMonth) {
        newDay = newDay - daysInMonth;
        newMonth = +newMonth + 1;
    }
    if (newDay < 1) {
        newDay = DaysInPrevMonth + newDay;
        newMonth = +newMonth - 1;
    }
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
console.log(`/month/${newYear}${newMonth}${newDay}`)
  setCurrentMonth(newMonth);
  setCurrentYear(newYear);
  setCurrentDay(newDay);
  setCurrentDaysInMonth(new Date(newYear, newMonth, 0).getDate());
  setCurrentDaysInPrevMonth(new Date(newYear, newMonth - 1, 0).getDate());
  navigate(`/${range}/${newYear}${newMonth}${newDay}`);

}




    return (
        <div className="flex justify-between items-center ">
            <button className='hover:bg-accent-1 rounded-md hover:cursor-pointer absolute bottom-5 p-2 active:p-1 left-5 active:mb-1 active:ml-1' onClick={() => handleClick("back")}><CaretLeft size={36} color="#563c1f" weight="duotone" /></button>
            
            <button className=' hover:bg-accent-1 rounded-md hover:cursor-pointer absolute bottom-5 p-2 active:mb-1 active:mr-1 active:p-1 right-5' onClick={() => handleClick()}><CaretRight size={36} color="#563c1f" weight="duotone" /></button>
        </div>
    
     )
     
}

export default HandleIncrement;
