## README
TODO:
```md
1. Detail introduction about project
2. Getting started guide
3. Contacts
```

## SUPPORTED ENDPOINTS
#### I. (_Route_) CREATE Property
Create a single property.

|   Method  |   Path            |
|:------:|:------:|
|   `POST`  |   `/properties`   |

###### Body Parameters:

|   Name   |    Type    |   Attributes  |   Default |   Description |
|:------|:------:|:------:|:------:|:------|
|   `name `           |   `String`      |   `required`  |       |`Name` field of property|
|   `description`     |   `String`      |   `required`  |       |`Description` field of property|
|   `thumbnailImg`    |   `[String]`    |   optional    |   []  |Thumbnail images of property. Expecting 360x180|
|   `mainImg`         |   `[String]`    |   optional    |   []  |Main images of of property. Expecting 1920×1080 or better resolution. |
|   `tags`            |   `[String]`    |   optional    |   []  |Tags associated with property. Will be stored with `toLowercase()` applied|
|   `location`        |   `{Object}`    |   optional    |   {}  |Nested object inside location include: `address: {String}` and `coordinates: [lat, long]`|

##### Sample POST (`/properties`):
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
#### II. (_Route_) GET Properties
Get a list of **ALL** properties available.

|   Method  |   Path            |
|:------:|:------:|
|   `GET`  |   `/properties`   |

##### Sample GET response (`/properties`):
```json
{
  "statusCode": 200,
  "message": "Successfully retrieved a list of properties.",
  "properties": [
    {
      "_id": "5927cd237d70ac76d7837904",
      "slug": "some-ranch",
      "name": "Some Ranch",
      "description": "Some ranch is a very beautiful style ranch",
      "__v": 0,
      "location": {
        "address": "200 W Powell Blvd",
        "coordinates": [
          -152.442489,
          45.49762
        ],
        "type": "Point"
      },
      "createdAt": "2017-05-26T06:37:23.383Z",
      "tags": [
        "morehouse",
        "modern",
        "ranch"
      ],
      "mainImg": [
        "https://placehold.it/1920x1080"
      ],
      "thumbnailImg": [
        "http://placehold.it/360x180"
      ]
    },
    {
      "_id": "5927cd2f7d70ac76d7837905",
      "slug": "some-boot",
      "name": "Some Boot",
      "description": "Some Boot is a very beautiful style ranch",
      "__v": 0,
      "location": {
        "address": "200 W Powell Blvd",
        "coordinates": [
          -152.442489,
          45.49762
        ],
        "type": "Point"
      },
      "createdAt": "2017-05-26T06:37:35.560Z",
      "tags": [
        "morehouse",
        "modern",
        "ranch"
      ],
      "mainImg": [
        "https://placehold.it/1920x1080"
      ],
      "thumbnailImg": [
        "http://placehold.it/360x180"
      ]
    }
  ]
}
```
#### III. (_Route_) GET Property By Id
Get a single property given id.

|   Method  |   Path            |
|:------:|:------:|
|   `GET`  |   `/properties/:id`   |

###### Route Parameters:
|   Name  |   Type            | Description|
|:------|:------:|:-----|
|   `:id`  |   `String`            | `:id` supplied is the unique identifier for single property|

##### Sample GET response (`/properties/5927cd237d70ac76d7837904`):
```json
{
  "statusCode": 200,
  "message": "Found object with id: 5927cd237d70ac76d7837904",
  "property": {
    "_id": "5927cd237d70ac76d7837904",
    "slug": "some-ranch",
    "name": "Some Ranch",
    "description": "Some ranch is a very beautiful style ranch",
    "__v": 0,
    "location": {
      "address": "200 W Powell Blvd",
      "coordinates": [
        -152.442489,
        45.49762
      ],
      "type": "Point"
    },
    "createdAt": "2017-05-26T06:37:23.383Z",
    "tags": [
      "morehouse",
      "modern",
      "ranch"
    ],
    "mainImg": [
      "https://placehold.it/1920x1080"
    ],
    "thumbnailImg": [
      "http://placehold.it/360x180"
    ]
  }
}
```

#### IV. (_Route_) GET Property By Slug
Get a single property given slug.

|   Method  |   Path            |
|:------:|:------:|
|   `GET`  |   `/properties/slug/:slug`   |

###### Route Parameters:
|   Name  |   Type            | Description|
|:------|:------:|:-----|
|   `:slug`  |   String            | `:slug` supplied is the user unique friendly name supplied to property route|

##### Sample GET response (`/properties/slug/some-ranch`):

```json
{
  "statusCode": 200,
  "message": "Found object matching slug: some-ranch",
  "property": {
    "_id": "5927cd237d70ac76d7837904",
    "slug": "some-ranch",
    "name": "Some Ranch",
    "description": "Some ranch is a very beautiful style ranch",
    "__v": 0,
    "location": {
      "address": "200 W Powell Blvd",
      "coordinates": [
        -152.442489,
        45.49762
      ],
      "type": "Point"
    },
    "createdAt": "2017-05-26T06:37:23.383Z",
    "tags": [
      "morehouse",
      "modern",
      "ranch"
    ],
    "mainImg": [
      "https://placehold.it/1920x1080"
    ],
    "thumbnailImg": [
      "http://placehold.it/360x180"
    ]
  }
}
```

#### V. (_Route_) GET Tags
Get all the tags available with their associated counts.

|   Method  |   Path            |
|:------:|:------:|
|   `GET`  |   `/tags`   |

##### Sample GET response (`/tags`):

```json
{
  "statusCode": 200,
  "message": "Successfully retrieved a list of all tags with associated counts.",
  "tags": [
    {
      "_id": "ranch",
      "count": 2
    },
    {
      "_id": "modern",
      "count": 2
    },
    {
      "_id": "morehouse",
      "count": 2
    }
  ]
}
```

#### VI. (_Route_) GET Property by Tag
Get all the properties with a given tag.

|   Method  |   Path            |
|:------:|:------:|
|   `GET`  |   `/properties/tags/:tag`   |

###### Route Parameters:
|   Name  |   Type            | Description|
|:------|:------:|:-----|
|   `:tag`  |   String            | `:tag` is a label associated with a property|

##### Sample GET response (`/properties/tags/ranch`):

```json
{
  "statusCode": 200,
  "message": "Successfully retrieved 2 properties tagged ranch",
  "properties": [
    {
      "_id": "5927cd237d70ac76d7837904",
      "slug": "some-ranch",
      "name": "Some Ranch",
      "description": "Some ranch is a very beautiful style ranch",
      "__v": 0,
      "location": {
        "address": "200 W Powell Blvd",
        "coordinates": [
          -152.442489,
          45.49762
        ],
        "type": "Point"
      },
      "createdAt": "2017-05-26T06:37:23.383Z",
      "tags": [
        "morehouse",
        "modern",
        "ranch"
      ],
      "mainImg": [
        "https://placehold.it/1920x1080"
      ],
      "thumbnailImg": [
        "http://placehold.it/360x180"
      ]
    },
    {
      "_id": "5927cd2f7d70ac76d7837905",
      "slug": "some-boot",
      "name": "Some Boot",
      "description": "Some Boot is a very beautiful style ranch",
      "__v": 0,
      "location": {
        "address": "200 W Powell Blvd",
        "coordinates": [
          -152.442489,
          45.49762
        ],
        "type": "Point"
      },
      "createdAt": "2017-05-26T06:37:35.560Z",
      "tags": [
        "morehouse",
        "modern",
        "ranch"
      ],
      "mainImg": [
        "https://placehold.it/1920x1080"
      ],
      "thumbnailImg": [
        "http://placehold.it/360x180"
      ]
    }
  ]
}
```

#### VII. (_Route_) GET Search
Get all the properties matching a given query based on word frequency in name and description. If no limit is given, result will default to first 10 results.

|   Method  |   Path            |
|:------:|:------:|
|   `GET`  |   `/search`   |

###### Query Parameters:
|   Name  |   Type            | Description|
|:------|:------:|:-----|
|   `q`         |   `String`            | `q` is the query for terms matching words in name or description |
|   `limit`     |   `Integer`           | If provided, `limit` will limit the result set to a given number. Default to `10` if none is provided. |


##### Sample GET response (`/search?q=ranch`):

```json
{
  "statusCode": 200,
  "message": "Successfully retrieved 2 results matching: ranch",
  "properties": [
    {
      "_id": "5927cd237d70ac76d7837904",
      "slug": "some-ranch",
      "name": "Some Ranch",
      "description": "Some ranch is a very beautiful style ranch",
      "__v": 0,
      "score": 2.125,
      "location": {
        "address": "200 W Powell Blvd",
        "coordinates": [
          -152.442489,
          45.49762
        ],
        "type": "Point"
      },
      "createdAt": "2017-05-26T06:37:23.383Z",
      "tags": [
        "morehouse",
        "modern",
        "ranch"
      ],
      "mainImg": [
        "https://placehold.it/1920x1080"
      ],
      "thumbnailImg": [
        "http://placehold.it/360x180"
      ]
    },
    {
      "_id": "5927cd2f7d70ac76d7837905",
      "slug": "some-boot",
      "name": "Some Boot",
      "description": "Some Boot is a very beautiful style ranch",
      "__v": 0,
      "score": 0.625,
      "location": {
        "address": "200 W Powell Blvd",
        "coordinates": [
          -152.442489,
          45.49762
        ],
        "type": "Point"
      },
      "createdAt": "2017-05-26T06:37:35.560Z",
      "tags": [
        "morehouse",
        "modern",
        "ranch"
      ],
      "mainImg": [
        "https://placehold.it/1920x1080"
      ],
      "thumbnailImg": [
        "http://placehold.it/360x180"
      ]
    }
  ]
}
```

#### VIII. (_Route_) GET Properties Given Location (lng, lat)
Get all the properties within certain distance of a given location.
Will only return certain selected properties of the Entity back.

|   Method  |   Path            |
|:------:|:------:|
|   `GET`  |   `/search/properties/near`   |

###### Query Parameters:
|   Name  |   Type            | Description|
|:------|:------:|:-----|
|   `lng`         |   `String`            | `lng` is the given longitude of location |
|   `lat`         |   `String`            | `lat` is the given latitude of location |
|   `distance`    |   `String`            | If provided, `distance` will limit the properties to within the given distance. Default to 10km if none is provided. |
|   `limit`       |   `String`            | If provided, `limit` will limit the result set to given number. Default to `10` if none is provided. |


##### Sample GET response (`/search?q=ranch`):

```json
{
  "statusCode": 200,
  "message": "Succesfully retrieved 2 results within 10 km of given location",
  "properties": [
    {
      "_id": "5927cd237d70ac76d7837904",
      "slug": "some-ranch",
      "name": "Some Ranch",
      "description": "Some ranch is a very beautiful style ranch",
      "location": {
        "address": "200 W Powell Blvd",
        "coordinates": [
          -152.442489,
          45.49762
        ],
        "type": "Point"
      }
    },
    {
      "_id": "5927cd2f7d70ac76d7837905",
      "slug": "some-boot",
      "name": "Some Boot",
      "description": "Some Boot is a very beautiful style ranch",
      "location": {
        "address": "200 W Powell Blvd",
        "coordinates": [
          -152.442489,
          45.49762
        ],
        "type": "Point"
      }
    }
  ]
}
```

## JSDOC GUIDE
 Documentation provided by [JSDOC](https://github.com/bvanderlaan/jsdoc-route-plugin).
 
 Support for parsing ES2017 features (async-await, generators) from [jsdoc-babel](https://www.npmjs.com/package/jsdoc-babel).
 
```bash
To create new jsdoc, run:
./node_modules/.bin/jsdoc --configure jsdoc.conf --readme readme.md out/index.js.html

```

