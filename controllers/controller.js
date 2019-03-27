var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./../models");

mongoose.connect("mongodb://localhost/unit18Populater", {
  useNewUrlParser: true
});
router.get("/",function(req,res){
  var results=[]
    axios.get("https://www.cp24.com/world").then(function(response) {

      
        var $ = cheerio.load(response.data);
 
        $("li.dc").each(function(i, element) {
          if(i<=10){
            var link= $(element).children(".teaser").children(".teaser-image-wrapper").children(".teaserImage").children().attr("href");         
            var image=$(element).children(".teaser").children(".teaser-image-wrapper").children(".teaserImage").children().children().attr("src");
            var title=$(element).children(".teaser").children(".teaserText").children(".bn-headline").children().text().trim();
            var text=$(element).children(".teaser").children(".teaserText").children(".teaserLead").children().text().trim();

            var obj={
                title:title,
                link:link,
                summary:text,
                image:image
        
            }
              results.push(obj);
          }
     
        });
      
        console.log(results);
       
      });
         res.json(results)
})

router.get("/articles",function(req,res){
db.Article.find({}).then(function(data){

})

})

router.get("/articles./:id",function(req,res){


})

router.post("/articles/:id",function(req,res){

})
module.exports=router;
