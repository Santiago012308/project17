
var PLAY=1;
var END= 0 ;
var gamestate=1;
var fruit1,fruit2,fruit3,frut4;

var sword,swordImage;

var monsterImage,gameOverImage;

var score;

var knifeSwooshSound,gameOverSound;

function preload(){
   swordImage = loadImage("sword.png");
 
   fruit1=loadImage("fruit1.png");
   fruit2=loadImage("fruit2.png");
   fruit3=loadImage("fruit3.png");
   fruit4=loadImage("fruit4.png");
  
   monsterImage=loadImage("alien1.png");
   gameOverImage=loadImage("gameover.png");
  
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  gameOverSound=loadSound("gameover.mp3");
}

function setup(){
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage); 
  sword.scale=0.7;
  
 
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;
  
}

function draw(){
  background("white");
  
  text("Score: "+ score, 200,20);
  
  sword.y=World.mouseY;
  sword.x=World.mouseX;
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    knifeSwooshSound.play();
    score=score+2
    
  }
  
  if(enemyGroup.isTouching(sword)){
    sword.addImage(gameOverImage);
    sword.x=200;
    sword.y=200;
    gamestate=END;
    gameOverSound.play();
  }
  
  drawSprites();
  fruits();
  enemy();
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    }else if (r==2){
      fruit.addImage(fruit2);
    }else if(r==3){
      fruit.addImage(fruit3);
    }else if (r==4){
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
    
    if(fruit.x==1)
    {
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
      }
      else
      {
        if(fruit.x==2){
          fruit.x=0;
          fruit.velocityX=-(7+(score/4));
        }
      }
  }
}

function enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random (100,300));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  }
}
  
