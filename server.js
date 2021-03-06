var express = require("express");

var PORT = process.env.PORT ||3000;

// Initialize Express
var app = express();

// Configure middleware



// Parse request body as JSON
app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
// Make public a static folder

app.use(express.static("public"));
var exphbs = require("express-handlebars");
var hbs=exphbs.create({
  defaultLayout: "main",
  helpers:{make_link:function(path){

    return `/articles/${path}`}
  }
})


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
var routes = require("./controllers/controller.js");
// Connect to the Mongo DB

app.use(routes);


app.listen(PORT, function() {

  console.log("Server listening on: http://localhost:" + PORT);
});

