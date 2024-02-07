import React, { useState } from 'react';
import { Circle } from '@phosphor-icons/react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_EVENT } from '../../utils/mutations'
import { QUERY_EVENT_BY_DATE } from '../../utils/queries';
import Auth from '../../utils/auth';
import { useEffect } from 'react';


const EventForm = ({ date }) => {

// query events list
// if no events for this day the use create event
// if events for this day then use edit event
// put that into the handle save function



  // State for form inputs
  const [eventTitle, setEventTitle] = useState('');
  const [eventStartTime, setStartTime] = useState('');
  const [eventEndTime, setEndTime] = useState('');
  const [eventLocation, setLocation] = useState('');
  const [eventDescription, setDescription] = useState(''); 
  const [eventColor, setColor] = useState('');
  const [isEditing, setIsEditing] = useState(false);

// on query need to set to states if available
const username = Auth.getProfile().data.username
const eventDate =  date
    

  const [addEvent, {error} ] = useMutation(ADD_EVENT, { 
     refetchQueries: [{ query: QUERY_EVENT_BY_DATE, 
     variables: { username, eventDate }   }]
  });


 const { loading, data } = useQuery(QUERY_EVENT_BY_DATE, {
    variables: { username, eventDate: date },
});
useEffect(() => {
    if (data) {
    if (data.eventByDate) {
        console.log(data);
        if (data.eventByDate.eventTitle){
            setEventTitle(data.eventByDate.eventTitle)
            setStartTime(data.eventByDate.eventStartTime)
            setEndTime(data.eventByDate.eventEndTime)
            setLocation(data.eventByDate.eventLocation)
            setDescription(data.eventByDate.eventDescription)
            setColor(data.eventByDate.eventColor)
        }
    }
}

}, [data]);

//  useEffect(() => {
//  console.log(data);
//  }, [data]);

  const handleColorChange = (color) => {
    setColor(color);
    console.log(color);
  };

  // Rest of your component logic...

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addEvent({
        variables: {
            eventTitle,
            eventDate,
            eventStartTime,
            eventEndTime,
            eventLocation,
            eventDescription,
            eventColor,
            username,
        },
      });
        console.log({data});
    } catch (err) {
      console.error(err);
    }
  
    setIsEditing(false);
  };

  if (isEditing) {


  return (
      <form onSubmit={handleSave} className='h-full flex flex-col justify-between'>
        <div className='flex flex-col '>
            <div className='flex justify-between'>
                <label className='text-xl font-semibold mb-2 bg-transparent w-1/3'>
                Title:  
                </label>
                <input
                className='bg-transparent border border-accent-2 rounded-md ml-2 mb-2 w-full'
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                />
            </div>
            <div className='flex'>
                <label className="text-lg mb-1 bg-transparent  w-1/4">
                Start Time:
                </label>
                <input
                className='bg-transparent border border-accent-2 rounded-md ml-2 mb-2 '
                type="time"
                value={eventStartTime}
                onChange={(e) => setStartTime(e.target.value)}
                />
            </div>
            <div className='flex '>
                <label className="text-lg mb-1 bg-transparent w-1/4">
                End Time:
                </label>
                <input
                className='bg-transparent border border-accent-2 rounded-md ml-2 mb-2 '
                type="time"
                value={eventEndTime}
                onChange={(e) => setEndTime(e.target.value)}
                />
            </div>
            <div className='flex justify-between'>
                <label className=" w-1/3 text-lg mb-1 bg-transparent">
                Location:
                </label>
                <input
                className=' w-full bg-transparent border border-accent-2 rounded-md ml-2 mb-2 '
                type="text"
                value={eventLocation}
                onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            {/* add it here */}


    <div className='flex'>
      <Circle size={60} color="#e32400" weight="fill" onClick={() => handleColorChange("#e32400")} 
      className={eventColor === '#e32400' ? 'border-4 rounded-full border-black' : ''}/>
      <Circle size={60} color="#ff7e00" weight="fill" onClick={() => handleColorChange("#ff7e00")} 
      className={eventColor === '#ff7e00' ? 'border-4 rounded-full border-black' : ''}/>
      <Circle size={60} color="#ffcc00" weight="fill" onClick={() => handleColorChange("#ffcc00")} 
      className={eventColor === '#ffcc00' ? 'border-4 rounded-full border-black' : ''}/>
      <Circle size={60} color="#a3e048" weight="fill" onClick={() => handleColorChange("#a3e048")} 
      className={eventColor === '#a3e048' ? 'border-4 rounded-full border-black' : ''}/>
      <Circle size={60} color="#53d5fd" weight="fill" onClick={() => handleColorChange("#53d5fd")} 
      className={eventColor === '#53d5fd' ? 'border-4 rounded-full border-black' : ''}/>
      <Circle size={60} color="#7a4fff" weight="fill" onClick={() => handleColorChange("#7a4fff")} 
      className={eventColor === '#7a4fff' ? 'border-4 rounded-full border-black' : ''}/>
    </div>

            <div className='flex flex-col h-full'>
                <label className="text-sm mb-1 bg-transparent">
                Notes:
                </label>
                <textarea
                className='h-full bg-transparent border border-accent-2 rounded-md p-2 mb-2'
                value={eventDescription}
                lines='5'
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </div>
        <button type="submit">Save</button>

      </form>
  );
};

return (
    <div className='flex flex-col justify-between h-full'>
        <div className='h-full'>
            <div className='flex justify-between'>
            {eventTitle ? <h2 className="text-xl font-semibold mb-2">{eventTitle}</h2> : null}
            {eventColor ? <p className="text-lg mb-2"> <Circle size={30} color={eventColor} weight="fill"/></p> : null}
            </div>
            {eventStartTime ? <p className="text-lg mb-2">Start Time: {eventStartTime}</p> : null}
            {eventEndTime ? <p className="text-lg mb-2">End Time: {eventEndTime}</p> : null}
            {eventLocation ? <p className="text-lg mb-2">Location: {eventLocation}</p> : null}


            {eventDescription ? <> <p className="text-md mb-2">Notes:</p> <p className="text-md mb-2">{eventDescription}</p>  </>: null}

        </div>

      <button onClick={() => setIsEditing(true)}>Edit</button>
    </div>
  );
};

export default EventForm;
