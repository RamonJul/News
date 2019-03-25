var logger = require("morgan");
var mongoose = require("mongoose");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

mongoose.connect("mongodb://localhost/unit18Populater", {
  useNewUrlParser: true
});
router.get("/scrape",function(req,res){

    axios.get("https://www.cp24.com/").then(function(response) {

      
        var $ = cheerio.load(response.data);

        $("li.newUpdate").each(function(i, element) {
      
          console.log("This is "+element)

          var title = $(element).children().text();
      
          // Find the h4 tag's parent a-tag, and save it's href value as "link"
          var link = $(element).children().attr("href");
      
          // Make an object with data we scraped for this h4 and push it to the results array
          results.push({
            title: title,
            link: link
          });
        });
      
        // After looping through each h4.headline-link, log the results
        console.log(results);
      });
         
})

router.get("/articles",function(req,res){


})

router.get("/articles./:id",function(req,res){


})

router.post("/articles/:id",function(req,res){

})
module.exports=router;
