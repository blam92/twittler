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
  colorCodes : ['#2AAFE5', '#AD157A', '#EE8D0C', '#E50914', '#00A0DF', '#F26522', '#1AA19D', '#E7308A']
}

function getImg() {
  var random = getRandomInt(0,2);

  if(random === 0) {
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
        <img src="' + getImg() + '" class="profile_icon"></img>\
        <a class="twit-user">@' + tweet.user +'</a>\
      </div>\
      <p class="twit-content">' + tweet.message +'</p>\
    </div></div>');
    $tweet.insertBefore(elementAfterTwitsAreInserted);
    index -= 1;
  }
}

function filterByUser(tweets, user) {
  //user should be without @
  return tweets.filter(function(item) {
    return item.user === user;
  });
}

$(document).ready(function() {
  var $loadMoreButton = $('.load_twits');
  loadTweets(streams.home, $loadMoreButton, streams.home.length);

  $loadMoreButton.on('click', function() {
    var lastTweet = $('.scrollme').first()
    loadTweets(streams.home, lastTweet, 10);
  });

  $('.twit-user').on('click', function() {
    $('body').children('div').html('');
    var selectedUserTweets = filterByUser(streams.home, $(this).text().slice(1));
    loadTweets(selectedUserTweets, $loadMoreButton, selectedUserTweets.length);
  });

  $('.title').on('click', function() {
    $('body').children('div').html('');
    loadTweets(streams.home, $loadMoreButton, streams.home.length);
  });

});


