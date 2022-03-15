const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
  {
    postTitle: {
        type: String,
        required: 'You need a title',
        minlength: 1,
        maxlength: 20
    },
    postText: {
      type: String,
      required: 'You need a Comment',
      minlength: 1,
      maxlength: 280
    },
    postImage: {
        type: String,
        required: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    comments: [commentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

postSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Post = model('Post', postSchema);

module.exports = Post;