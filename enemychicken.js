export class Chicken {
    constructor(image, gameWidth, gameHeight, maxFrame, y, speed){
        this.image = image;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 148;
       this.height = 110;      
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = maxFrame;
        this.x = this.gameWidth + this.width * 3;
        this.y = y - 15;
        this.speed = speed;
        this.radius = 10;
        this.speed = speed + Math.random() * 2;          
            this.fps = 30;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.markedForDeletion = false;
            this.collision = false;
    } 
    draw(context){
        /* context.strokeStyle = 'red';
        context.lineWidth = 15;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        context.stroke(); */
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x - 45, this.y - 60, this.width, this.height);
    }
    update(deltaTime){
        if(this.frameTimer > this.frameInterval){
            if(this.frame > this.maxFrame){
                this.frame = 0;
                this.frameY = 0;
                this.frameX = 0;
            } else if(this.frame % 4 == 0){
                this.frameX = 0;
                this.frameY++;                
            }  
                this.frame++;
                this.frameX++;
                this.frameTimer = 0;
                 }   else  {                      
                 this.frameTimer += deltaTime;
            } 
        this.x -= this.speed + Math.random() * 2;
        //this.y += this.speedY * Math.random() * 3;
                
        if(this.x < 0 - this.width) this.markedForDeletion = true;
    }
}

/////chicken walk
/* const chickenWalkImage = document.getElementById('chickenWalk');
let walkChickenTimer = 0;
let walkChickenInterval = Math.random() * 20000 + 10000;
export let walkchickens = [];

export function chickenWalkHandler(context,deltaTime, width, height){
    if(walkChickenTimer > walkChickenInterval + Math.random() * 50000){
    walkchickens.push(new Chicken(chickenWalkImage, width, height, 15, height - 120, 0));
    walkchickens = walkchickens.filter(chicken => !chicken.markedForDeletion);
    walkChickenTimer = 0;
    }
    walkChickenTimer += deltaTime;
    walkchickens.forEach(chic => {
        chic.draw(context);
        chic.update(deltaTime);        
    })

} */

/////chicken flying
/* const chickenFlyingImage = document.getElementById('chickenFlying');
let flyingChickenTimer = 0;
let flyingChickenInterval = Math.random() * 20000 + 1000;
let flyingchickens = [];
export function chickenFlyingHandler(context,deltaTime, width, height){
    if(flyingChickenTimer >= flyingChickenInterval + Math.random() * 20000){
    flyingchickens.push(new Chicken(chickenFlyingImage, width, height, 41, 0, 1));
    flyingchickens = flyingchickens.filter(chicken => !chicken.markedForDeletion);
    flyingChickenTimer = 0;
    }
    flyingChickenTimer += deltaTime;
    flyingchickens.forEach(chic => {
        chic.draw(context);
        chic.update(deltaTime);        
    })
} */

/* /////chicken fall left
const chickenFallImage = document.getElementById('chickenFall');
let fallChickenTimer = 0;
let fallChickenInterval = 2000;
let fallChickens = [];
function chickenFallHandler(context, deltaTime, width, height){
    if(fallChickenTimer > fallChickenInterval){
        fallChickens.push(new Chicken(chickenFallImage, width, height, 24, 0, 0));
        fallChickenTimer = 0;
        fallChickens.forEach(chic => {
            chic.draw(context);
            chic.update(deltaTime);
        })                
    } else {
        fallChickenTimer += deltaTime;
        fallChickens = fallChickens.filter(chicken => !chicken.markedForDeletion);
    }
}
 */
