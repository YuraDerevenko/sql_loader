const { strict } = require('assert')
const { join } = require('path')
const SqlManager = require('../../src') 

const anotherQueriesQuery1 = 'SELECT * FROM public.schools;'

async function shouldLoadQueryFromFile() {
    const querySource = join(__dirname, '../load-dir/another-queries/query1.sql')

    await SqlManager.loadFile(querySource)

    strict.deepStrictEqual(SqlManager.getQuery('query1'), anotherQueriesQuery1)
}

async function run() {
    await shouldLoadQueryFromFile()
}

run()
