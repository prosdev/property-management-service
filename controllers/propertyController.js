const mongoose = require('mongoose');
const Property = mongoose.model('Property');

exports.getProperties = (req, res) => {
  res.json({ hey: 'there!'});
};

exports.createProperty = async (req, res) => {
  const property = await new Property(req.body).save();
  res.send({
    property: property,
    statusCode: 201,
    message: 'Created a new property successfully.'
  });
};