const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { catchErrors } = require('../handlers/errorHandlers');
// Do work here
router.get('/properties', propertyController.getProperties);
router.post('/properties', catchErrors(propertyController.createProperty));
router.get('/properties/:id', catchErrors(propertyController.getPropertyById));
router.post('/properties/:id', catchErrors(propertyController.updateProperty));
module.exports = router;
