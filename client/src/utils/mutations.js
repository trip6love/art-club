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

//Create post
//must be logged int
//must pass postID and commentBody
export const ADD_POST = gql`
  mutation AddPost($postTitle: String!, $postText: String!) {
    addPost(postTitle: $postTitle, postText: $postText) {
      _id
      username
      postTitle
      postText
      commentCount
    }
  }
`;

//update post

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

//user must be logged in
// needs postID and comment body
export const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $commentBody: String!) {
    addComment(postId: $postId, commentBody: $commentBody) {
      _id
      username
      postTitle
      postText
      comments {
        _id
        commentBody
      }
    }
  }
`;

//update Comment

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
mutation SaveHarvardImg($creditline: String, $imageUrl: String!,$culture: String, $medium: String, $title: String) {
  saveHarvardImg(creditline: $creditline, imageUrl: $imageUrl,culture:$culture, medium: $medium, title: $title) {
    username
    inspirations {
      _id
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
  mutation RemoveHarvardImg($inspirationId: ID!) {
    removeHarvardImg(inspirationId: $inspirationId) {
      username
      inspirations {
        _id
        imageUrl
      }  
    }
  }
`;