var name1,nameImg ;
var backgroundImg;
var playImage,settingImage,playButton,setButton;
var ground,groundImage;
var ninja,ninjaImage;
var obstacle,obstacleImage;
var score=0;
var gameState=1;
var PLAY=1;
var END=0;
var obstacleGroup;



function preload() {
nameImg=loadImage("main.png");
backgroundImg=loadImage("g.png");
settingImage=loadImage("set.png");
playImage=loadImage("play.png");
ninjaImage=loadImage("ninstand.png");
obstacleImage=loadImage("cactus.png");
}

function setup() {
  createCanvas(1000,800)
    name1 =createSprite(450,200,50,50);
    name1.addImage(nameImg);
    name1.scale= 2;

    playButton=createSprite(400,500,50,50);
    playButton.addImage(playImage);

    setButton=createSprite(400,700,50,50);
    setButton.addImage(settingImage);

   obstacleGroup=new Group();


    ground = createSprite(100,780,400,20);
    ground.visible=false;

    ninja = createSprite(50,780,20,50);
    ninja.addImage(ninjaImage);
    ninja.visible=false;
    score=0;
    score.visible=false;
}

function draw () {
background("yellow");
if(mousePressedOver(playButton)) {
    play();
}

drawSprites();
text("SCORE"+score,900,700)
}

function play(){
  ground.visible=true;
    ninja.visible=true;
    playButton.visible=false;
    name1.visible=false;
    setButton.visible=false;
    score.visible=true;
  if (gameState===PLAY){
    
  
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(4 + 3*score/100);
    
     keyPressed();

     ninja.velocityY = ninja.velocityY + 0.8;
       
  
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    spawnObstacles();
  
    if(obstacleGroup.isTouching(ninja)){
        gameState = END;
    }
  }else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    
    ground.velocityX = 0;
    ninja.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
  
    obstacleGroup.setLifetimeEach(-1);
  }

  ninja.collide(ground);
  
}


  function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,165,10,40);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX = -(6 + 3*score/100);
       obstacleGroup.add(obstacle);
    }
  }
  function keyPressed(){

    if(keyCode===32) {
      ninja.velocityY = -12;
    }
   

  }




