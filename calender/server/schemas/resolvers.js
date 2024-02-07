const { User, Event } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('events');
    },
  
    eventsByUsername: async (parent, { username }) => {
      return Event.find({ username: username }).sort({ createdAt: -1 });
    },
    
    
    allEvents: async () => {
      return Event.find().populate('userId').sort({ createdAt: -1 });
    },

    eventByDate: async (parent, { username, eventDate }) => {
      return Event.findOne({ username, eventDate }).populate('userId');
    }
  },
  
  Mutation: {


    createEvent: async (parent, args) => {
      // Destructure the arguments for easier access
      const { eventTitle, eventDate, eventStartTime, eventEndTime, eventLocation, eventDescription, eventColor, username } = args;
  
      // Find the user by their username
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      // Create a new event instance
      const newEvent = await Event.create({
        eventTitle,
        eventDate,
        eventStartTime,
        eventEndTime,
        eventLocation,
        eventDescription,
        eventColor,
        username: user.username, // Use the actual username string from the User document
        userId: user._id // Use the _id from the User document
      });
  
      // Add the new event to the user's events array
      user.events.push(newEvent._id);
      console.log(newEvent.eventDate);
      // Save the updated user
      await user.save();
  
      // Return the newly created event
      return newEvent;
    },

    updateEvent: async (parent, args) => {
      // Destructure the arguments for easier access
      const { eventId, eventTitle, eventDate, eventStartTime, eventEndTime, eventLocation, eventColor, eventDescription, username } = args;

      // find the event by its id and update it
      const updatedEvent = await Event.findOneAndUpdate(
        { _id: eventId },
        { eventTitle, eventDate, eventStartTime, eventEndTime, eventLocation, eventColor, eventDescription, username },
        { new: true }
      );
      //return the updated event
      return updatedEvent;
    },

    

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
   
  },
};

module.exports = resolvers;
 // addThought: async (parent, { thoughtText, thoughtAuthor }) => {
    //   const thought = await Thought.create({ thoughtText, thoughtAuthor });

    //   await User.findOneAndUpdate(
    //     { username: thoughtAuthor },
    //     { $addToSet: { thoughts: thought._id } }
    //   );

    //   return thought;
    // },
    // addComment: async (parent, { thoughtId, commentText, commentAuthor }) => {
    //   return Thought.findOneAndUpdate(
    //     { _id: thoughtId },
    //     {
    //       $addToSet: { comments: { commentText, commentAuthor } },
    //     },
    //     {
    //       new: true,
    //       runValidators: true,
    //     }
    //   );
    // },
    // removeThought: async (parent, { thoughtId }) => {
    //   return Thought.findOneAndDelete({ _id: thoughtId });
    // },
    // removeComment: async (parent, { thoughtId, commentId }) => {
    //   return Thought.findOneAndUpdate(
    //     { _id: thoughtId },
    //     { $pull: { comments: { _id: commentId } } },
    //     { new: true }
    //   );
    // },
    
    // {
    //   "eventTitle": "Title",
    //   "eventDate": "2024-02-06T14:30:00.0000000+01:00",
    //   "eventStartTime": "start",
    //   "eventEndTime": "end",
    //   "eventLocation": "place",
    //   "username": "Lernantino",
    //   "eventDescription": "null",
    //   "eventColor": "null"
    // }


    // removeEvent: async (parent, args, context, info) => {
    //   const { eventId } = args;
    //   try {
    //     const result = await Event.findOneAndDelete({ _id: eventId });
    //     if (result) {
    //       return { _id: result._id };
    //     } else {
    //       throw new Error("Event not found");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     throw error;
    //   }
    // },