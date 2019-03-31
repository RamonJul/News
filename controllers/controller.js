const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./../models");
var mongo_ui=process.env.MONGODB_URI ||"mongodb://localhost/news";
mongoose.connect(mongo_ui, {
  useNewUrlParser: true
});

//load the articles
router.get("/", function (req, res) {

  db.Article.find({}).then((data) => {
    res.render("index.handlebars", {
      articles: data
    })
 
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
    res.redirect("/")
  });

})



router.get("/articles/:id", (req, res) => {
  console.log(req.params.id)
  db.Article.findOne({
    _id: req.params.id
  }).populate("notes").then((article) => {
    console.log(article)
    //  res.json(article)
    res.render("article.handlebars", article)
  })
})

router.post("/articles/:id", (req, res) => {
  db.Note.create(req.body).then((data) => {
    console.log(data._id)

    db.Article.findByIdAndUpdate({
      _id: req.params.id

    }, {
      $push: {
        notes: data._id
      }
    }, {
      new: true
    }).then((response) => {
      res.end()
    })

  })
})
module.exports = router;