const vrMongoose = require('mongoose');

const vrNoteSchema = vrMongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = vrMongoose.model('Note', vrNoteSchema);