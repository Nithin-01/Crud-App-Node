const Note = require ('../models/note.model');

// create and save a new note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content){
        return res.status(400).send({
            message:"Note content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    });

    //Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while create the Note"
        });
    });

};

// Retrive and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes =>{
        res.send(notes);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if (!note){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Note not found with Id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message:"Error retriving note with id " + req.params.noteId
        })
    })

};

// Update a note identified by the noteid in the request
exports.update = (req, res) => {
    //validate Request
    if(!req.body.content){
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404). send({
                message:"Note not found with Id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with Id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteID in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message : "Note deleted successfully!"});
    }).catch(err=>{
        if (err.kind === 'ObjectId' || err.name === 'Notfound'){
            return res.status (404).send({
                message: " Note not found with Id " + req.params.noteid
            });
        }
        return res.status(500).send({
            message : "Could not delete note with Id" + req.params.noteId
        });
    });
};
