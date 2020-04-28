const vrExpress    = require("express");
const vrBodyParser = require("body-parser");
const vrPort       = 3000;

const vrApp = vrExpress();

vrApp.use(vrBodyParser.urlencoded({
    extended: true
}));

vrApp.use(vrBodyParser.json());

// Database connection
const vrDBConfig = require('./config/database.config.js');
const vrMongoose = require('mongoose');

vrMongoose.Promise = global.Promise;

vrMongoose.connect(vrDBConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to the database');
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Routes
vrApp.get('/', (req, res) => {
    res.json({
        "message": "Welcome to easyNotes"
    });
});

// Listeners
require('./routes/note.routes.js')(vrApp);

vrApp.listen(vrPort, () => {
    console.log("Serviço escutando na porta " + vrPort + ".");
});