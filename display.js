function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var colorSelector = {
  getColor : function() {
    var randomIndex = getRandomInt(0, this.colorCodes.length);

    if(this.colorCodes[randomIndex] === this.lastColor) {
      console.log(this.getColor());
      return this.getColor();
    } else {
      console.log(this.colorCodes[randomIndex]);
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

$(document).ready(function(){
  var $loadMoreButton = $('.load_twits');
  var index = streams.home.length - 1;
  while(index >= 0) {
    var tweet = streams.home[index];

    var $tweet = $('<div class="scrollme animateme" data-when="enter" data-from="0.5" data-to="0" data-crop="false" data-opacity="0" data-scale="1.5" style="opacity: 1; transform: translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1, 1, 1);"><div class="twit">\
      <p class="twit-date">' + tweet.created_at +'</p>\
      <div class="horizontal">\
        <img src="' + getImg() + '" class="profile_icon"></img>\
        <h1 class="twit-user">@' + tweet.user +'</h1>\
      </div>\
      <p class="twit-content">' + tweet.message +'</p>\
    </div></div>');

    twitColor = colorSelector.getColor();
    $tweet.css('background-color', twitColor);
    $tweet.insertBefore($loadMoreButton);
    index -= 1;
  }
});



