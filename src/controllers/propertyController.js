const mongoose = require('mongoose');
const Property = mongoose.model('Property');
const _ = require('lodash');
exports.getProperties = (req, res) => {
  res.json({ hey: 'there!'});
};

exports.createProperty = async (req, res) => {
  const property = await new Property(req.body).save();
  res.send({
    statusCode: 201,
    message: `Successfully created object with id: ${property._id}`
  });
};

exports.getProperties = async (req, res) => {
  const properties = await Property.find();
  res.send({
    properties: properties,
    statusCode: 200,
    message: 'OK'
  });
};

exports.updateProperty = async (req, res) => {
  //set the location data type, otherwise update will not save as 'Point'
  req.body.location.type = 'Point';
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
    message: `Found object matching id: ${property._id}`
  })
};

exports.getPropertiesBySlug = async (req, res, next) => {
  const property = await Property.findOne({slug: req.params.slug});
  if (!property)  return next();
  res.send({
    statusCode: 200,
    message: `Found object matching slug: ${property.slug}`
  })

};

exports.deleteProperty = async (req, res) => {
  /**
   * TODO - Can only delete when role is admin
   */
};