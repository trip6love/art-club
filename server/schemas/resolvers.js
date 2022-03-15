const { User, Post } = require('../models');

const resolvers = {
    Query: {
      //get all posts
      posts: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Post.find(params).sort({ createdAt: -1});
      },
      //get post by id
      post: async(parent, {_id}) => {
        return Post.findOne({_id});
      },
      //get all users
      users: async() => {
        return User.find()
            .select('-__v -password')
            .populate('comments');
      },
      //get user by username
      user: async(parent, {username}) => {
        return User.findOne({ username })
            .select('-__v -password')
            .populate('comments');
      }
    }
  };
  
  module.exports = resolvers;