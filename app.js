// initilize template
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
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

// MiddleWare
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));

app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: true }));

//mock array
//JS object
// let reviews = [
//     { title: "Great", movieTitle: "Batman II" },
//     { title: "Awesome Movie", movieTitle: "Titanic" },
//     { title: ""}
//

//Index
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})


//NEW
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})


// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
})
//SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})


//APPLICATION WAITING FOR ROUTES TO BE INSTANTIATED
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}!`);
// })

app.listen(port);
