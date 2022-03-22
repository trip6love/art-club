const { Schema } = require('mongoose');

const harvardImgSchema = new Schema(
  {
    imageId: {
        type: String,
        require: true,
        unique: true,
    },
    creditline: {
        type: String,
    },
    imageUrl: {
        type: String,
        require: true,
    },
    culture: {
        type: String,
    },
    medium: {
        type: String,
    },
    title: {
        type: String
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = harvardImgSchema;