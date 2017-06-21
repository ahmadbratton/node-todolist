const express = require("express");
const mex = require("mustache-express");
const bodyparser = require("body-parser");
const app = express();
const expressValidator = require("express-validator");
const jsonFile = require("jsonfile");

app.engine("mustache", mex());

app.set("views", "./views");
app.set("view engine", "mustache");

let todos = [];
let complete = [];

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(expressValidator());
app.use(express.static("public"));

app.get("/", function (req , res) {
  res.render("index", {todos: todos, complete: complete});


});


app.post("/", function (req, res) {
  if (req.body.todos){
  todos.push(req.body.todos);
  res.redirect("/");}
  else {
    todos.splice(todos.indexOf(req.body.complete),1)
    complete.push(req.body.complete);
    res.redirect("/");
  }

});





app.listen(3000, function () {
  console.log("whats up mane");
});
