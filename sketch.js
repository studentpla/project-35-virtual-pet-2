//Create variables here
var database, Sdog, happydog, food, foodstock;
function preload()
{
	//load images here
  Sdog = loadImage("dogImg.png");
  happydog = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,50,50);
  dog.scale = 0.2;
  dog.addImage(Sdog);
  foodstock = database.ref('food');
  foodstock.on("value",readstock);
  feed = createButton("feed the dog ");
  feed.position(700,95);
  feed.mousePressed(feeddog);
  foodObj = new Food();

  addfood = createButton("add the food");
  addfood.position(400,95);
  addfood.mousePressed(addfoods)
}


function draw() { 
background(46,139,87);
if(keyWentDown(UP_ARROW)){
  writestock(food);
  dog.addImage(happydog);
  
}
foodObj.display();
  drawSprites();
  //add styles here

}
function readstock(data){
  food = data.val();
  foodObj.updateFoodStock(food);
}
function writestock(x){
  if(x<=0){
    x = 0
  }else{
    x = x-1;
  }
  database.ref('/').update({
    food:x
  })
}
function addfoods(){
  food++
  database.ref('/').update({
    food:food
  })
}
function feeddog(){
   dog.addImage(happyDog);
    if(foodObj.getFoodStock()<= 0){
       foodObj.updateFoodStock(foodObj.getFoodStock()*0);
       }else
       { 
         foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
      }
      database.ref('/').update({
        food:foodObj.getFoodStock()
      })
    }


