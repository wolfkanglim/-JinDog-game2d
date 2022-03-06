export default class Fish{
    constructor(image, gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = image;  //1992 x 981 4x3 498x 327
        this.width = 498;
        this.height = 327;
        this.x = gameWidth;
        this.y = gameHeight - this.height / 3 + 20;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = Math.random() * 1 + 0.01;
        this.maxFrame = 3;
        this.fps = 5;
        this.frameTimer = 0
        this.frameInterval = 1000 / this.fps;
        this.markedForDeletion = false;
    }
   
    draw(context){
        //context.strokeStyle = 'white';
        // context.beginPath();
        // context.arc(this.x, this.y, 38, 0, Math.PI * 2);
       // context.stroke();
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x - 50, this.y - 42, this.width / 5, this.height / 5);
    }
    update(deltaTime){       
        if(this.frameTimer > this.frameInterval){
            if(this.frameX >= this.maxFrame) this.frameX = 0;
            else  this.frameX++;
            this.frameTimer = 0;           
        }
        this.x -= this.speed + Math.random() * 9;
        this.frameTimer += deltaTime;
        if(this.x < 0 - this.width) {
            this.markedForDeletion = true;
        }
    }
}