var Balloon;
var database,backgroundImg;
var hotairballoon;
var position;
function preload(){
    database = firebase.database();
    backgroundImg = loadImage("Hot Air Ballon-01.png");
    hotairballoon = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png")

}

function setup() {
  createCanvas(1000,640);
  Balloon = createSprite(500,300, 50, 50);
  Balloon.addAnimation("hotairballoon", hotairballoon);   
  Balloon.scale = 0.5;


  var balloonposition = database.ref('balloon/position');
  balloonposition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg); 

  fill("red");
  textSize(20);
  text("Use the arrow keys to move the Hot Air Balloon", 30, 30);

  if(keyDown(UP_ARROW)){
      writePosition(0,-5);
  }
  if(keyDown(DOWN_ARROW)){
    writePosition(0,+5); 
  }
  if(keyDown(LEFT_ARROW)){
    writePosition(-5,0);
 }
 if(keyDown(RIGHT_ARROW)){
   writePosition(+5,0);
 }

  drawSprites();
}

function writePosition(x, y){
  database.ref("balloon/position").set(
    {
    'x': position.x + x,
    'y': position.y  + y
    }
   )
}

function readPosition(data){
  position = data.val();
  Balloon.x = position.x;
  Balloon.y = position.y;
  }

function showError(){
  console.log("error");
}

