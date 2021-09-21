const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var tower,ground,cannon,cannonBall;
var engine, world;
var balls=[];

function preload(){
    bgd = loadImage("/assets/background.gif")
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;

    angle = -PI/4

    tower = new Tower(150, 350, 160, 310);
    ground = new Ground(600,580,1200,20)
    cannon = new Cannon(180, 110, 100, 50, angle);
   
}

function draw(){
    background(220);
    image(bgd,600,300,1200,600);
    
    Engine.update(engine);
   
    tower.display();
    cannon.display();

    for(var i=0; i< balls.length; i++){
        showCannonBalls(balls[i],i);
    }
}

function keyReleased(){
    if(keyCode === DOWN_ARROW){
        balls[balls.length-1].shoot();
    }
   
}

function keyPressed(){
    if(keyCode === DOWN_ARROW){
        cannonBall = new CannonBall(cannon.x,cannon.y);
        balls.push(cannonBall);
    }
}

function showCannonBalls(ball,index){
    ball.display();
    if(ball.body.position.x >= width || ball.body.position.y>= height-150){
        World.remove(world,ball.body);
        balls.splice(index,1);
    }
}
