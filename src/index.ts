import { readdir, readFile } from 'fs'
import { basename, join } from 'path'
import { promisify } from 'util'

const readDirAsync = promisify(readdir)
const readFileAsync = promisify(readFile)

const queries = new Map()

export default class SqlManager {
  static async loadDir (dirName: string) {
    try {
      const fileNames = await readDirAsync(dirName)

      for (const fileName of fileNames) {
        const fileNameWithoutExt = basename(fileName, '.sql')
        if (!Boolean(queries.get(fileNameWithoutExt))) {
          const file = await readFileAsync(join(dirName, fileName), 'utf-8')
  
          queries.set(fileNameWithoutExt, file)
        }
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  static async loadFile (fileName: string) {
    try {
      const fileNameWithoutExt = basename(fileName, '.sql')
      if (!Boolean(queries.get(fileNameWithoutExt))) {
        const file = await readFileAsync(fileName, 'utf-8')

        queries.set(fileNameWithoutExt, file)
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  static getQuery (queryName: string): string {
    return queries.get(queryName)
  }
}
