const express = require('express');
const fs = require('fs');
const app = express()
const port = 3000
const path = require('path');
const { readNotes, saveNotes } = require('./src/db-control.js');

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
  const id = req.params.noteId;

  const notes = readNotes();

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      notes.splice(i, 1);
      res.status(200).send('success!');

      saveNotes(notes);
      return;
    }
  }

  res.status(400).send('note not found ;(');
});

// fs.writeFile("db/filename.json", JSON.stringify(reviews), (err) => {
//   err ? console.error(err) : console.log('success');
// });


app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`)
});
