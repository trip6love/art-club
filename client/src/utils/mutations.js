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

//must be logged in to use
//needs to send the postID to deletePost
//will return Username and post count

export const ADD_POST = gql`
  mutation addPost($postText: String!) {
    addPost(postText: $postText) {
      _id
      postText
      createdAt
      username
      postCount
      comments {
        _id
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($postId: ID!, $postText: String!) {
    updatePost(postId: $postId, content: $postText) {
      _id
      createdAt
      postText
    }
  }
`; 

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!){
    deletePost(postId: $postId) {
      username
      postCount
    }
  }
`;

//must be logged in to use
//needs to send both the postID and commentID 
//will return the post ID, username of post, postTitle and commentCount

export const ADD_COMMENT = gql`
  mutation addComment($commentId: ID!, $commentBody: String!) {
    addComment(commentId: $commentId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        postTitle
        username
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($commentId: ID!, $commentBody: String!) {
    updateComment(commentId: $commentId, commentBody: $commentBody) {
      _id
      commentBody
    }
  }
`; 

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!){
    deleteComment(postId: $postId, commentId: $commentId) {
      _id
      username
      postTitle
      commentCount
    }
  }
`;

