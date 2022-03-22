// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    postCount: Int
    posts: [Post]
    inspirations: [HarvardImage]
  }

  type Post {
    _id: ID
    postTitle: String
    postText: String
    createdAt: String
    username: String
    commentCount: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }

  type HarvardImage {
    _id: ID
    creditline: String
    imageUrl: String
    culture: String
    medium: String
    title: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
    inspirations: [HarvardImage]
  }

  type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      addPost(postTitle: String!, postText: String!, postImage: String): Post
      addComment(postId: ID!, commentBody: String!): Post
      deletePost(postId: ID!): User
      deleteComment(postId: ID!, commentId: ID!): Post
      saveHarvardImg(creditline: String, imageUrl: String!, culture: String, medium: String, title: String ): User
      removeHarvardImg(inspirationId: ID!): User
  }

  type Auth {
      token: ID!
      user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;