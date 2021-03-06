const express = require('express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const jwtCheck = require('./middleware/checkJwt');
// const routeLoader = require('./routes/helpers/routeLoader');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const guestsRouter = require('./routes/guests');
const weddingPartyRouter = require('./routes/wedding-party');
const registryRouter = require('./routes/registry');
const storyRouter = require('./routes/story');
const galleryRouter = require('./routes/gallery');

const app = express();

const corsOptions = {
    origin: process.env.CORS_URL,
    optionsSuccessStatus: 200
}
console.log(corsOptions)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(jwtCheck);

app.get('/authorized', (req, res) => {
    res.send('Secured Resource');
})

// routeLoader(app);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/guests', guestsRouter);
app.use('/registry', registryRouter);
app.use('/story', storyRouter);
app.use('/gallery', galleryRouter);
app.use('/wedding-party', weddingPartyRouter);


module.exports = app;
