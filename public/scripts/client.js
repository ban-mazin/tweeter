/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// when the document is ready load the file
$(document).ready(() => {
// escape function for xss security
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//creating tweet element
const createTweetElement = function(tweet) {
  let tweetBody = `<article class="tweet">
  <header>
    <div calss="profile"> 
    <img src=${tweet.user.avatars} >
      <span> ${tweet.user.name} </span>
      </div>
    <div>
    <p>${tweet.user.handle}</p>
    </div>
  </header>
  <div> <p>${escape(tweet.content.text)}</p></div>
  <footer>
    <div><p>${moment(tweet.created_at).fromNow()}</p></div>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
     </div>
  </footer>

</article>`;
  return tweetBody;
}
//rendering the tweet element with the data form the server
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweetContainer").prepend($tweet);
  }
  return;
};
  
//load tweet function
const loadtweets = function() {
  $("#tweetContainer").empty();
  // ajax GET request
  $.get("/tweets", function(data) {
    renderTweets(data);
  });
};
//load tweet for the first time
loadtweets()
  

const $postTweet = $('#tweetForm') 

$postTweet.on("submit", function(event) {
  event.preventDefault();
  $(".error").slideUp();
  const serializedData = $(this).serialize(); 
  if ($("#tweet-text").val().length > 140) {
    $("#Long").slideDown();
  } else if ($("#tweet-text").val().length <= 0) {
    $("#short").slideDown();
  } else {$.post("/tweets", serializedData)
    .then(() => loadtweets());
  $("#tweet-text").val("");
  $(".counter").val(140);
  }
});


$("#ToggleButton").on("click", function() {
  $("#tweet-text").focus();
  $(".error").slideUp();
  $(".new-tweet").slideToggle();
  $("#tweet-text").val("");
  $(".counter").val(140);  
  });
}); 


