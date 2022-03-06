//const foxImage = document.getElementById('fox_jump');
export 
default class Fox{
    constructor(image, gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = image;
        //918/6  695/ 5
        this.width = 153;
        this.height = 139;
        this.x = this.gameWidth;
        this.y = this.gameHeight - this.height/2 - 30;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.speed = 2;
        this.maxFrame = 22;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.markedForDeletion = false;
    }
   
    draw(context){
        // context.strokeStyle = 'white';
        // context.beginPath();
        // context.arc(this.x, this.y, 60, 0, Math.PI * 2);
        // context.stroke();
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x - 120, this.y - 100, this.width * 1.5, this.height * 1.5);
    }
    update(deltaTime){
        if(this.frameTimer >= this.frameInterval){
           
            if(this.frame >= this.maxFrame){
                //this.frameTimer = 0;
                this.frameX = 0;
                this.frameY = 0;
                this.frame = 0;
            }
            else if (this.frame % 5 === 0){
                this.frameX = 0;
                this.frameY++;
            } 
                this.frame++;
            this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        this.x -= this.speed;
        if(this.x < 0 - this.width * 2) this.markedForDeletion = true;
    }
    }
