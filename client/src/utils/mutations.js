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
export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!){
    deleteComment(postId: $postId, commentId: $commentId) {
      _id
      username
      postTitle
      commentCount
      }
    }
  }
`;