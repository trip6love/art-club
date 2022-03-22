const { User, Post } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async(parent, args, context) => {
          if (context.user){
            const userData = await User.findOne({ _id: context.user._id})
                .select('-__v -password')
                .populate('posts')
                .populate('inspirations')
            return userData;
          }
          throw new AuthenticationError('Not Logged In');
      },
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
            .populate('posts')
            .populate('inspirations')
      },
      //get user by username
      user: async(parent, {username}) => {
        return User.findOne({ username })
            .select('-__v -password')
            .populate('posts')
            .populate('inspirations')
      }
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            //check to see if there is a user
            if(!user){
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPW = await user.isCorrectPassword(password);
            //checks to see if correct password for user
            if(!correctPW) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
        },
        addPost: async(parent, args, context) => {
            if(context.user) {
                const post = await Post.create({ ...args, username: context.user.username});

                await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    { $push: { posts: post._id}},
                    {new:true}
                );

                return post;
            }
            throw new AuthenticationError('You need to be logged in');
        },
        addComment: async(parent,{postId, commentBody}, context) => {
            if(context.user){
                const updatePost = await Post.findByIdAndUpdate(
                    {_id: postId},
                    { $push: {comments: {commentBody, username: context.user.username}}},
                    { new: true, runValidators: true}
                );
                return updatePost;
            }
            throw new AuthenticationError('You need to be logged in');
        },
        saveHarvardImg: async(parent,{imageId, creditline, imageUrl, culture, medium, title}, context) => {
            if(context.user){
                const userWithImg = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    { $push: {inspirations: {imageId, creditline, imageUrl, culture, medium, title}}},
                    {new: true}
                )

                return userWithImg;
            }
            throw new AuthenticationError('You need to be logged in');
        },
        deletePost: async(parent, {postId}, context) => {
            if(context.user){
                const post = await Post.findByIdAndDelete({_id: postId});
                return post;
            }
            throw new AuthenticationError('You need to be logged in');
        },
        deleteComment: async(parent, {postId, commentId}, context) => {
            if(context.user){
                const comment = await Post.findByIdAndUpdate(
                    {_id: postId},
                    {$pull: {comments: {_id: commentId}}} 
                    );
                return comment;
            }
            throw new AuthenticationError('You need to be logged in');
        },
        removeHarvardImg: async(parent, {inspirationId}, context) => {
            if(context.user){
                const userNoImg = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: {inspirations: {_id: inspirationId}}},
                    {new: true}
                )
                return userNoImg;
            }
            throw new AuthenticationError('You need to be logged in');
        }
    }
  };
  
  module.exports = resolvers;