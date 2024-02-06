import React, { useState } from 'react';

const EventForm = ({ date }) => {
  // State for form inputs
  const [eventTitle, setEventTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');  
  const [isEditing, setIsEditing] = useState(false);



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
            {eventTitle ? <h2 className="text-xl font-semibold mb-2">{eventTitle}</h2> : null}
            {startTime ? <p className="text-lg mb-2">Start Time: {startTime}</p> : null}
            {endTime ? <p className="text-lg mb-2">End Time: {endTime}</p> : null}
            {location ? <p className="text-lg mb-2">Location: {location}</p> : null}
            {description ? <p className="text-md mb-2">Notes: {description}</p> : null}
        </div>

      <button onClick={() => setIsEditing(true)}>Edit</button>
    </div>
  );
};

export default EventForm;
