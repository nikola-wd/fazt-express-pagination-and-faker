const path = require('path');
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/index');


const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fazt-pagination')
  .then(() => console.log('connected to db'))
  .catch(err => console.log(err));


  
  // settings 
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs');


  // middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  

  // routes 
  app.use(indexRoutes);


  // static files



  app.listen(app.get('port'), () => {
    console.log('listening on port: ', app.get('port'));
  })