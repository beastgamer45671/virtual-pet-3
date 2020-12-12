const Bodies = Bodies;
const World = World;
const Engine = Engine;

var dogi, dog;
var happyDog, happyDogi;
var database;
var foodS, foodStock, foodStocki;

var addFood, feed;
var fedTime, lastFed;

var foodObj;

var gameState = Hungry;
var gameState = Dead;
var gameState = Sleeping;
var gameState = Bathing;
var gameState = Playing;

var readGameState;

var bedroom, bedroomi;
var garden, gardeni;
var washroom, washroomi;
var dead, deadi;


function preload()
{
  bedroomi = loadImage("Bed Room.png");
  bedroom = addImage(bedroomi);

  gardeni = loadImage("Garden.png");
  garden = addImage(gardeni);

  washroomi = loadImage("Wah Room.png");
  washroom = addImage(washroomi);

  dogi = loadImage("dogImg.png");
 
  happyDogi = loadImage("dogImg1.png");
  happyDog = addImage(happyDogi);

  deadi = loadImage("deadDog.png");
  dead = addImage(deadi);

  foodStocki = loadImage("Food Image.png");
  foodStock = addImage(foodStocki);
  
}

function setup() {
  createCanvas(500, 500);
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  readState = database.ref("gameState");
  readState.on("value",function(data){
    gameState = data.val();
  });

  dog = Bodies.rectangle(250,250,10,10);
  World.add(world,dog);
  dog = addImage(dogi);

  

  foodObj = new Food;

  feed = createButton("Feed the dog");
  World.add(world,feed);
  feed.positio(250,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  World.add(world,addFood);
  addFood.position(350,95);
  addFood.mousePressed(addFoods);

}


function draw() {
  background(46,139,87);

fedTime=database.ref("FeedTime");
fedTime.on("value",function(data){
  lastFed=data.val();
});

if(gameState != "hungry"){
  feed.hide();
  addFood.hide();
}
else{
  feed.show();
  addFood.show();
  dog.remove();
}


  fill(225,225,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: " + lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30);
  }else{
    text("Last Feed: " + lastFed + "AM",350,30);
  }

currentTime = hour();
if(currentTime == (lastFed + 1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime == (lastFed + 2)){
  update("Sleeping");
  foodObj.bedroom();
}else if(currentTime>(lastFed + 2) && currentTime<=(lastFed + 4)){
  update("Bathing");
  foodObj.washroom();
}else if(currentTime == (lastFed + 5)){
  update("Hungry");
  foodObj.display();
}else{
  update("Dead");
  foodObj.display();
  dog = addImage(dead);
}



  dog.display();

  happyDog.display();

  foodStock.display();

  foodObj.display();

  foodS.display();

  addFood.display();

  feed.display();

  fedTime.display();
  
  lastFed.display();

  textSize(20);
  fill("white");
  text("Food Stock:" + x);
  //add styles here

}


function readStock(data){
  foodS=data.val();
} 

function writeStock(x){
if(x<=0){
  x = 0;
}
else{
   x=x-1;
}
database.red("/").update({
  Food:x
});
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
 }

 function update(state){
   database.ref("/").update({
     gameState:state
   });
 }

