var google = require('google')
 

google.resultsPerPage = 5
var nextCounter = 0
var globalCounter=1;
var results=[];
google('site:'+process.argv[2], function (err, next, links){
  if (err) console.error(err)
 
  for (var i = 0; i < links.length; ++i) {
//    console.log((globalCounter++)+". "+links[i].title + ' - ' + links[i].link) // link.href is an alias for link.link 
//    console.log(links[i].description + "\n")
results.push(links[i]);
//console.log(links[i]);
  }
 
  if (nextCounter < 1) {
    nextCounter += 1
    if (next) next()
  }else{
  	console.log("Total indexed: "+google.totalResults);

//  	console.log(results)
  	for(j=0;j<results.length;j++){
  		console.log((j+1)+". "+results[j].title);
  	}
  }

})

