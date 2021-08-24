const Beholder = window['beholder-detection'];

//create game elements
var wall = new Wall(new Vec2(60, 70), new Vec2(90, 70), new Vec2(60, 220), new Vec2(90, 220));
var wall2 = new Wall(new Vec2(660, 70), new Vec2(690, 70), new Vec2(660, 220), new Vec2(690, 220));
const ball = new Ball(350, 175);

//0 = start, 1 = playing
var gamestate = 0;

function lerp(a,b, c, d, v) {
  return c + (d - c) * (v - a) / (b - a); 
}

var markerAngle = 0;

//event listeners
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
let playerMarkerNum1;
let playerMarkerNum2;
let referenceMarker;

let player1score = 0;
let player2score = 0;

//init
let hasStarted = false;
function init() {

  Beholder.init('#beholder-root', { overlay_params: { present: true }, feed_params: { brightness: 0 }, camera_params: { rearCamera: true, torch: true, videoSize: 0 } });

  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");
  ctx.textAlign = "center";

  playerMarkerNum1 = Beholder.getMarker(1);
  playerMarkerNum2 = Beholder.getMarker(2);
  referenceMarker = Beholder.getMarker(0);

  //rotate wall2 180 degrees
  wall2.rotateTo(Math.PI);

  requestAnimationFrame(update);
}


function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      //player.position.x = relativeX;
      //player2.position.x = relativeX + 500;
      //wall.point1.x = relativeX;

    }
    var relativeY = e.clientY - canvas.offsetTop;
    if (relativeY > 0 && relativeY < canvas.height) {
      //player.position.y = relativeY;
      //player2.position.y = relativeY;
      //wall.point1.y = relativeY; 
    }
}

function keyDownHandler(e) {
  if (e.key == "q") {
    markerAngle -= .1;
    wall.rotateTo(markerAngle);
  }
  if (e.key == "e") {
    markerAngle += .1;
    wall.rotateTo(markerAngle);
  }

  if (e.key == "i") {
    markerAngle -= .1;
    wall2.rotateTo(markerAngle);
  }
  if (e.key == "p") {
    markerAngle += .1;
    wall2.rotateTo(markerAngle);
  }

  if (e.key == "w") {
    wall.translate(new Vec2(0, -50));
  }
  if (e.key == "a") {
    wall.translate(new Vec2(-50, 0));
  }
  if (e.key == "s") {
    wall.translate(new Vec2(0, 50));
  }
  if (e.key == "d") {
    wall.translate(new Vec2(50, 0));
  }

  if (e.keyCode == '38') {
    wall2.translate(new Vec2(0, -50));
  }
  if (e.keyCode == '37') {
    wall2.translate(new Vec2(-50, 0));
  }
  if (e.keyCode == '40') {
    wall2.translate(new Vec2(0, 50));
  }
  if (e.keyCode == '39') {
    wall2.translate(new Vec2(50, 0));
  }

  // if (e.key == "w") {
  //   wall.translateTo(new Vec2(100, 100));
  // }
  // if (e.key == "a") {
  //   wall.translateTo(new Vec2(200, 200));
  // }
  // if (e.key == "s") {
  //   wall.translateTo(new Vec2(300, 300));
  // }
  // if (e.key == "d") {
  //   wall.translateTo(new Vec2(50, 0));
  // }
}

function drawLine() {
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, 0);    // Move the pen to (30, 50)
  ctx.lineTo(canvas.width/2, canvas.height);  // Draw a line to (150, 100)
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
}

function drawText()
{
  ctx.font = '35px serif';
  ctx.fillText("Cyber-Hockey", canvas.width / 2, canvas.height / 2);

  ctx.font = '25px serif';
  ctx.fillText("Move your paddles onto the red squares to start", canvas.width / 2, (canvas.height / 2) + 30);

  ctx.font = '30px serif';
  ctx.fillText(player1score, canvas.width / 2 + 30, 40);
  ctx.fillText(player2score, canvas.width / 2 - 30, 40);
}

function drawSquares()
{
  ctx.beginPath();
  ctx.rect(canvas.width * 0.05, (canvas.height / 2) - 100, 75, 200);
  ctx.rect(canvas.width * 0.85, (canvas.height / 2) - 100, 75, 200);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function CheckMarkerLocations()
{
  var Xdiff = wall.center.x - (canvas.width * 0.05 + 30);
  var Ydiff = wall.center.y - (canvas.height / 2);
  var dist = Math.sqrt(Xdiff*Xdiff + Ydiff*Ydiff)

  if(dist < 10)
  {
    player1score = 2;
  }
  else player1score = 0;
}

let prevTime = Date.now();

function update() {

  //beholder update
  Beholder.update();

  //get marker objects
  // if(!playerMarkerNum1.present) console.log('missing 1');
  // if(!playerMarkerNum2.present) console.log('missing 2');
  // if(!referenceMarker.present) console.log('missing ref');

  if(gamestate == 0)
  {
    if(CheckMarkerLocations() == true)
    {
      gamestate = 1;
    }
    //if markers are in right location
    //change gamestate to 1
  }
  else if (gamestate == 1)
  {
     //delete text and squares
     //let ball update
  }


  //time stuff
  let currentTime = Date.now();
  let dt = currentTime - prevTime;
  prevTime = currentTime;

  //marker rotate code
  
  // console.log(playerMarkerNum2.center.y);
  wall.rotateTo(playerMarkerNum1.rotation - Math.PI / 2);
  wall.translateTo(new Vec2(
    lerp(158, 222, 0, 380, playerMarkerNum1.center.x),
    lerp(108, 76, 50, 300, playerMarkerNum1.center.y),
  ));

  wall2.rotateTo(playerMarkerNum2.rotation);
  wall2.translateTo(new Vec2(
    lerp(250, 310, 420, 800, playerMarkerNum2.center.x),
    lerp(108, 68, 50, 320, playerMarkerNum2.center.y),
  ));
  //wall.translateTo(new Vec2(75, 150));

  //get marker positions
  var refPos = new Vec2(referenceMarker.center);
  var p1Pos = new Vec2(playerMarkerNum1.center);
  var p2Pos = new Vec2(playerMarkerNum2.center);

  //update for game elements

  if(gamestate == 1)
  {
    ball.update(dt);
  }
  wall.update(dt);
  wall2.update(dt);

  //drawing
  draw();

  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.lineCap = "round";
  drawLine();
  drawText();
  drawSquares();

  wall.draw(ctx);
  wall2.draw(ctx);
  if(gamestate == 1)
  {
    ball.draw(ctx);
  }
}

window.onload = init;
