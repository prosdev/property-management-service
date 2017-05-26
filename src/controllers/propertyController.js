const mongoose = require('mongoose');
const Property = mongoose.model('Property');
const _ = require('lodash');
exports.getProperties = (req, res) => {
  res.json({ hey: 'there!'});
};

exports.createProperty = async (req, res) => {
  //Format tags
  req.body.tags = req.body.tags.map( tag => tag.toLowerCase());
  const property = await new Property(req.body).save();

  res.send({
    statusCode: 201,
    message: `Successfully created object with id: ${property._id}`
  });
};

exports.getProperties = async (req, res) => {
  const properties = await Property.find();

  res.send({
    statusCode: 200,
    message: `Successfully retrieved ${properties.length} results.`,
    properties
  });
};

exports.updateProperty = async (req, res) => {
  //set the location data type, otherwise update will not save as 'Point'
  req.body.location.type = 'Point';
  //Format tags
  req.body.tags = req.body.tags.map( tag => tag.toLowerCase());
  const property = await Property.findOneAndUpdate({ _id: req.params.id }, req.body,
      {
        returnNewDocument: true, // return new property instead of the old one
        runValidators: true,
        upsert: true
      }).exec();

  res.send({
    statusCode: 200,
    message: `Successfully updated object with id: ${property._id}`
  })
};

exports.getPropertyById = async (req, res) => {
  const property = await Property.findOne({ _id: req.params.id });

  res.send({
    statusCode: 200,
    message: `Found object with id: ${property._id}`,
    property
  })
};

exports.getPropertyBySlug = async (req, res) => {
  console.log(req.params.slug);
  const property = await Property.findOne({ slug: req.params.slug });
  if (!property)  return next();

  res.send({
    statusCode: 200,
    message: `Found object matching slug: ${property.slug}`,
    property
  });
};

exports.getTags = async (req, res) => {
  const tags = await Property.getTagsList();

  res.send({
    statusCode: 200,
    message: 'Successfully retrieved a list of all tags with associated counts for all properties.',
    tags
  });
};

exports.getPropertiesByTag = async (req, res) => {
  const tag = req.params.tag.toLowerCase();
  const properties = await Property.find({ tags: tag });

  res.send({
    statusCode: 200,
    message: `Successfully retrieved ${properties.length} properties tagged ${tag}`,
    properties
  })
};

exports.deleteProperty = async (req, res) => {
  /**
   * TODO - Can only delete when role is admin
   */
};

exports.searchProperties = async (req, res) => {
  //Default result size for query to 10 unless given other size
  const limitSize = (req.query.limit)? req.query.limit: 10;

  const properties = await Property
    // first find properties that match
    .find({
      $text: {
        $search: req.query.q
      }
    }, {
      score: { $meta: 'textScore' }
    }
  )
  // sort properties by meta textscore (how often text appears)
    .sort({
    score: { $meta: 'textScore'}
  })
    .limit(limitSize);

  res.send({
    statusCode: 200,
    message: `Successfully retrieved ${properties.length} results matching query: ${req.query.q}`,
    properties
  });
};

exports.mapProperties = async (req, res) => {
  // If supply a maxDistance query, will limit distance to that, otherwise default to 10km
  const distance = (req.query.distance)? req.query.distance: 10000;
  // Default results to 10 if no limit is supplied in query params
  const limitSize = (req.query.limit) ? req.query.limit: 10;
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat);

  const q = {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates
        },
        $maxDistance: distance
      }
    }
  };

  const properties = await Property.find(q).select('slug name description location').limit(limitSize);
  res.send({
    statusCode: 200,
    message: `Succesfully retrieved ${properties.length} results within ${limitSize} km of given location`,
    properties
  });
};