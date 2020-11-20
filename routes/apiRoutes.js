const fs = require('fs');
const util = require('util');
const {v4: uuidv4} = require('uuid'); //used to create an id automatically//call this in post.
const { json } = require('express');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
module.exports = function(app) {

//   const readNotes = fs.readFile('../data/db.json', 'utf8', (error, data) =>
//   error ? console.error(error) : console.log(data)
// );

  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  app.get("/api/notes", function(req, res) {
    return readFileAsync("data/db.json", "utf8").then((notes)=> {
      let parsedNotes; //parsedNotes
      try {
        parsedNotes = [].concat(JSON.parse(notes));
        console.log(parsedNotes);
      } catch (error) {
        parsedNotes = [];
      }
      return parsedNotes;
    }).then((notes)=> res.json(notes))
    .catch((err)=> res.status(500).json(err))
  });
  
  //POSTing a new note to /api/notes
  app.post("/api/notes", function(req, res) {
    let uniqueID = uuidv4();
    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uniqueID
    };
    readFileAsync("data/db.json", "utf8", (err,data)=> {
      if (err) throw err;

      const notes = JSON.parse(data);
      notes.push(newNote); 

      writeFileAsync("data/db.json", JSON.stringify(notes), err => {
        if (err) throw err;
        res.send("data/db.json");
        console.log("New note created");
      })
    })
  })
  
  //now to delete..
  app.delete("/api/notes/:id", function(req, res) {
    const id = req.params.id;
    return readFileAsync("data/db.json", "utf8").then((notes)=> {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
        console.log(parsedNotes);
      } catch (error) {
        parsedNotes = [];
      }
      return parsedNotes;
    }).then((notes)=> notes.filter((note)=> note.id !== id))
    .then((filteredNotes) => {return writeFileAsync("data/db.json", JSON.stringify(filteredNotes))})
  //identify id // post
  })

};