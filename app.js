const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/day.js");

const app = express();

let newList = [];
let workList = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

    let day = date.getDate();

    res.render("list", {ListTitle: day, newListItem: newList});
});

app.get("/work", function(req, res) {
    res.render("list", {ListTitle: "work", newListItem: workList});
});

app.post("/", function(req, res) {
    if (req.body.button === "work") {
        workList.push(req.body.newItem);
        res.redirect("/work");
    } else {
        newList.push(req.body.newItem);
        res.redirect("/");
    }
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.listen(3000, function() {
    console.log("Server started at port 3000");
});
