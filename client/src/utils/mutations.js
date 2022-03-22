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
`;

//save harvard image into inspirations board
export const SAVE_HARVARD_IMG = gql`
  mutation saveHarvardImg($input: ImageInput){
    saveHarvardImg(input: $input){
      username
      inspirations {
        id
        creditline
        imageUrl
        culture
        medium
        title
      }
    }
  }
`;

//remove harvard image from inspirations board
export const REMOVE_HARVARD_IMG = gql`
  mutation removeHarvardImg($id: ID!){
    removeHarvardImg(id: $id){
      username
      inspirations{
        id
      }
    }
  }
`;