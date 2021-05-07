var dog,dogImg,dogImg1;
var database,foodS,foodStock;

function preload()
{
  dogImg=loadImage("./images/dogImg.png");
  dogImg1=loadImage("./images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  database=firebase.database();

 dog=createSprite(250,300,150,150);
 dog.addImage(dogImg);
 dog.scale=0.13;

 foodStock=database.ref("Food");
 foodStock.on("value",readStock);
}

function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
 writeStock(foodS);
 dog.addImage(dogImg1);
}
  
  //add styles here
  drawSprites();
  fill("white");
  stroke("black");
  text("Food remaining:"+foodS,170,200);
  text("Press Up_Arrow to feed the dog",130,10,300,20);
  
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  })
}



