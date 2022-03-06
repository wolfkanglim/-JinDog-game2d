import {StandingRight, StandingLeft,SittingRight, SittingLeft,RunningRight, RunningLeft, JumpingRight, JumpingLeft,FallLeft, FallRight} from './state.js';

export default class Player{
    constructor(gameWidth, gameHeight){        
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;        
        this.image = document.getElementById('dog_sprite');
        this.states = [new StandingRight(this), new StandingLeft(this),new SittingRight(this), new SittingLeft(this), new RunningRight(this), new RunningLeft(this), new JumpingRight(this), new JumpingLeft(this), new FallRight(this), new FallLeft(this)]; 
        this.currentState = this.states[0];
        this.width = 200;
        this.height = 181.83;
        this.frameX = 0;
        this.frameY = 0;
        this.x = this.gameWidth / 2 - this.width / 2;
        this.y = this.gameHeight - this.height - 260;
        this.speed = 0;
        this.maxSpeed = 10;
        this.vy = 0;
        this.gravity = 1;
        //deltaTime frame animation
        this.maxFrame = 4;
        this.fps = 30;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }
    restart(){
        this.x = 200;
        this.y = this.gameHeight - this.height / 2 - 320;
    }
    draw(context, deltaTime){
        if(this.frameTimer > this.frameInterval){
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;
        } else {
             this.frameTimer += deltaTime;
         }
      /* context.strokeStyle = 'white';
       context.beginPath();
       context.arc(this.x, this.y, 30, 0, Math.PI * 2);
       context.stroke(); */
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x - 60, this.y - 50, this.width /1.8, this.height/ 2);
    }
    update(input){      
        this.currentState.handleInput(input);       
        this.x += this.speed;
        if(this.x < 0) this.x = 0;
        if(this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
      
        //vertical movement
        this.y += this.vy;
        if(!this.onGround()) {
            this.vy += this.gravity;
       } else { 
           this.vy = 0;
       }
    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    onGround(){
        return this.y >= this.gameHeight - this.height / 2;;
    }
}

//player trails

export class PlayerTrails{
    constructor(gameWidth, gameHeight, x, y){        
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 1;
        this.speedY = Math.random() * 0.4 - 0.3;
        //this.color = '#fff';
    }
    draw(context){
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(this.x + 5, this.y + 18, this.size, 0 , Math.PI * 2);
        context.fill();
    }
    update(){
        this.x -= 1;
        this.y += this.speedY;
    }
}

