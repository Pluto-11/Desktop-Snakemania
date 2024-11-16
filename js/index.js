let inputDir={x:0, y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let audiocount=0;
let speed = 5;
let lastPaintTime= 0;
let snakeArr=[{x:13 , y:15}];
food= {x:3, y:5}
let score=0;
let maxgrid=25;

let isPaused=0;

//Game Function
function main(ctime){
    if(!isPaused){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000  < (1/speed)){
        return;
    }
    lastPaintTime= ctime;
    gameEngine();
}
}


function isCollide(snake){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true
        }
    }

    // If you bump into the wall game over
    if((snake[0].x>= maxgrid || snake[0].x<=0) || (snake[0].y>= maxgrid || snake[0].y<=0)){
        return true;
    }
    
    
    // If you bump into the wall come back from other side
    // if(snake[0].x >= maxgrid || snake[0].x <=0 || snake[0].y >= maxgrid || snake[0].y <=0){
    //     if(snake[0].x >= maxgrid){
    //         snake[0].x=0;
    //     }
    //     else if(snake[0].x <=0){
    //         snake[0].x=maxgrid;
    //     }
    //     else if(snake[0].y >= maxgrid){
    //         snake[0].y=0;
    //     }
    //     else{
    //         snake[0].y=maxgrid;
    //     }
    //     return false;
    // }
    return false;
}


//high score
let highscore=localStorage.getItem("highscore");
if(highscore===null){
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}
else{
    highscoreval=JSON.parse(highscore);
    highscoreBox.innerHTML="High Score:  "+ highscoreval;
}

function gameEngine(){
    //Updating snake variables
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0, y:0};
        alert("Game Over. Press Any Key to play again!");
        snakeArr=[{x:13 , y:15}];
        musicSound.play();
        score=0;
        scoreBox.innerHTML="Score:  "+ score;
    }
    
    //eating food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score+=1;
        scoreBox.innerHTML="Score:  "+ score;
        if(score>highscore){
            highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            highscoreBox.innerHTML="High Score:  "+ highscoreval;
        }
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y+ inputDir.y});
        let a=2; let b=maxgrid-2;
        food = { x: Math.round(a+ (b-a)* Math.random()), y: Math.round(a+ (b-a)* Math.random())}
    }

    //moving snake
    for(let i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;

    //Display snake 

    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        if(index === 0){
            snakeElement.classList.add('head');
        }
        board.appendChild(snakeElement);
    })

    //display food
    snakeArr.forEach((e,index)=>{
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    })


}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir ={x:0, y:1}
    musicSound.play();
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;    

    }
})

function playaudio() { 
    musicSound.muted = true;
    moveSound.muted=true;
    gameOverSound.muted=true;
    foodSound.muted=true;
  } 
  
function pauseaudio() { 
    musicSound.muted = false;
    moveSound.muted=false;
    gameOverSound.muted=false;
    foodSound.muted=false;
}
    
function audio(){
    var volumeIcon = document.getElementById("musicbtn");
    
    if (audiocount==0){
        audiocount=1;
        playaudio();
        volumeIcon.classList.remove("fa-volume-xmark");
        volumeIcon.classList.add("fa-volume-high");
    }
    else{
        audiocount=0;
        pauseaudio();
        volumeIcon.classList.remove("fa-volume-high");
        volumeIcon.classList.add("fa-volume-xmark");
    }
}




// Function to toggle the pause state
function gamePause() {
    var gameIcon = document.getElementById("gamebtn");
    if (isPaused==0){
        isPaused=1;
        // If game is paused, pause the audio and stop the game loop
        musicSound.pause();
        window.cancelAnimationFrame(main);
        gameIcon.classList.remove("fa-pause");
        gameIcon.classList.add("fa-play");
    } else {
        isPaused=0;
        window.requestAnimationFrame(main);
        gameIcon.classList.remove("fa-play");
        gameIcon.classList.add("fa-pause");
    }
}

