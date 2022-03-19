export default class Treasure{
    constructor(image, gameWidth, gameHeight){
        this.image = image;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;        
        this.width = 30;
        this.height = 30;
        this.x = this.gameWidth;
        this.y = ((Math.random() * this.gameHeight) - 120) - 10;
        this.speed = Math.random() * 9 + 1;
        this.markedForDeletion = false;
    }
    update(){
        this.x -= this.speed ;
        if(this.x < 0 - this.width) this.markedForDeletion = true;
    }
    draw(context){
        // context.strokeStyle = 'white';
        // context.beginPath();
        // context.arc(this.x, this.y, 20, 0, Math.PI * 2);
        // context.stroke();
        context.drawImage(this.image, this.x -26, this.y -26, this.width, this.height);        
    }
}
