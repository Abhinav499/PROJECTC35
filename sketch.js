//Create variables here
var dog, happyDog, database, foodS, foodStock;
var Dog, happydog;
var button1,button2,fedTime,lastFed;
var foodObj;

function preload()
{
  //load images here
  Dog=loadImage("dogImg.png");
  happydog=loadImage("dogImg1.png");

}

function setup() {
  createCanvas(1000,500);
  dog=createSprite(800,200,10,10);
  dog.addImage(Dog);
  dog.scale=0.15;
  foodObj= new Food();
  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

database=firebase.database();
foodStock=database.ref('Food');
foodStock.on("value",readStock,showerr);
}


function draw() {  
background(46,139,87);
foodObj.display();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
})
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("LastFeed : "+lastFed%12 +"PM",350,30);
}else if(lastFed==0){
  text("LastFeed : 12 AM",350,30);
}else{
  text("LastFeed : "+lastFed +"AM",350,30);
}


drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
function showerr(){
  console.log("error");
}
function addFoods(){
 foodS++;
 database.ref('/').update({
   Food:foodS
 })
}
function feedDog(){
  dog.addImage(happydog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
