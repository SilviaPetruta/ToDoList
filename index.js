const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const indexRouter = require('./routes/indexRouter');
const todolistRouter = require('./routes/todolistRouter');

mongoose.connect(`${process.env.databaseURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

app.set('view engine', '.hbs');

app.use('/', indexRouter);
app.use('/todolist', todolistRouter);


app.listen(3006, () => {
    console.log('I am listening on 3006');
});