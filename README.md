# News

This applications uses cheerios to scrape world news articles from cp24 and allow you to view and make comments about it, with mongoose as the database and handlebars to render the webpage

# How to use

To use this application the first thing you need to do is run the /scrape route into the url to grab articles from cp24.

This will give you a bunch of articles that can be retrieved by using the "GET" methond in the default route, which then gives you the following options. 

You can click on the article image and then go straight to the article or you can click on the comments button .

Clicking on the comment button will redirect you to a diffrent route of /articles/:id. This route will run a "GET" method for the specific article and the populate the JSON object with the comments. In this page you can again go straight to the article by clicking on the article link or you can make a comment. 

Making a comment will run the /articles/:id but using the "POST" method and after will refresh the page showing the new comment.


