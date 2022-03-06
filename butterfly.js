const butterfly = new Image();
butterfly.src = './asset/butterfly_angle2.png'; //700 /10 x 130 / 2

export default class Butterfly{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 70;
        this.height = 75;
        this.image = butterfly;        
        this.x = gameWidth - this.width;
        this.y = Math.random() * gameHeight - 200;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 9;
        this.frameTimer = 0;
        this.frameInterval = 2;
        this.speedX = Math.random() * 5;
        this.speedY = Math.random() * 4 - 2;
        this.angle = 0;
        this.markedForDeletion = false;
    }
    draw(context){
        /* context.strokeStyle = 'white';
        context.beginPath();
        context.arc(this.x, this.y, 12, 0, Math.PI * 2); */
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x -30, this.y -38, this.width, this.height);
    }    
    update(deltaTime){
        if(this.frameTimer > this.frameInterval){
            if(this.frameX >= this.maxFrame) this.frameX = 0;                
                else  this.frameTimer = 0;
                this.frameX++;
            } 
         this.frameTimer += deltaTime;        
        this.x -= this.speedX + 0.2;
        this.y -= this.speedY;
        if( this.x > this.gameWidth - this.width / 2) {
            this.speedX = this.speedX * -1;
        }
        if(this.y + this.height < 0 || this.y > this.gameHeight -this.height){
            this.speedY = this.speedY * -1;
        }
        if(this.X < - this.width) this.markedForDeletion = true;        
    }
}

