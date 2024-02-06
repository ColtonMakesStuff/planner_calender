const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    events: [Event]!
  }

  type Event {
    _id: ID
    eventTitle: String
    eventDate: String
    eventStartTime: String
    eventEndTime: String
    eventLocation: String
    eventColor: String
    eventDescription: String
    userName: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    events: [Event]
    event(eventId: ID!): Event
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createEvent(eventTitle: String!, eventDate: String!, eventStartTime: String!, eventEndTime: String!, eventLocation: String!, eventColor: String, eventDescription: String, userName: String!): Event
    updateEvent(eventId: ID!, eventTitle: String, eventDate: String, eventStartTime: String, eventEndTime: String, eventLocation: String, eventColor: String, eventDescription: String, userName: String!): Event
    removeEvent(eventId: ID!): Event
  }
`;

module.exports = typeDefs;

// addThought(thoughtText: String!, thoughtAuthor: String!): Thought
    // addComment(
    //   thoughtId: ID!
    //   commentText: String!
    //   commentAuthor: String!
    // ): Thought
    // removeThought(thoughtId: ID!): Thought
    // removeComment(thoughtId: ID!, commentId: ID!): Thought

    // thoughts(username: String): [Thought]
    // thought(thoughtId: ID!): Thought

    // type Thought {
    //   _id: ID
    //   thoughtText: String
    //   thoughtAuthor: String
    //   createdAt: String
    //   comments: [Comment]!
    // }
  
    // type Comment {
    //   _id: ID
    //   commentText: String
    //   commentAuthor: String
    //   createdAt: String
    // }