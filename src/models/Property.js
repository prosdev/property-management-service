const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const propertySchema = new mongoose.Schema( {
  name: {
    type: String,
    trim: true,
    required: [true, 'Must supply a name!']
  },
  slug: String,
  description: {
    type: String,
    trim: true,
    required: 'Must supply a description!'
  },
  thumbnailImg: [String],
  mainImg: [String],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'Must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'Must supply an address!'
    }
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