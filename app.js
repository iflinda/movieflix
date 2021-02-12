/*
 Authors: Linda Nguyen
 Your name and student #: A01086634
 Your Partner's Name and student #: N/A
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs")
let app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let formData = req.body.movies;
  let movieList = formData.split(",");
  res.render("pages/index", { result: movieList });
});

app.get("/myListQueryString", (req, res) => {
  let movieList = []
  movieList.push(req.query.movie1);
  movieList.push(req.query.movie2);
  res.render("pages/index", { result: movieList });
});

app.get("/search/:movieName", (req, res) => { // Not able to finish this function in time (it has the basic logic complete)
  let movie = req.params.movieName;  
  fs.readFile("movieDescriptions.txt", "utf8", function(err, data) {
    if (err) throw err;
    if (data.includes(movie)) {
      console.log("Contains Movie")
    } else {
      console.log("No Movie")
    }
    res.render("pages/searchResult")
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});