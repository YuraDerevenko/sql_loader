const { strict } = require('assert')
const { join } = require('path')
const SqlManager = require('../../src') 

const queriesQuery1 = 'SELECT * FROM public.students;'
const queriesQuery2 = 'SELECT * FROM public.teachers;'
const anotherQueriesQuery1 = 'SELECT * FROM public.schools;'

async function shouldLoadQueriesFromDirectory() {
    const querySource = join(__dirname, './queries')

    await SqlManager.loadDir(querySource)

    strict.deepStrictEqual(SqlManager.getQuery('query1'), queriesQuery1)
    strict.deepStrictEqual(SqlManager.getQuery('query2'), queriesQuery2)
}

async function shouldLoadQueriesFromDirectoryAndDoNotOverrideIfFileWithTheSameNameAlreadyLoaded() {
    const anotherQuerySource = join(__dirname, './another-queries')

    await SqlManager.loadDir(anotherQuerySource)

    strict.deepStrictEqual(SqlManager.getQuery('query1'), queriesQuery1) // file already loaded and ignored
    strict.deepStrictEqual(SqlManager.getQuery('query2'), queriesQuery2)
}

async function run() {
    await shouldLoadQueriesFromDirectory()
    await shouldLoadQueriesFromDirectoryAndDoNotOverrideIfFileWithTheSameNameAlreadyLoaded()
}

run()
