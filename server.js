const express    = require('express');
const app        = express();
const Pokemon    = require('./models/pokemon.js');
const methodOverride = require("method-override");

//set variable of port to 3000
const port = process.env.PORT || 4000;

//data
const pokemon = require('./models/pokemon.js')

// body-parser
app.use(express.static('public')); //statically match with file named public
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//NEW
app.get('/new', (req, res) => {
  res.render('new.ejs');
});

// EDIT route
app.get('/:id/edit', (req, res) => {
  res.render('edit.ejs', {
      data: Pokemon[req.params.id],
      id: req.params.id
  });
});

// EDIT
app.put('/:id', (req, res) => {
  Pokemon[req.params.id] = req.body;
  res.redirect('/');
});

// DELETE
app.delete('/:id', (req, res) => {
  Pokemon.splice(req.params.id, 1);
  res.redirect('/');
});

// SHOW
app.get('/:id', (req, res) => {
  res.render('show.ejs', { data: Pokemon[req.params.id] });
  });
  
// INDEX
app.get('/', (req, res) => {
res.render('index.ejs', { data: Pokemon });
});

// To push the new pokemon in
app.post('/', (req, res) => {
  Pokemon.push(req.body);
  res.redirect('/');
});


app.listen(port, () => {
    console.log("app is running on port: ", port);
  });