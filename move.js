#!/usr/bin/env node

import { fdir } from 'fdir';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline'

const folder = process.argv[2] ? process.argv[2] : '.'

const cwd = path.resolve(process.cwd(), folder)
const api = new fdir().withFullPaths().crawl(folder);

const files = api.sync();

let filtered = []

files.forEach((file) => {
  if (path.parse(file).dir !== cwd) {
    filtered.push(file)
  }
})

if (filtered.length > 10) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const question = 'There are ' + filtered.length + ' files about to be moved, type in "yes" to proceed: '
  rl.question(question, answer => {
    if (answer === 'yes') {
      moveFiles(filtered)
    } else {
      red('No files moved: aborted by user')
    }
    rl.close();
  });
} else {
  moveFiles(filtered)
}

/**
 * Move files appending numbers to filenames in case of collision with existing file
 * @param {string[]} listOfFiles
 */
function moveFiles(listOfFiles) {
  listOfFiles.forEach((originalFilePath) => {
    const filename = path.parse(originalFilePath).base;
    let newPath = path.join(process.cwd(), folder, filename)
    const destination = newPath

    if (originalFilePath !== newPath) {
      let i = 1;
      while (fs.existsSync(newPath)) {
        newPath = appendFilename(destination, i)
        i++
      }

      move(originalFilePath, newPath)
    }
  });
}

/**
 * Moves file from oldPath to newPath; logs any error
 * @param {string} oldPath
 * @param {string} newPath
 */
function move(oldPath, newPath) {
  try {
    fs.renameSync(oldPath, newPath)
  } catch (err) {
    red(err) // maybe handle better
  }
}

/**
 * Take file path, append dash & number to filename
 * e.g. `C:\hello.txt` -> `C:\hello-1.txt`
 * @param {string} filePath
 * @param {number} num
 * @returns filepath string
 */
function appendFilename(filePath, num) {
  const extension = path.parse(filePath).ext
  const replaceIndex = filePath.lastIndexOf(extension)
  const appendedPath = filePath.substring(0, replaceIndex) + '-' + num.toString() + extension

  return appendedPath
}

function green(text) {
  console.log('\x1b[32m' + text + '\x1b[0m')
}

function red(text) {
  console.log('\x1b[31m' + text + '\x1b[0m')
}

function drawDivider() {
  const divider = '―'
  console.log(divider.repeat(process.stdout.columns))
}
