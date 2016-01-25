/// Scan URL for analytics code

"use strict";

var http = require("http");
var url = require('url');

var urlParsed = url.parse(process.argv[2]);

//console.log(urlParsed);
console.log("Parsing URL: " + process.argv[2]);

var options = {
  host: urlParsed.host,
  path: urlParsed.path
};

http.get(options, function(http_res) {
  // initialize the container for our data
  var data = "";

  // this event fires many times, each time collecting another piece of the response
  http_res.on("data", function(chunk) {
    // append this chunk to our growing `data` var
    data += chunk;
  });

  // this event fires *one* time, after all the `data` events/chunks have been gathered
  http_res.on("end", function() {
    // you can use res.send instead of console.log to output via express
    //        console.log(data);
    /// search throught the page for analytics.js, ga.js, conversion.js, gtm.js, 

    var foundTracking = false;
    var trackingStyle = [];

    if (data.search("analytics.js") > 0) {
      foundTracking = true;
      trackingStyle.push("GA-U");
    }
    if (data.search("ga.js") > 0) {
      foundTracking = true;
      trackingStyle.push("GA");
    }

    if (data.search("conversion.js") > 0) {
      foundTracking = true;
      trackingStyle.push("GA-Conversion");
    }
    if (data.search("gtm.js") > 0) {
      foundTracking = true;
      trackingStyle.push("GTM");
    }

    if (foundTracking == true) {
      console.log("Found Trackers: " + trackingStyle);
    } else {
      console.log("No Analytics Found");
    }

  });
});