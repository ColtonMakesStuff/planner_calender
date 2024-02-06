const { User, Event } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('username');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('username');
    },
    // thoughts: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Thought.find(params).sort({ createdAt: -1 });
    // },
    // thought: async (parent, { thoughtId }) => {
    //   return Thought.findOne({ _id: thoughtId });
    // },
     events: async (parent, { username }) => {
       const params = username ? { username } : {};
       return Event.find(params).sort({ createdAt: -1 });
    },
  },

  Mutation: {


    createEvent: async (parent, args) => {
      // Destructure the arguments for easier access
      const { eventTitle, eventDate, eventStartTime, eventEndTime, eventLocation, eventDescription, eventColor, userName } = args;

      // Create a new event instance
      const newEvent = await Event.create({
        eventTitle,
        eventDate,
        eventStartTime,
        eventEndTime,
        eventLocation,
        eventDescription,
        eventColor, 
        userName
      });

      // Find the user by their username
      const user = await User.findOneAndUpdate({ userName });

      if (!user) {
        throw new Error('User not found');
      }

      // Add the new event to the user's events array
      user.events.push(newEvent._id);

      // Save the updated user
      await user.save();

      // Return the newly created event
      return newEvent;
    },
    updateEvent: async (parent, args) => {
      // Destructure the arguments for easier access
      const { eventId, eventTitle, eventDate, eventStartTime, eventEndTime, eventLocation, eventDescription, eventColor, userName } = args;

      // Create a new event instance
      const updatedEvent = await Event.findOneAndUpdate(
        { _id: eventId },
        {
          eventTitle,
          eventDate,
          eventStartTime,
          eventEndTime,
          eventLocation,
          eventDescription,
          eventColor, 
          userName
        },
        { new: true }
      );

      // Return the newly created event
      return updatedEvent;
    },
    removeEvent: async (parent, args, context, info) => {
      const { eventId } = args;
      try {
        const result = await Event.findOneAndDelete({ _id: eventId });
        if (result) {
          return { _id: result._id };
        } else {
          throw new Error("Event not found");
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
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
    