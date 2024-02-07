import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!, $thoughtAuthor: String!) {
    addThought(thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $thoughtId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      thoughtId: $thoughtId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;


export const ADD_EVENT = gql`
mutation CreateEvent($eventTitle: String!, $eventDate: String!, $eventStartTime: String!, $eventEndTime: String!, $eventLocation: String!, $username: String!, $eventDescription: String, $eventColor: String) {
  createEvent(eventTitle: $eventTitle, eventDate: $eventDate, eventStartTime: $eventStartTime, eventEndTime: $eventEndTime, eventLocation: $eventLocation, username: $username, eventDescription: $eventDescription, eventColor: $eventColor) {
    _id
    eventTitle
    eventDate
    eventStartTime
    eventEndTime
    eventLocation
    eventColor
    eventDescription
    username
  }
}`