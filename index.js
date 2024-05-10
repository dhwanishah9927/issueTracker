const express = require('express');

const database = require('./config/mongoose');
const path = require('path');

const port = process.env.PORT || 8200;
const server = express();


const ejsLayouts = require('express-ejs-layouts');

server.set('layout extractStyles', true);
server.set('layout extractScripts', true);

server.set('view engine', 'ejs');
server.set('views', './views');

server.use(express.urlencoded());
server.use(express.static('assets'));
server.use(ejsLayouts);

server.use('/', require('./routes'));


server.listen(port, (error) => {
  if (error) {
    console.log(`Error in running the server: ${error}`);
  } else {
    console.log(`Server is running on port: ${port}`);
  }
});


