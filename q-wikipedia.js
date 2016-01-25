require("./env.js");
var WikiScraper = require("wikiscraper");
 
// var wikiscraper = new WikiScraper([
//   "Helium",
//   "Hydrogen",
//   "Oxygen",
//   "Lithium"
// ]);

var wikiscraper = new WikiScraper([process.argv[2]]);

console.log("Looking up "+process.argv[2]);


 
/* Callback Style */
 
var elements = [];
 
wikiscraper.scrape(function(err, element) {
  if (!err) {
    console.log(element);
    elements.push(element);
  }
  else {
    console.error(err);
  }
});
 
wikiscraper.on("sitesloaded", function() {
  console.dir(elements);
});
 
/* Event style */
 
// wikiscraper.scrape();
 
// wikiscraper.on("siteloaded", function(site, numberLoaded) {
//   console.log("Loaded site", numberLoaded, ":", site);
// });
 
// wikiscraper.on("sitesloaded", function(sites) {
//   console.dir(sites);
// });
 
// wikiscraper.on("err", function(error) {
//   console.error("Oh no!", error);
// });
