# Assignment

## Module Used
| Module | Use |
| ------ | --- |
| Express | To create server |
| mongodb | To connect to mongodb database ( Mongodb Atlas ) |
| morgan | To create logs on screen |
| doten  | To add .env file |
| body-parser | To read req body parameter |

## Routes
| endpoint | Method |
| -------- | ------ |
| `/image/add` | POST |
| `/image` |  GET  |

### `/image/add`
Require
```
{
    url,
    name,
    type
}
```

Response
```
{
    _id,
    name,
    url,
    type
}
```

### `/image`
Query Parameter
```
limit : Number of images require ( must be greater than one)
nameString : Name of Image ( name is casesensitive )
```

## Build
To build the add locally

clone the repository

execute command npm init

make changes in MONGODB_URI and PORT number ( You can also create a .env file and add these variables in it)

execute node server.js to start server
