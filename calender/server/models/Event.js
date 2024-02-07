const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const EventSchema = new Schema({
    
    eventTitle: {
        type: String,
        required: false,
        trim: true
    },
    eventDate: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    }, 
    eventStartTime: {
        type: String,
        required: false
    },
    eventEndTime: {
        type: String,
        required: false
    },
    eventLocation: {
        type: String,
        required: false
    },
    eventColor: {
        type: String,
        required: false
    },
    eventDescription: {
        type: String,
        required: false,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    
});

const Event = model('Event', EventSchema);

module.exports = Event;