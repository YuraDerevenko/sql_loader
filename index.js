const fs = require('fs')
const path = require('path')
const util = require('util')

const readDirAsync = util.promisify(fs.readdir)
const readFileAsync = util.promisify(fs.readFile)

const queries = new Map()

class SqlManager {
  static async loadDir (dirName) {
    try {
      const fileNames = await readDirAsync(dirName)

      for (const fileName of fileNames) {
        const fileNameWithoutExt = path.basename(fileName, '.sql')
        if (Boolean(queries.get(fileNameWithoutExt))) {
          const file = await readFileAsync(fileName, 'utf-8')
  
          queries.set(fileNameWithoutExt, file)
        }
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  static async loadFile (fileName) {
    try {
      const fileNameWithoutExt = path.basename(fileName, '.sql')
      if (Boolean(queries.get(fileNameWithoutExt))) {
        const file = await readFileAsync(fileName, 'utf-8')

        queries.set(fileNameWithoutExt, file)
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  static getQuery (queryName) {
    return queries.get(queryName)
  }
}

module.exports = SqlManager
