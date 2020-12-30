var helicopterSprite, helicopterIMG,  packageSprite, packageIMG;
var packageBody, ground;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
 helicopterIMG = loadImage("helicopter.png")
 packageIMG = loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10, 10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10, 10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {isStatic:true, restitution:0.6, friction: 1});
	World.add(world, packageBody);

	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

	Engine.run(engine);
}


function draw() 
{
  rectMode(CENTER);
  background(0);
  packageSprite.x = packageBody.position.x; 
  packageSprite.y = packageBody.position.y;
  drawSprites();
}

function keyPressed() 
{
 /* Pressing "DOWN" Arrow will drop the box from the helicopter.
    Pressing "UP" Arrow will create another package body/sprite in the helicopter which can be dropped again
    by pressing the "DOWN" Arrow.	*/
 if (keyCode === DOWN_ARROW) Matter.Body.setStatic(packageBody, false);
 if (keyCode === UP_ARROW)
 {
	 packageBody.position.x = width/2; 
	 packageBody.position.y = 80;
	 packageBody = Bodies.circle(width/2 , 200 , 5 , {isStatic:true, restitution:0.6, friction: 1});
	 World.add(world, packageBody);
	 packageSprite.x = packageBody.position.x; 
	 packageSprite.y = packageBody.position.y;	  
 } 
}