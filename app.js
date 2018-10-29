const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  res.render('home', { msg: 'Handlebars are Cool!' });
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
