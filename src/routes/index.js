const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { catchErrors } = require('../handlers/errorHandlers');

/**
 * Get a list of properties.
 *
 * @name GET Properties
 * @route {GET} /properties
 */
router.get('/properties', propertyController.getProperties);
/**
 * Get a list of properties.
 *
 * @name CREATE Properties
 * @route {POST} /properties
 *
 * @bodyparam {String} name - Name field of property (required)
 * @bodyparam {String} description - Description field of property (required).
 * @bodyparam {String[]} [thumbnailImg=[]] - Thumbnail image of property (expecting 360x180). Should be an array of Strings.
 * @bodyparam {String[]} [mainImg=[]] - Main images of property (expecting 1920×1080 or 1080p). Should be an array of Strings.
 * @bodyparam {String[]} [tags=[]] - Tags associated with property. Should be an array of Strings.
 */
router.post('/properties', catchErrors(propertyController.createProperty));
/**
 * Get property by id.
 *
 * @name GET Property by Id
 * @route {GET} /properties/:id
 * @routeparam {String} :id - :id is the unique identifier for a property.
 */
router.get('/properties/:id', catchErrors(propertyController.getPropertyById));
/**
 * Update property by id.
 *
 * @name UPDATE Property by Id
 * @route {POST} /properties/:id
 *
 * @bodyparam {String} name - Name field of property (required)
 * @bodyparam {String} description - Description field of property (required).
 * @bodyparam {String[]} [thumbnailImg=[]] - Thumbnail image of property (expecting 360x180). Should be an array of Strings.
 * @bodyparam {String[]} [mainImg=[]] - Main images of property (expecting 1920×1080 or 1080p). Should be an array of Strings.
 * @bodyparam {String[]} [tags=[]] - Tags associated with property. Should be an array of Strings.
 */
router.post('/properties/:id', catchErrors(propertyController.updateProperty));
module.exports = router;
