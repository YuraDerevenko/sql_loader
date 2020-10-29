# SQL query loader

Tool which help you manage your raw sql scripts

## Instalation
```sh
npm i queryloader
```

## Example
### Express project

user.router.js
```js
const UserService = require('./user.service')

router.use(UserService.filter)
```


user.service.js
```js
const sqlManager = require('queryloader')

class UserService {
     static async filter (req, res, next) {
        const querySource = path.join(__dirname, './queries') // path where you store your .sql files
        await sqlManager.loadDir(querySource)
        next()
    }
    
    async getAllUsers () {
    const query = sqlManager.getQuery('user.getAll') // your select all query is store in ./queries/user.getAll.sql
    return this.db.query(query)
  }
}
```

> **All your .sql files should have unique names**: Be very careful here!