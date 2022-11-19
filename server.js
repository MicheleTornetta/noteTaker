const express = require('express');
const fs = require('fs');
const app = express()
const port = 3000
const path = require('path');
const bodyParser = require('body-parser');
const { readNotes, saveNotes } = require('./src/db-control.js');

const jsonParser = bodyParser.json();

//tell to serve up public files in the public folder
app.use(express.static('public', {
  index: 'index.html'
}));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.get('/api/notes', (req, res) => {
  const notes = readNotes();

  res.type('json')
      .status(200)
      .send(JSON.stringify(notes));
});

app.delete('/api/notes/:noteId', (req, res) => {
  const id = Number(req.params.noteId);

  const notes = readNotes();

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      notes.splice(i, 1);
      saveNotes(notes);
      
      res.status(200).send('success!');

      return;
    }
  }

  res.status(400).send('note not found ;(');
});

app.post('/api/notes', jsonParser, (req, res) => {
  const notes = readNotes();
  
  let biggestId = -9999999999;

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id > biggestId) {
      biggestId = notes[i].id;
    }
  }

  notes.push({
    title: req.body.title,
    text: req.body.text,
    id: biggestId + 1
  });

  saveNotes(notes);

  res.status(200).send('OK');
});

// fs.writeFile("db/filename.json", JSON.stringify(reviews), (err) => {
//   err ? console.error(err) : console.log('success');
// });


app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`)
});
