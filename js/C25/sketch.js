const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ground, tower,cannon,ground,cannonBall;
var backgroundImg;
var balls = [];

function preload(){
    backgroundImg = loadImage("./assets/background.gif")
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();

    world = engine.world;
        
    tower = new Tower(150, 350, 160, 310);
    cannon = new Cannon(155, 130, 220, 150, -PI/4);
    ground = new Ground(600,height - 20,1800,20);

    cannonBall = new CannonBall(cannon.x,cannon.y);
}

function draw(){
    background(189);
    Engine.update(engine);

    image(backgroundImg,0,0,width,height);

    for(var i = 0; i<balls.length; i++){
        showCannonBalls(balls[i],i);
    }

    tower.display();
    cannon.display();
    cannonBall.display();
}

function keyPressed(){
    if(keyCode === DOWN_ARROW){
        cannonBall = new CannonBall(cannon.x,cannon.y);
        balls.push(cannonBall);
    }
}


function keyReleased(){
    if(keyCode === DOWN_ARROW){ 
        balls[balls.length-1].shoot();
    }
}


function showCannonBalls(ball, index){
    ball.display();
    if(ball.body.position.x >= width-50 || ball.body.position.y >= height-100){
        World.remove(world,ball.body);
        balls.splice(index,1);
    }
}