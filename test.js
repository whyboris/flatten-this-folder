import { fdir } from 'fdir'
import * as assert from 'assert'

const api = new fdir().withRelativePaths().crawl("playground")

const files = api.sync()

const expected = [
    '123-1.txt',
    '123-2.txt',
    '123-3.txt',
    '123-4.txt',
    '123.txt',
    '987.txt',
    'a.b.c-1.txt',
    'a.b.c.txt',
    'abc-1.txt',
    'abc.txt'
  ]

assert.deepEqual(files, expected, "Actual file list different from expected, please see below:")

console.log("Hooray! The actual file list matches the expected outcome after flattening the 'playground' folder")
