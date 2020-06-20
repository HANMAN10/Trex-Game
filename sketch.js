// Main variables declared 
var trex, invisibleGround, ground, cactus1, cactus2, cactus3, cactus4, cactus5, cactus6, clouds, restart, gameOver, gameState, score, play, end;

// Animation variables declared
var trexPlay, trexCollided, groundAnimation, cactusAnimation, cloudsAnimation, restartAnimation, gameOverAnimation;

// Groups
var obstacleGroup, cloudsGroup;

function preload() {
  trexPlay = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexCollided = loadImage("trex_collided.png");
  groundAnimation = loadImage("ground2.png");
  cloudsAnimation = loadImage("cloud.png");
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  restartAnimation = loadImage("restart.png");
  gameOverAnimation = loadImage("gameOver.png");
}

// Gives values to sprites and sets up the canvas
function setup() {
  createCanvas(600, 200);
  
  // Game State
  play = 1;
  end = 0;
  gameState = play;
  
  // Score
  score = 0;
  
  // trex
  trex = createSprite(30, 190, 25, 25);
  trex.addAnimation("runningTrex", trexPlay); 
  trex.addAnimation("collided", trexCollided);
  trex.scale = 0.5;
  
  // ground
  ground = createSprite(400, 185, 25, 25);
  ground.addImage("ground", groundAnimation);
  
  // invisible ground
  invisibleGround = createSprite(0, 198, 100, 20);
  invisibleGround.visible = false;
  
  // restart
  restart = createSprite(300, 140);
  restart.addImage(restartAnimation);
  restart.visible = false;
  restart.scale = 0.5;
  
  // gameOver
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverAnimation);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  // group
  cloudsGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() {
  // BG color
  background("white");
  
  if(gameState === play) {
       
    // display score 
    score = score + Math.round(getFrameRate()/60);
    
    // velocity of ground
      ground.velocityX = -(8 + 3 * score / 100);
    
    // trex collision
    trex.collide(invisibleGround);
    
    // Ground reset
    if(ground.x < 0) {
      ground.x = ground.width/2;
    }
    
    // Space key control for trex
    if(keyDown("space") && trex.y >= 164.75) {
      trex.velocityY = -10;
    }
    
    // Trex gravity
    trex.velocityY += 0.8; 
    
    // Spawns clouds and cactus
    spawnClouds();
    spawnCactus();
    
    if(obstacleGroup.isTouching(trex)) {
      gameState = end;
    }
  }
  else if(gameState === end) {
    
    trex.changeAnimation("collided", trexCollided);
    ground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    restart.visible = true;
    gameOver.visible = true;
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  drawSprites();
  
  // Text to display score
  text("Score: " + score, 525, 25);
}

// Function to draw the clouds
function spawnClouds() {
  
  // Modulus to draw clouds. (Modulus = remainder in division)
  if(frameCount % 50 === 0) {
    
    clouds = createSprite(600, 100, 50, 50);
    clouds.addImage("cloud", cloudsAnimation);
    clouds.scale = 0.5;
    clouds.velocityX = -5; 
    clouds.y = Math.round(random(50, 150));
    clouds.depth = trex.depth;
    
    // lifetime of the cloud
    clouds.lifetime = 135;
    
    // trex depth
    trex.depth += 1;
    
    cloudsGroup.add(clouds);
  }
}

// function to spawn cactus
function spawnCactus() {
  
  if(frameCount % 55 === 0) {
    
  var rand = Math.round(random(1,6));
    
  cactus = createSprite(600, 175, 50, 50);
  cactus.velocityX = -(8 + score / 100);
    
  switch(rand) {
    case 1 : cactus.addImage("cactus1", cactus1);
    break;   
    case 2 : cactus.addImage("cactus2", cactus2);
    break; 
    case 3 : cactus.addImage("cactus3", cactus3);
    break; 
    case 4 : cactus.addImage("cactus4", cactus4);
    break; 
    case 5 : cactus.addImage("cactus5", cactus5);
    break; 
    case 6 : cactus.addImage("cactus6", cactus6);
    break;    
  }
   
  cactus.scale = 0.45;  
    
  // lifetime of cactus
  cactus.lifetime = 150;
  
  obstacleGroup.add(cactus);

  }
}

// function to restart the game
function reset() {
  gameState = play;
  restart.visible = false;
  gameOver.visible = false;
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("runningTrex", trexPlay);
  score = 0;
}