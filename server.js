
const express = require('express');
const fs = require('fs');
var uniqid = require('uniqid');
const util = require('util');


// initiate express 
const app = express();

const PORT = process.env.PORT || 3002;

let db = require('./db/db.json');

app.use(express.static('public'));

// Define function to write JSON file

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTML routes 

app.get('/api/notes', (req, res) => res.json(db));

app.get('/notes', (req, res) => {res.sendFile(__dirname + '/public/notes.html')});

  
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body

    if (req.body ) {
        const newNote = {
            id: uniqid(),
            title,
            text
        }

        db.push(newNote);
        writeToFile('./db/db.json',db)
        res.json('Note Added Succesfully');     
    
    } else {
        res.error('Could not add new Note');
    }
})



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
