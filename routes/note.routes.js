module.exports = (prApp) => {
    const vrNotes = require('../controllers/note.controllers.js');

    prApp.post('/notes', vrNotes.create);

    prApp.get('/notes', vrNotes.findAll);

    prApp.get('/notes/:noteID', vrNotes.findOne);

    prApp.put('/notes/:noteID', vrNotes.update);

    prApp.delete('/notes/:noteID', vrNotes.delete);
}