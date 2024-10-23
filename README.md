# Flatten This Folder

`flatten` is a _CLI_ (command-line interface) that will flatten your folder structure in whatever folder you run it in. All the files in all the sub-folders will be moved to the current directory. No folders are deleted or moved.

If a filename collision happens, the CLI will append the filename with a dash and a number (e.g. `-1`, `-2`, ... `-69`). If any error happens, it will be logged and the corresponding file will not be moved.

## Install

`npm install -g flatten-this-folder`

## Use

In your _terminal_ run `flatten`, this will flatten the current folder `.`

Running `flatten abc` will flatten the folder `abc` inside the current working directory in your _terminal_.

## Catastrophe prevention

Any time there are more than 10 files being moved, the _CLI_ will notify you of the total number and will require you type in "yes" before it will move files.

⚠ **WARNING** ⚠ - running `flatten` in any _system directory_ (and then typing in "yes" for the _CLI_ to do its work) is _dangerous_ since there is no "undo" after files move (can break your computer).

## Developing

Edit the `move.js` file and run `npm start` to see your script working

- `npm start` will run the command against the _playground_ folder
- `npm run test` will test that the renamed file list matches the expected outcome
- `npm run reset` will reset the _playground_ folder to its original form
- `npm run check` will perform the above three tasks one after another:
  1. flatten the _playground_ folder
  2. run the test
  3. reset the _playground_ folder to its initial state
- `npm run global` will install the `flatten` _CLI_ / terminal command for you to use

## Todo

- [ ] if argv[2] `.startsWith('.')` filter for the file (e.g. `flatten .mp4` only moves _.mp4_ files)
- [ ] if argv[2] `.equals('dry')` only console log everything
- [ ] unit test to check file contents too
