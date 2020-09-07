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
const dbRouter = require('./routes/db');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routeLoader(app);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/guests', guestsRouter);
app.use('/db', dbRouter);


module.exports = app;
