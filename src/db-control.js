//Interface to the database

const fs = require ("fs");
const DB_FILE = "./db/db.json"

//function to read the notes from db.json

function readNotes () {
    const data = fs.readFileSync(DB_FILE, {
        encoding:"utf8"
    });

    return JSON.parse (data);
}

//function to save & write the notes into db.json

function saveNotes (notes) {
    const data = JSON.stringify (notes);
    fs.writeFileSync (DB_FILE, data);
}

//allows it to be exported to other files
module.exports = {
    readNotes, saveNotes
};
