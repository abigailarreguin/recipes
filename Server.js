var express = require("express");
var app = express();
var router = express.Router();
var path = require('path');
const http = require('http')
const port = 3000;
var pg = require('pg');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//The following is setting up the connection to the database and linking the home page.
app.listen(3000,function(){
  console.log("Live at Port 3000");
});

var mysql = require('mysql');
  var connection = mysql.createConnection({
      host: 'localhost',
      port: '3300',
      user: 'root',
      password: '5709',
      database: 'recipedb'
      
  });
  
  connection.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
  });

//Directs user to home screen
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+"/views/index.html"));
  // connection.query('SELECT * FROM recipedb.recipelist',function(err, rows, fields) {

  // }
});

//allows user to be directed to "add a recipe" page
app.get('/add', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/add.html'));
});

//allows entries from add page to be saved into database
app.post('/add', function(req, res){
        res.send(JSON.stringify({
            recipename: req.body.recipename || null,
            mealtype: req.body.mealtype || null,
            recipe: req.body.recipe || null
        }));

        var sql = "INSERT INTO recipedb.recipelist (RecipeName, mealtype, Recipe) VALUES ('"+req.body.recipename+"','"+req.body.mealtype+"','"+req.body.recipe+"')";   
});
