import { useNavigate } from 'react-router-dom';
import DateRangeInfo from '../../utils/dateInfo';
import HandleIncrement from '../HandleIncrement';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import { GET_EVENTS } from '../../utils/queries';


const Day = ({ date }) => {
    console.log(date); 

    // const { loading, data } = useQuery(GET_EVENTS, {
    //     variables: { userName: "test"}
    // });
    // console.log(data);







    const navigate = useNavigate();
    const selectedDate = date;
    let myDay = new DateRangeInfo({selectedDate: selectedDate,  range: "day" });
    console.log(myDay);
    myDay.establishDateInfo();
    let range = myDay.range;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let weekNumber = myDay.getWeekNumber();


     return (
      <>
            <div>
        <div className='flex mb-2 pl-7 pr-8 text-xl font-extralight justify-between border-b-2 border-bkg-1'>
          <h2 className='hover:bg-accent-1 p-1 rounded-md border border-bkg-2 active:border active:border-accent-2 active:p-1 hover:cursor-pointer'  onClick={()=> navigate(`/month/${myDay.year}${myDay.month}01`)}>{months[+selectedDate.match(/(\d{4})-(\d{2})-(\d{2})/)[2]-1]} {+selectedDate.match(/(\d{4})-(\d{2})-(\d{2})/)[3]}</h2>
          <h2 className='text-sm mt-3 hover:bg-accent-1 p-1 rounded-md border border-bkg-2 active:border active:border-accent-2 active:p-1 hover:cursor-pointer'  onClick={()=> navigate(`/week/${selectedDate}`)}>week {weekNumber}</h2>
        </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Title</h2>
                <p className="text-lg mb-2">Start Time: 10:00 AM</p>
                <p className="text-lg mb-2">End Time: 11:00 AM</p>
                <p className="text-lg mb-2">Location: New York</p>
                <p className="text-md mb-2">Notes: This is a sample description and i need to make it a little longer so that i can get an idea of what it will look like when it actually has notes or a real description in the event because I want to be able to have it handle a lot of text really well without issue.</p>
            </div>
            </div>
    <div>
            <div className=" flex flex-col items-center">
                <button className="px-4 py-2 bg-accent-1 text-content rounded-lg border-2 border-transparent hover:bg-accent-3 active:border-bkg-1 w-full" >
                    Edit
                </button>
               <h1 className='hover:bg-accent-1 border-2 border-transparent rounded-lg active:border-accent-2  cursor-pointer flex justify-center text-2xl font-thin mt-5 p-2 w-1/5' onClick={()=> navigate(`/year/${myDay.year}0101`)}>{myDay.year}</h1> 
            </div>
             
      <HandleIncrement date={date} range={range}/>
      </div>
      </>
     );
    };

    
    export default Day;
    