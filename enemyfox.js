
 class Fox {
    constructor(image, gameWidth, gameHeight, maxFrame, speed){
        this.image = image;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 153;
        this.height = 139;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = maxFrame;
        this.x = this.gameWidth + this.width * 3;
        this.y = this.gameHeight - this.height / 2 - 25;
        this.radius = 25;
        this.speed = speed;
        this.fps = 30;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
        this.markedForDeletion = false;
        this.collision = false;
    }
    draw(context){
       /*  context.strokeStyle = 'white';
        context.lineWidth = 5;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.stroke(); */

        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x - 60, this.y - 180, this.width * 1.3, this.height* 1.58);
    }
    update(deltaTime){
        if(this.frameTimer > this.frameInterval){           
            if(this.frame >= this.maxFrame){
                this.frameY = 0;
                this.frameX = 0;
                this.frame = 0;
            }
            else if (this.frame % 5 == 0){
                this.frameY++;
                this.frameX = 0;
            } 
                   this.frame++;
            this.frameX++;
            this.frameTimer = 0;
                        
        } else {
            this.frameTimer += deltaTime;
        }
        this.x -= this.speed + Math.random() * 5;
        if(this.x <= 0 - this.width * 2) this.markedForDeletion = true;
    }
}

let foxTimer = 0;
let foxInterval = 30000 + Math.random() * 20000;
/////orange walk////////////
const orangeFoxWalkImage = document.getElementById('orangeFox_walk');
export let orangefoxesWalk = [];
export function orangeFoxWalkHandler(context, deltaTime,width, height){  
    const orangeFoxWalk = new Fox(orangeFoxWalkImage, width, height, 20, 0.21);
    if(foxTimer > foxInterval + Math.random() * 20000){
        orangefoxesWalk.push(orangeFoxWalk);
        foxTimer = 0;
    }
       orangefoxesWalk = orangefoxesWalk.filter(fox => !fox.markedForDeletion);
        foxTimer += deltaTime;
        orangefoxesWalk.forEach(fox => {
        fox.draw(context);
        fox.update(deltaTime);
    })
} 

/////orange run////////////
const orangeFoxRunImage = document.getElementById('orangeFox_run');
export let orangefoxesRun = [];
export function orangeFoxRunHandler(context, deltaTime,width, height){
    const orangeFoxRun = new Fox(orangeFoxRunImage, width, height, 10, 3);
    if(foxTimer > foxInterval + Math.random() * 20000){
        orangefoxesRun.push(orangeFoxRun);
        foxTimer = 0;
    }
    orangefoxesRun = orangefoxesRun.filter(fox => !fox.markedForDeletion);
    foxTimer += deltaTime;
        orangefoxesRun.forEach(fox => {
        fox.draw(context);
        fox.update(deltaTime);
    })
}

////////////orange jump//////
const orangeFoxJumpImage = document.getElementById('orangeFox_jump');
export let orangefoxesJump = [];
export function orangeFoxJumpHandler(context, deltaTime,width, height){
    const orangeFoxJump = new Fox(orangeFoxJumpImage, width, height, 23, 1);
    if(foxTimer > foxInterval + Math.random() * 20000){
        orangefoxesJump.push(orangeFoxJump);
        foxTimer = 0;
    }
    orangefoxesJump = orangefoxesJump.filter(fox => !fox.markedForDeletion);
    foxTimer += deltaTime;
        orangefoxesJump.forEach(fox => {
        fox.draw(context);
        fox.update(deltaTime);
    })
}


//////silver fox//////
const silverFoxWalkImage = document.getElementById('silverFox_walk');
export let silverfoxesWalk = [];
 export function silverFoxWalkHandler(context, deltaTime,width, height){
    const silverFoxWalk = new Fox(silverFoxWalkImage, width, height, 20, 0.25);
    if(foxTimer > foxInterval + Math.random() * 15000){
        silverfoxesWalk.push(silverFoxWalk);
        foxTimer = 0;
    }
    silverfoxesWalk = silverfoxesWalk.filter(fox => !fox.markedForDeletion);
    foxTimer += deltaTime;
    silverfoxesWalk.forEach(fox => {
        fox.draw(context);
        fox.update(deltaTime);
    })
} 

////silver fox runsilver//////
const silverFoxRunImage = document.getElementById('silverFox_run');
export let silverfoxesRun = [];
export function silverFoxRunHandler(context, deltaTime,width, height){
    const silverFoxRun = new Fox(silverFoxRunImage, width, height, 10, 4);
    if(foxTimer > foxInterval + Math.random() * 25000){
        silverfoxesRun.push(silverFoxRun);
        foxTimer = 0;
    }
    silverfoxesRun = silverfoxesRun.filter(fox => !fox.markedForDeletion);
    foxTimer += deltaTime;
        silverfoxesRun.forEach(fox => {
        fox.draw(context);
        fox.update(deltaTime);
    })
}


////////////siver fox jump//////
const silverFoxJumpImage = document.getElementById('silverFox_jump');
export let silverfoxesJump = [];
export function silverFoxJumpHandler(context, deltaTime,width, height){
    const silverFoxJump = new Fox(silverFoxJumpImage, width, height, 23, 1);
    silverfoxesJump = silverfoxesJump.filter(fox => !fox.markedForDeletion);
    if(foxTimer > foxInterval + Math.random() * 35000){
        silverfoxesJump.push(silverFoxJump);
        foxTimer = 0;
    }
    foxTimer += deltaTime;
        silverfoxesJump.forEach(fox => {
        fox.draw(context);
        fox.update(deltaTime);
    })
}

////for home
/* 
//orange taunt
const orangeFoxTauntImage = document.getElementById('orangeFox_taunt');
let orangefoxesTaunt = [];
export function orangeFoxTauntHandler(context, deltaTime,width, height){
    const orangeFoxTaunt = new Fox(orangeFoxTauntImage, width, height, 10, 0.1);
    if(foxTimer > foxInterval + Math.random()){
        orangefoxesTaunt.push(orangeFoxTaunt);
        silverfoxesTaunt = orangefoxesTaunt.filter(fox => !fox.markedForDeletion);
        foxTimer = 0;
    }
    foxTimer += deltaTime;
        orangefoxesTaunt.forEach(fox => {
        fox.draw(context);
        fox.update(deltaTime);
    })
}

//orange pause
const orangeFoxPauseImage = document.getElementById('orangeFox_pause');
let orangefoxesPause = [];
export function orangeFoxPauseHandler(context, deltaTime,width, height){
    const orangeFoxPause = new Fox(orangeFoxPauseImage, width, height, 42, 0.15);
    if(foxTimer > Math.random() * 10000){
        orangefoxesPause.push(orangeFoxPause);
        orangefoxesPause = orangefoxesPause.filter(fox => !fox.markedForDeletion);
        foxTimer = 0;
    }
    foxTimer += deltaTime;
        orangefoxesPause.forEach(fox => {
        fox.draw(context);
        fox.update(deltaTime);
    })
}
 */