
var monkey , monkey_running, monkeyCollide;
var grnd, invisibleGrnd, groundImg;
var banana ,bananaIge, obstacle, obstacleIge;
var FoodGroup, obstacleGroup;
var scr = 0;
var bananaScr = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkeyCollide = loadAnimation("monkey_1.png");
  
  
  groundImg = loadAnimation("ground.jpg") 
  
  bananaIge = loadImage("banana.png");
  obstacleIge = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(600,300);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
    
  grnd = createSprite(300,340,600,10);
  grnd.scale = 1;
  
  grnd.addAnimation("ground", groundImg);
  
  invisiGrnd = createSprite(300,278,600,7);
  invisiGrnd.visible = false;
  obstacleGroup.debug = true
  
}

function draw(){
  background("skyblue");
  fill("black");
  text("SURVIVAL TIME: "+scr, 470, 20);
  text("BANANAS COLLECTED: "+bananaScr,300,20);
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    scr = scr + Math.round(getFrameRate()/60);
    
    grnd.velocityX = -(4+scr*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (grnd.x < 0){
      grnd.x = grnd.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScr++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    grnd.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAME OVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      scr = 0;
      bananaScr = 0;
      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
  
  monkey.collide(invisiGrnd);
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaIge);
    banana.scale = 0.1;
    banana.velocityX =-(4+scr*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleIge);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+scr*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}
