//creating variables
var play = 1;
var end = 0;
var gameState=play;
var microbesGroup,fruitsGroup;
var alien1,alien2,fruit1,fruit2,fruit3,fruit4,sword1,sword;
var gameover,gameoverImage;
var score;
var cutSound,gameoverSound;

function preload(){
  
  //loading images
  sword1=loadImage("sword.png");
  gameoverImage=loadImage("gameover.png");
  alien1=loadImage("alien1.png");
  alien2=loadImage("alien2.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  //loading sounds
  cutSound=loadSound("knifeSwooshSound.mp3");
  gameoverSound=loadSound("gameover.mp3");
  
}

function setup() {
  createCanvas(600,600);
  
  //creating sword
  sword=createSprite(100,300,50,50);
  sword.addImage(sword1);
  sword.scale=0.8;
  
  //creating groups for the sprites
  fruitsGroup=createGroup();
  microbesGroup=createGroup();
  
  //assigning value for score
  score=0;
  
}

function draw(){
  
  //background colour
  background("lightBlue");
  
  if (gameState===play) {
    
    //the sword can be controlled using the mouse
    sword.y=mouseY;
    sword.x=mouseX;
  
    //calling the fruits and the microbes function
    createFruits();
    createMicrobes();
    
    //sword touching the apples
    if (sword.isTouching(fruitsGroup)) {
      //destroying the apple
      fruitsGroup.destroyEach();
      //adding the cutting sound
      cutSound.play();
      //increasing the score
      score=score+5;
    }
    
     //sword touching the microbe
    if (sword.isTouching(microbesGroup)) {
      //destroying the microbe
      microbesGroup.destroyEach();
      fruitsGroup.destroyEach();
      score=0;
      //adding the gameover sound
      gameoverSound.play();
      //changing the gamestate value
      gameState=end;
    }
  }
  
  if (gameState===end) {
    sword.addImage(gameoverImage);
    sword.y=300;
    sword.x=300;
  }
  
  drawSprites ();
  
  fill("darkGreen");
  textSize(20);
  //printing the score
  text("Score:"+score,280,20);
}
  
  //creating fruits
  function createFruits() {
    if (frameCount%40===0) {
      var positionF=Math.round(random(1,2));
      var fruits=createSprite(600,Math.round(random(50,550)));
      if (positionF===1) {
        fruits.x=600;
        fruits.velocityX=-(8+Math.round(score/4));
      }else {
        fruits.x=0;
        fruits.velocityX=(8+Math.round(score/4));
      }
      var rand= Math.round(random(1,4));
      switch(rand) {
        case 1: fruits.addImage(fruit1);
                break;
        case 2: fruits.addImage(fruit2);
                break;
        case 3: fruits.addImage(fruit3);
                break;
        case 4: fruits.addImage(fruit4);
                break;
        default: break;
    }
    //assingning scale and lifetime 
    fruits.scale=0.3;
    fruits.lifetime=75;
    //adding the fruits to its group
    fruitsGroup.add(fruits);
    }
    
  }

  //creating microbes
  function createMicrobes() {
    if (frameCount%30===0) {
      var positionM=Math.round(random(3,4));
      var microbes=createSprite(600,Math.round(random(50,550)));
      if (positionM===3) {
        microbes.x=0;
        microbes.velocityX=(10+Math.round(score/10));
      } else {
        microbes.x=600;
        microbes.velocityX=-(10+Math.round(score/10));
      }
      var rand=Math.round(random(1,2))
      switch(rand) {
        case 1: microbes.addImage(alien1);
                break;
        case 2: microbes.addImage(alien2);
                break;
        default: break;
    }
    //assingning scale and lifetime
    microbes.lifetime=60;
    //adding the microbes to its group
    microbesGroup.add(microbes);
    } 
  }





























