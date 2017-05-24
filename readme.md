## README
TODO:
```md
1. Detail introduction about project
2. Getting started guide
3. Contacts
```

## SUPPORTED ENDPOINTS
#### (_Route_) CREATE Property
Create a single property.

|   Method  |   Path            |
|:------:|:------:|
|   `POST`  |   `/properties`   |

###### Body Parameters:

|   Name   |    Type    |   Attributes  |   Default |   Description |
|:------|:------:|:------:|:------:|:------|
|   name            |   String      |   `required`  |       |Name field of property|
|   description     |   String      |   `required`  |       |Description field of property|
|   thumbnailImg    |   [String]    |   optional    |   []  |Thumbnail images of property. Expecting 360x180|
|   mainImg         |   [String]    |   optional    |   []  |Main images of of property. Expecting 1920×1080 or better resolution. |
|   tags            |   [String]    |   optional    |   []  |Tags associated with property. Will be stored with `toLowercase()` applied|
|   location        |   {Object}    |   optional    |   {}  |Nested object inside location include: `address: {String}` and `coordinates: [lat, long]`|

##### Sample POST:
```json
{
	"name": "Some Villa",
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lectus tellus.",
	"tags": ["Morehouse", "Modern", "Villa"],
	"thumbnailImg": ["http://placehold.it/360x180"],
	"mainImg": ["https://placehold.it/1920x1080"],
	"location": {
		"coordinates": [-122.442489, 45.497620],
		"address": "1000 W Powell Blvd"
	}
}
```
#### (_Route_) GET Properties
Get a list of **ALL** properties available.

|   Method  |   Path            |
|:------:|:------:|
|   `GET`  |   `/properties`   |

## JSDOC GUIDE
 Documentation provided by [JSDOC](https://github.com/bvanderlaan/jsdoc-route-plugin).
 
 Support for parsing ES2017 features (async-await, generators) from [jsdoc-babel](https://www.npmjs.com/package/jsdoc-babel).
 
```javascript
To generate jsdoc, run:

./node_modules/.bin/jsdoc --configure jsdoc.conf --readme readme.md out/index.js.html

```

