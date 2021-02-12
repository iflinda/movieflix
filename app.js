/*
 Authors: Linda Nguyen
 Your name and student #: A01086634
 Your Partner's Name and student #: N/A
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises
let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Due to the way I set up my HTML, it requires me to load in a empty array. I feel like this could have been done better.
// Potentially I would just create the HTML in this section dynamically. 
app.get("/", (req, res) => res.render("pages/index", { result: [] }));

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

// I feel like there is a better way to code this function--it feels a little bit "off" to me.
// I think it may have something to do with the way I set up the HTML.
// Since it requires 3 parameters to work, I have to push empty strings if nothing is found.
// Potentially I would just create the HTML in this section dynamically.
app.get("/search/:movieName", (req, res) => {  
  let movie = req.params.movieName;  
      fs.readFile("movieDescriptions.txt", "utf8", function(err, data) {
    })
    .then(data => {
      if (data.includes(movie)) {
        let movies = data.split("\n")
        for (line in movies) {
          if (movies[line].includes(movie)) {
            let movieInfo = movies[line].split(":")
            let synopsis = movieInfo[1]
            res.render("pages/searchResult", { result: movieInfo[0], synopsis: synopsis, link: "http://localhost:3000"})
          }
        }
      } else {
        res.render("pages/searchResult", { result: "Movie could not be found.", synopsis: "", link: ""})
      }
    })
    .catch(err => {
      console.log(err);
    })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});