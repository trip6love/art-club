const { Schema } = require('mongoose');

const harvardImgSchema = new Schema(
  {
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