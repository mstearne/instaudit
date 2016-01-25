require("./env.js");
var Twitter = require('twitter');
var moment = require('moment');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var params = {q: process.argv[2]};
client.get('users/search', params, function(error, users, response){
  if (!error) {

  	for(j=0;j<users.length;j++){
  		if(users[j].verified==true){
  			console.log(users[j].name+" @"+users[j].screen_name);
  			console.log("Location"+ users[j].location);
  			console.log("Followers: "+users[j].followers_count);
  			console.log("Following: "+users[j].friends_count);
  			console.log("Tweets: "+users[j].statuses_count);
  			console.log("On Lists: "+users[j].listed_count);
  			console.log("Verified: "+users[j].verified);
//			var year=moment(users[j].created_at);
  			console.log("Member Since: "+users[j].created_at);
//  			console.log("Member Since: "+year.format("YYYY"));
			console.log("-------------------------------");
  		}
  	}
  }
});
