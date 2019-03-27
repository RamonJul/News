const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./../models");

mongoose.connect("mongodb://localhost/unit18Populater", {
  useNewUrlParser: true
});

router.get("/", function (req, res) {
  db.Article.find({}).then(function (data) {

  })

})

router.get("/scrape", (req, res) => {
  axios.get("https://www.cp24.com/world").then((response) => {
    const $ = cheerio.load(response.data);

    $("li.dc").each(function (i, element) {

      let link = $(element).children(".teaser").children(".teaser-image-wrapper").children(".teaserImage").children().attr("href");
      let image = $(element).children(".teaser").children(".teaser-image-wrapper").children(".teaserImage").children().children().attr("src");
      let title = $(element).children(".teaser").children(".teaserText").children(".bn-headline").children().text().trim();
      let text = $(element).children(".teaser").children(".teaserText").children(".teaserLead").children().text().trim();

      if (link && image && title && text) {
        let obj = {
          title: title,
          link: link,
          summary: text,
          image: image

        }
        db.Article.create(obj).then((articles) => {
          console.log(articles)
        })
    
      }

    });

  });

})
//load the articles


router.get("/articles./:id", function (req, res) {


})

router.post("/articles/:id", function (req, res) {

})
module.exports = router;