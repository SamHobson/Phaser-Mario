// Declare myGame, the object that contains our game's states
var myGame = {
  //Define our game states
  scenes: [],

  // Define common framerate to be referenced in animations
  frameRate: 10
};
var player1;
var player2;
var map;
var ground;
var groundLayer;
var ammo;
var p1AmmoCount=3;
var p2AmmoCount=3;
var p1AmmoText;
var p2AmmoText;
var p1Score=0;
var p2Score=0;
var p1ScoreText;
var p2ScoreText;
var textBoard;
var winner;
var winName;
var retry;
var keyA;
var keyD;
var keyS;
var keyW;
var keySpace;
var keyEnter;
var cursors;