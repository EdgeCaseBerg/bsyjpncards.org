const fs = require('fs');
const flashcards = require('../assets/flashcards.json')

const formattedText = JSON.stringify(flashcards, null, '    ')

fs.writeFile('./../assets/flashcards.json', formattedText, console.error)
