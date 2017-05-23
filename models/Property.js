const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const propertySchema = new mongoose.Schema( {
  name: {
    type: String,
    trim: true,
    required: [true, 'Please enter a name!']
  },
  slug: String,
  description: {
    type: String,
    trim: true,
    required: 'Please enter a description!'
  },
  thumbnailImg: [String],
  mainImg: [String],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

propertySchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next();
    return;
  }

  this.slug = slug(this.name);
  next();
});

propertySchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Property', propertySchema);