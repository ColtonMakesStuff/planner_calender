import React, { useState } from 'react';
import { Circle } from '@phosphor-icons/react';

const EventForm = ({ date }) => {
  // State for form inputs
  const [eventTitle, setEventTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState(''); 
  const [color, setColor] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleColorChange = (color) => {
    setColor(color);
    console.log(color);
  };

  // Rest of your component logic...

  const handleSave = () => {
    // Call API to update the event in the database
    // After successful update, you can reset the isEditing state
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
                value={startTime}
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
                value={endTime}
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            {/* add it here */}


    <div className='flex'>
      <Circle size={60} color="#e32400" weight="fill" onClick={() => handleColorChange("#e32400")} 
      className={color === '#e32400' ? 'border-4 rounded-full border-black' : ''}/>
      <Circle size={60} color="#ff7e00" weight="fill" onClick={() => handleColorChange("#ff7e00")} 
      className={color === '#ff7e00' ? 'border-4 rounded-full border-black' : ''}/>
      <Circle size={60} color="#ffcc00" weight="fill" onClick={() => handleColorChange("#ffcc00")} 
      className={color === '#ffcc00' ? 'border-4 rounded-full border-black' : ''}/>
      <Circle size={60} color="#a3e048" weight="fill" onClick={() => handleColorChange("#a3e048")} 
      className={color === '#a3e048' ? 'border-4 rounded-full border-black' : ''}/>
      <Circle size={60} color="#53d5fd" weight="fill" onClick={() => handleColorChange("#53d5fd")} 
      className={color === '#53d5fd' ? 'border-4 rounded-full border-black' : ''}/>
      <Circle size={60} color="#7a4fff" weight="fill" onClick={() => handleColorChange("#7a4fff")} 
      className={color === '#7a4fff' ? 'border-4 rounded-full border-black' : ''}/>
    </div>

            <div className='flex flex-col h-full'>
                <label className="text-sm mb-1 bg-transparent">
                Notes:
                </label>
                <textarea
                className='h-full bg-transparent border border-accent-2 rounded-md p-2 mb-2'
                value={description}
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
            {color ? <p className="text-lg mb-2"> <Circle size={30} color={color} weight="fill"/></p> : null}
            </div>
            {startTime ? <p className="text-lg mb-2">Start Time: {startTime}</p> : null}
            {endTime ? <p className="text-lg mb-2">End Time: {endTime}</p> : null}
            {location ? <p className="text-lg mb-2">Location: {location}</p> : null}


            {description ? <> <p className="text-md mb-2">Notes:</p> <p className="text-md mb-2">{description}</p>  </>: null}

        </div>

      <button onClick={() => setIsEditing(true)}>Edit</button>
    </div>
  );
};

export default EventForm;
