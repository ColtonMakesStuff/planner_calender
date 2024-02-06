const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const EventSchema = new Schema({
    
    eventTitle: {
        type: String,
        required: true,
        trim: true
    },
    eventDate: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    }, 
    eventStartTime: {
        type: String,
        required: true
    },
    eventEndTime: {
        type: String,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    eventColor: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: false,
        maxlength: 280
    },
    userName: {
        type: String,
        required: true
    }
});

const Event = model('Event', EventSchema);

module.exports = Event;