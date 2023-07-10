const gameBox = document.getElementById('box')
const context = gameBox.getContext('2d')
const scoreval = document.getElementById('scoreVal')

const width = gameBox.width;
const height = gameBox.height;
const unit = 25;

let foodX;
let foodY;
let xVel=25;
let yVel=0;
let score =0;
let snake = [
    {X:unit*3,Y:0},
    {X:unit*2,Y:0},
    {X:unit,Y:0},
    {X:0,Y:0},
]

let active = true;
let gameStart = false;


window.addEventListener('keydown',keyPress)

startGame();

function startGame(){
    context.fillRect(0,0,width,height)//fillRect(x axis value,y axis value,width,height)
    context.fillStyle = 'white';
    createFood();
    displayFood();
    snakeBody();
   
}
function createFood(){
    foodX = Math.floor(Math.random()*width/unit)*unit;
    foodY = Math.floor(Math.random()*height/unit)*unit;
}
function displayFood(){
    context.fillStyle = 'yellow';
    context.fillRect(foodX,foodY,unit,unit)
}
function snakeBody(){
    context.strokeStyle = 'black';
    context.fillStyle = 'aqua';
    snake.forEach((s)=>{
        context.fillRect(s.X,s.Y,unit,unit)
        context.strokeRect(s.X,s.Y,unit,unit)
    })
}
function clearBoard(){
    context.fillStyle = 'black';
    context.fillRect(0,0,width,height);
}
function snakeMove(){
    const head = {X:snake[0].X+xVel,Y:snake[0].Y+yVel};
    snake.unshift(head);
    if(snake[0].X==foodX && snake[0].Y==foodY){
        createFood();
        score += 1;
        scoreval.textContent = score;

    } 
    else
        snake.pop();
}
function nextMove(){
    if(active){
        setTimeout(()=>{
            clearBoard();
            displayFood();
            snakeMove();
            snakeBody();
            gameOver();
            nextMove();
       },200)
    }
    else{
        clearBoard();
        context.font = 'bold 45px serif';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('You Are Lost !!',width/2,height/2)
    }
   
}
function keyPress(event){
    if(!gameStart){
        gameStart = true;
        nextMove();
    }
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;

    switch(true){
        case (event.keyCode == left && xVel != unit):
            xVel = -unit;
            yVel = 0;
            break;
        case (event.keyCode == right  && xVel != -unit):
            xVel = unit;
            yVel = 0;
            break;
        case (event.keyCode == up  && yVel != unit):
            xVel = 0;
            yVel = -unit;
            break;
        case (event.keyCode == down  && yVel != -unit):
            xVel = 0;
            yVel = unit;
            break;

    }
}

function gameOver(){
    switch(true){
        case (snake[0].X<0):
        case (snake[0].X>=width):
        case (snake[0].Y<0):
        case (snake[0].Y>=height):
            active = false;
            break;
    }
}
  