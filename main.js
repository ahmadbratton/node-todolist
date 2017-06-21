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
let info_file = "list.json";

jsonFile.readFile(info_file, function (error, object) {
  todos = object.todos;
  complete = object.complete;
});

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
  }
  else {
    todos.splice(todos.indexOf(req.body.complete),1)
    complete.push(req.body.complete);

  }
  let object = {
    todos: todos,
    complete: complete
  };
  jsonFile.writeFile(info_file, object, function (error) {
    if (error){
      console.log("error writing file: ", error);
    }
  })
    res.redirect("/");
});







app.listen(3000, function () {
  console.log("whats up mane");
});
