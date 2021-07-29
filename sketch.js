var dog,happyDog,database,foodStock,milk;
var milkCount=20;

function preload()
{
  bg=loadImage("dog house.png");
	dogImage=loadImage("dogImg.png");
  happyDogImage=loadImage("dogImg1.png");
  milkImage=loadImage("milk.png");
  emptyBowl=loadImage("empty milk bowl.png");
}

function setup() {
  database=firebase.database();

	createCanvas(800,800);
  
  dog=createSprite(width/2,height-220,50,100);
  dog.addImage(dogImage);
  dog.scale=0.5;

  milk=createSprite(dog.x-200,height-100,15,30);
  milk.addImage(milkImage);
  milk.scale=0.4;

  foodStock=database.ref("Food");
  foodStock.on("value",readData,showError);
}


function draw() {  
  background(bg);

  textSize(20);
  fill("black");
  text("Number of milk containing bowls left: "+milkCount,width-360,50);
  drawSprites();
  //add styles here
  if(milkCount>=0){
    database.ref('/').update({
      Food:milkCount
    })
  }
  else{
    milkCount=0;
    milk.addImage(emptyBowl);
    milk.scale=0.7;
  }

  if(keyWentDown(UP_ARROW)){
    feedMilk();
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImage);
  }
}

function feedMilk(){
  
  milkCount=milkCount-1;
  dog.addImage(happyDogImage);
}

function readData(data){
  milkCount=data.val();
}

function showError(){
  console.log("The program could not connect with the database");
}