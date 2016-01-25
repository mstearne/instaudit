var fs = require('fs');
var phantom = require('phantom');
var slug = require('slug');
var path = require('path');

//var screenshot = require('screenshooter');

//console.log(screenshot);

var ssOptions={};

ssOptions.url=process.argv[2];
ssOptions.timeout=1;
ssOptions.directory="screenshots";

takeScreenshot(ssOptions);

// screenshooter.url
// url


 function takeScreenshot(params) {

	var url=params.url;
	var timeout = params.timeout;
	var directory=params.directory;

	var waitTimeout = timeout ? timeout : 0.5;


      if (!url) {

      	console.log("No URL")
      	return false;

      }

    phantom.create(function(ph) {

        ph.createPage(function(page) {

              page.setViewportSize(1024, 1000);

              console.log("Opening %s", url);

            page.open(url, function (status) {

                console.log("Waiting %s seconds...", timeout);

                setTimeout(function() {

                    var urlName = url.replace(/(https|http|:)/g, '');
                    var imageFile = path.join(directory, slug(urlName).replace(/\./g, '-') + ".png");

                    console.log("Writing screenshot to %s",imageFile);

                    page.render(imageFile, function() {

                        console.log("Image created");
                        ph.exit();

                        setTimeout(function() {

                            process.exit(0);

                        }, 1000);

                    });

                }, waitTimeout * 1000);

            });


        });
    });

  };


