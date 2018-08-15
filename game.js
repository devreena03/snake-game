var snake;
var food;
var scl=10;
var level=1;
var previousMove;
var startSound;
var runningSound;
var deathSound;
var eatSound;

function preload(){
    eatSound = loadSound("music/ringtone.mp4");  
    deathSound = loadSound("music/snake_death_shout.mp3");
    runningSound = loadSound("music/snake_running_music.mp3");  
}

function setup(){
    createCanvas(600, 600);
    frameRate(scl*level);
    snake = new Snake(); 
    createFood();
}

function createFood(){
    food = createVector(floor(random(width/scl))*scl, floor(random(height/scl))*scl);
 }

function draw(){
    if(!runningSound.isPlaying()){
        runningSound.jump();
        runningSound.play();
    }
    background(51);
    snake.update();
    snake.show(); 
    if(snake.eat(food)){
        createFood();
    }
    generateFood();
   
}

function generateFood(){ 
    fill(255,0,0);
    rect(food.x, food.y, scl,scl);
}

function keyPressed(){
    if(keyCode === UP_ARROW && previousMove!== DOWN_ARROW){
        snake.dir(0, -1);
        previousMove = keyCode;
    }else if(keyCode === DOWN_ARROW && previousMove!== UP_ARROW){
        snake.dir(0, 1);
        previousMove = keyCode;
    }else if(keyCode === LEFT_ARROW && previousMove!== RIGHT_ARROW){
        snake.dir(-1, 0);
        previousMove = keyCode;
    } else if(keyCode === RIGHT_ARROW && previousMove!== LEFT_ARROW){
        snake.dir(1, 0);
        previousMove = keyCode;
    }
    if(snake.eat(food)){
        createFood();
    }  
}


