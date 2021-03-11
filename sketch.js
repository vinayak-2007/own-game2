var player,plrRunning;
var backGround,BGground1;
var obstacle,obsImg;
var invisibleGround;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var plrstp;


function preload(){
 
  plrRunning=loadAnimation("images/first.png","images/second.png","images/third.png","images/fourth.png","images/fifth.png","images/sixth.png");
   BGground1=loadImage("images/road3.webp");
   obsImg=loadImage("images/robo.png")
   plrstp=loadAnimation("images/stop.png");
}

function setup() {
	createCanvas(600, 600);
   player=createSprite(150,490,20,20);
   player.addAnimation("plr",plrRunning);
   player.scale=0.5;
  
    bGround=createSprite(300,300,600,600);
    bGround.addImage("hi",BGground1);
    
    bGround.x=bGround.width/2;
    bGround.scale=2;

    invisibleGround=createSprite(300,550,800,10);
    invisibleGround.visible=false;

    player.setCollider("rectangle",0,0,player.width,player.height);
    player.debug=true;
    

    obstacleGroup=new Group();
    obstacleGroup.debug=true; 
}
     

function draw() {
  background("red");

  if(gamestate===PLAY){
  
   bGround.velocityX=-2;

    if(bGround.x<=0){
      bGround.x=bGround.width/2;
    }
  //player.visible=true;
  //bGround.visible=false;


  player.depth=bGround.depth;
  player.depth=player.depth+1;

  CHILD();
  
    obstacles();

  console.log(player.depth);

    player.collide(invisibleGround);

    if(player.isTouching(obstacleGroup)){
      gamestate=END
    }    
  
  }
  else if(gamestate===END){
    bGround.velocityX=0;
    player.addAnimation("stopped",plrstp);
    player.changeAnimation("stopped");
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
  }
  drawSprites();
}

function obstacles(){
   if(frameCount%160===0){
    obstacle=createSprite(590,Math.round(random(350,450)),10,10);
    obstacle.addImage("slow",obsImg);
    obstacle.scale=0.2;
    obstacle.velocityX=-2;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
   }
}

function CHILD(){
  if(keyDown("SPACE")){
    player.velocityY=-3;
  }
  player.velocityY=player.velocityY+0.3;
}
