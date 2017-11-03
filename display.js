function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var colorSelector = {
  getColor : function() {
    var randomIndex = getRandomInt(0, this.colorCodes.length);

    if(this.colorCodes[randomIndex] === this.lastColor) {
      return this.getColor();
    } else {
      this.lastColor = this.colorCodes[randomIndex];
      return this.colorCodes[randomIndex];
    }  
  },
  lastColor : undefined,
  colorCodes : ['#C62828', '#827717', '#0277BD', '#00838F', '#1B5E20', '#455A64', '#F4511E', '#757575'],
}

function getImg(username) {
  var random = getRandomInt(0,2);


  if(streams.users[username].sex) {
    return 'man-pic.png';
  } else {
    return 'woman-pic.png';
  }
}

function loadTweets(tweets, elementAfterTwitsAreInserted, numberOfTwitsToLoad) {
  var index = tweets.length - 1;
  while(index >= (tweets.length - numberOfTwitsToLoad)) {
    var tweet = tweets[index];
    var twitColor = colorSelector.getColor();
    var $tweet = $('<div class="scrollme animateme" data-when="enter" data-from="0.5" data-to="0" data-crop="false" data-opacity="0" data-scale="1.5" style="opacity: 1; transform: translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1, 1, 1);">\
      <div class="twit" style="background-color:' + twitColor + '">\
      <p class="twit-date">' + tweet.created_at +'</p>\
      <div class="horizontal">\
        <img src="' + getImg(tweet.user) + '" class="profile_icon"></img>\
        <a class="twit-user">@' + tweet.user +'</a>\
      </div>\
      <p class="twit-content">' + tweet.message +'</p>\
    </div></div>');
    $tweet.insertBefore(elementAfterTwitsAreInserted);
    index -= 1;
  }
  scrollme.init();
}

function loadUserTweets(tweets) {
  var index = tweets.length - 1;
  var $profileHeader = $('<section>\
<img src="' + getImg(tweets[0].user) +'" class="profile_icon timeline_profile_icon"></img>\
<h2>@' + tweets[0].user +'</h2>\
<ul class="ul_user_info">\
<li class="user_info">Number Of Tweets: ' + tweets.length + '</li>\
<li class="user_info">Following: ' + getRandomInt(100, 700) +'</li>\
</ul></section>');
  $profileHeader.insertBefore('.footer');
  while(index >= 0) {
    var tweet = tweets[index];
    var twitColor = "#8BC34A";
    var $tweet = $('<div class="scrollme animateme" data-when="enter" data-from="0.5" data-to="0" data-crop="false" data-opacity="0" data-scale="1.5" style="opacity: 1; transform: translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1, 1, 1);">\
<div class="twit" style="background-color:' + twitColor + '">\
<p class="twit-date">' + tweet.created_at +'</p>\
<div class="horizontal">\
</div>\
<p class="twit-content">' + tweet.message +'</p>\
</div>\
</div>');
    $tweet.css('margin-left', '25%');
    $tweet.css('margin-right', '25%');
    $tweet.insertAfter('section');
    index -= 1;
  }
  scrollme.init();
}

function filterByUser(tweets, user) {
  //user should be without @
  return tweets.filter(function(item) {
    return item.user === user;
  });
}

function animateButton(button) {
  var duration = 0.3;
  var delay = 0.08;
  TweenMax.to(button, duration, {scaleY: 1.6, ease: Expo.easeOut});
  TweenMax.to(button, duration, {scaleX: 1.2, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay});
  TweenMax.to(button, duration * 1.25, {scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3 });
}

$(document).ready(function() {
  console.log(streams);
  var $loadMoreButton = $('.load_twits');
  loadTweets(streams.home, $loadMoreButton, streams.home.length);
  $loadMoreButton.on('click', function() {
    var lastTweet = $('.scrollme').first()
    loadTweets(streams.home, lastTweet, 10);
    animateButton($loadMoreButton);
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });

  $('body').on('click', '.twit-user', function() {
    $('body').children('div').remove();
    var selectedUserTweets = filterByUser(streams.home, $(this).text().slice(1));
    loadUserTweets(selectedUserTweets);
    $('button').hide();
  });

  $('.title').on('click', function() {
    $('body').children('div').remove();
    $('body').children('section').remove();
    $('button').show();
    loadTweets(streams.home, $loadMoreButton, streams.home.length);
  });
});

