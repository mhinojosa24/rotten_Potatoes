// initilize template
const express = require('express');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes',
{ useNewUrlParser: true });

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String,
    description: String
});
const app = express();

// MiddleWare
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));


app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: true }));
// Override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// Index
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})


// NEW
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})


// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) }).catch((err) => {
    console.log(err.message)
    })
});
// SHOW
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
    }).catch((err) => {
        console.log(err.message)
    });
});

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', { review: review });
    });
});

// UPDATE
app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            res.redirect(`/reviews/${review._id}`)
        }).catch(err => {
            console.log(err.message)
        });
});

// DELETE
app.delete('/reviews/:id', (req, res) => {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    });
});

app.listen(port);
