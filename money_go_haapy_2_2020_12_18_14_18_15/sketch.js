var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var ground;
var score;
var background1, backgroundimage;
var survivaltime;
var gameState = "play";

function preload() {


  monkeyrunning = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  backgroundimage = loadImage("jungle.jpg");


}



function setup() {
  createCanvas(400, 400);

  ground = createSprite(250, 340, 800, 10);
  ground.velocityX = -4;

  FoodGroup = createGroup();
  obstacleGroup = createGroup();

  background1 = createSprite(0, 0, 800, 10);
  background1.addImage(backgroundimage);
  //background1.velocityX = -4;
  background1.scale = 1.5;


  monkey = createSprite(50, 300, 25, 25)
  monkey.addAnimation("running", monkeyrunning);
  monkey.scale = 0.11;

  score = 0;
}


function draw() {
  background("cyan");

camera.x = monkey.x
camera.y = monkey.y

if(gameState === "play"){


  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (background1.x < 100) {
    background1.x = background1.width / 2;
  }
  if (keyDown("space") && monkey.y >= 300) {
    monkey.velocityY = -13;
  }


  if (monkey.isTouching(obstacleGroup)) {
    gameState = "end";
  }
  monkey.velocityY = monkey.velocityY + 0.5

  monkey.debug = true;

  monkey.collide(ground);

  bananas();
  obstacles();
  drawSprites();
  

  stroke("blue");
  textSize(15);
  survivaltime = Math.ceil(frameCount / frameRate());
  text("SURVIVALtime: " + survivaltime, 50, 370);

  stroke("cyan");
  textSize(15);
  text("BANANAS EATEN: " + score, 210, 370);

  if (monkey.isTouching(FoodGroup)) {
    score = score + 5;
    FoodGroup.destroyEach();

    switch (score) {
      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.14;
        break
      case 30:
        monkey.scale = 0.16;
        break;
      case 40:
        monkey.scale = 0.18;
        break;
      default:
        break;
    }
  }
}
  if(gameState === "end"){
    monkey.destroy()
   textSize(40);
   fill("white");
   text("gameover", 0,200)
    
  }
}

function bananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 300, 40, 10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.11;
    banana.velocityX = -5;
    banana.lifetime = 100;

    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 200 === 0) {
    obstacle = createSprite(400, 317, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    obstacle.scale = 0.13;

    obstacleGroup.add(obstacle);
  }
}