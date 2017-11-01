var colorCodes = ['#2AAFE5', '#AD157A', '#EE8D0C', '#E50914', '#00A0DF', '#F26522', '#1AA19D', '#E7308A'];
var lastColor;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getColor(colorArray, lastRandomColor) {
  var randomIndex = getRandomInt(0, colorCodes.length);

  if(colorArray[randomIndex] === lastRandomColor) {
    return getColor(colorArray, lastRandomColor);
  } else {
    return colorArray[randomIndex];
  }  
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
  var $body = $('body');
  //$body.html('');

  var index = streams.home.length - 1;
  while(index >= 0) {
    var tweet = streams.home[index];
    var $tweet = $('<div class="twit">\
      <p class="twit-date">' + tweet.created_at +'</p>\
      <div class="horizontal">\
        <img src="' + getImg() + '" class="profile_icon"></img>\
        <h1 class="twit-user">@' + tweet.user +'</h1>\
      </div>\
      <p class="twit-content">' + tweet.message +'</p>\
    </div>');
    twitColor = getColor(colorCodes, lastColor);
    $tweet.css('background-color', twitColor);
    lastColor = twitColor;
    $tweet.appendTo($body);
    console.log(lastColor);
    index -= 1;
    }
});