
 export class Fox {
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
