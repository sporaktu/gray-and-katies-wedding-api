const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const {pool} = require('./config');

// const routeLoader = require('./routes/helpers/routeLoader');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const guestsRouter = require('./routes/guests');

const app = express();

const corsOptions = {
    origin: process.env.BASE_URL || 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routeLoader(app);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/guests', guestsRouter);


module.exports = app;
