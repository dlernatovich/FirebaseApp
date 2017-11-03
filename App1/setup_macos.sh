#!/bin/bash
# remove the modules folder
echo 'Remove the node modules folder'
rm -rf functions/node_modules
echo 'Move to functions directory'
cd functions
echo 'Installing npm'
npm install
echo 'Updating firebase functions'
npm i --save firebase-functions
echo 'Press enter for exit...'
read answer
