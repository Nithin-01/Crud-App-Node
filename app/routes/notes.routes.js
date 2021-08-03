const router = require("express").Router()
const notes = require("../controllers/note.controller")
// Create a new note
router.post('/note', notes.create);

// Retrieve all Notes
router.get('/notes', notes.findAll);

// Retrive a single Note with noteID
router.get('/notes/:noteId', notes.findOne);

// update a Note with noteid
router.put('/notes/:noteId', notes.update);

//Delete a Note with noteId
router.delete('/notes/:noteId', notes.delete);

module.exports = router;


