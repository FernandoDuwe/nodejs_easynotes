const vrNote = require('../models/note.model.js');

// Insert a new Note
exports.create = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Deve ser informada a estrutura do Note."
        })
    };

    const note = new vrNote({
        title: req.body.title || 'Sem Título',
        content: req.body.content
    });

    note.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro ocorreu ao criar o Note."
        });
    });
};

// Search all records 
exports.findAll = (req, res) => {
    vrNote.find().then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro ocorreu ao recuperar todos os Notes"
        });
    });
};

// Search a single record, using ID
exports.findOne = (req, res) => {
    vrNote.findById(req.params.noteID).then(note => {
        if(!note)
        {
            return res.status(404).send({
                message: "Nenhum Note encontrado com o id " + req.params.noteID
            });            
        }

        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note não encontrado com o ID " + req.params.noteID
            });
        }

        return res.status(500).send({
            message: "Erro ao recuperar o ID " + req.params.noteID
        });
    });
};

// Edit record
exports.update = (req, res) => {
   // Validate Request
   if(!req.body.content) {
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
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};