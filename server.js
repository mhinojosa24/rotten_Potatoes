// initilize template
const express = require('express');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Review = require('./models/review');
// const Common = require('./models/comment');



// MiddleWare
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);
// reviews(app);


if(!module.parent) {
    app.listen(port);
}

module.exports = app;
