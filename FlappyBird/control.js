var cvs = document.getElementById("window");
var ctx = cvs.getContext("2d");

// images data

var bird = new Image();
var bg = new Image();
var gd = new Image();
var pipeU = new Image();
var pipeD = new Image();

bird.src = "images/bird.png";
bg.src = "images/back.png";
gd.src = "images/ground.png";
pipeU.src = "images/pipeU.png";
pipeD.src = "images/pipeD.png";


// variables setting

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}

// pipe position

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw 

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeU.height+gap;
        ctx.drawImage(pipeU,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeD,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeU.height)-pipeU.height
            }); 
        }

        
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeU.width && (bY <= pipe[i].y + pipeU.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - gd.height){
            location.reload(); // reload the page
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(gd,0,cvs.height - gd.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();
























