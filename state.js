 const states = {
    STANDING_RIGHT: 0,
    STANDING_LEFT: 1,
    SITTING_RIGHT: 2,
    SITTING_LEFT: 3,
    RUNNING_RIGHT: 4,
    RUNNING_LEFT: 5,
    JUMPING_RIGHT: 6,
    JUMPING_LEFT: 7,
    FALL_RIGHT: 8,
    FALL_LEFT: 9,
    ROLL_RIGHT:10,
    ROLL_LEFT: 11,
}

class State{
    constructor(state){
        this.state = state;
    }
}
//Right Left key for standing
export class StandingRight extends State{
    constructor(player){
        super('STANDING RIGHT');
        this.player = player;
    }
    enter(){
        this.player.frameY = 0;
        this.player.speed = 0;
        this.player.maxframe = 6;
    }
    handleInput(input){
        if(input === 'PRESS left') this.player.setState(states.RUNNING_LEFT);
        else if(input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT);
        else if(input === 'PRESS down') this.player.setState(states.SITTING_RIGHT);
        else if(input === 'PRESS up') this.player.setState(states.JUMPING_RIGHT);
        //else if(input === 'PRESS ctrl right') this.player.setState(states.ROLL_RIGHT);
        //else if(input === 'PRESS ctrl left') this.player.setState(states.ROLL_LEFT);
    }
}
export class StandingLeft extends State{
    constructor(player){
        super('STANDING LEFT');
        this.player = player;
    }
    enter(){
        this.player.frameY = 1;
        this.player.speed = 0;
        this.player.maxframe = 6;
    }
    handleInput(input){
        if(input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT);        
        else if(input === 'PRESS left') this.player.setState(states.RUNNING_LEFT);
        else if(input === 'PRESS down') this.player.setState(states.SITTING_LEFT);
        else if(input === 'PRESS up') this.player.setState(states.JUMPING_LEFT);
    }
}
//Down key for sitting
export class SittingRight extends State{
    constructor(player){
        super('SITTING RIGHT');
        this.player = player;
    }
    enter(){
        this.player.frameY = 8;
        this.player.speed = 0;
        this.player.maxframe = 3;
    }
    handleInput(input){
        if(input === 'PRESS left') this.player.setState(states.SITTING_LEFT);
        else if(input === 'RELEASE down') this.player.setState(states.STANDING_RIGHT);
    }
}
export class SittingLeft extends State{
    constructor(player){
        super('SITTING LEFT');
        this.player = player;
    }
    enter(){
        this.player.frameY = 9;
        this.player.speed = 0;
        this.player.maxframe = 3;
    }
    handleInput(input){
        if(input === 'PRESS right') this.player.setState(states.SITTING_RIGHT);
        else if(input === 'RELEASE down') this.player.setState(states.STANDING_LEFT);
    }
}
//RUNNING
export class RunningRight extends State{
    constructor(player){
        super('RUNNING RIGHT');
        this.player = player;
    }
    enter(){
        this.player.frameY = 6;
        this.player.speed = this.player.maxSpeed; 
        this.player.maxframe = 8;
    }
    handleInput(input){
        if(input === 'PRESS left') this.player.setState(states.RUNNING_LEFT);
        else if(input === 'RELEASE right') this.player.setState(states.STANDING_RIGHT);
        else if(input === 'PRESS down') this.player.setState(states.SITTING_RIGHT);
        else if(input === 'PRESS up') this.player.setState(states.JUMPING_RIGHT);
        
    }
}
export class RunningLeft extends State{
    constructor(player){
        super('RUNNING LEFT');
        this.player = player;
    }
    enter(){
        this.player.frameY = 7;
        //this.frameX++;
        this.player.speed = -this.player.maxSpeed;
        this.player.maxframe = 8;
    }
    handleInput(input){
        if(input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT);
        else if(input === 'RELEASE left') this.player.setState(states.STANDING_LEFT);
        else if(input === 'PRESS down') this.player.setState(states.SITTING_LEFT);
        else if(input === 'PRESS up') this.player.setState(states.JUMPING_LEFT);
        
    }
}
//jumping
export class JumpingRight extends State{
    constructor(player){
        super('JUMPING RIGHT');
        this.player = player;
    }
    enter(){
        this.player.frameY = 2;
        if(this.player.onGround()) this.player.vy = -28;
        this.player.speed = this.player.maxSpeed * 0.5;
        this.player.maxframe = 6;
    }
    handleInput(input){
        if(input === 'PRESS left') this.player.setState(states.RUNNING_LEFT);
        else if(this.player.vy > 0) this.player.setState(states.FALL_RIGHT);
    }
}
export class JumpingLeft extends State{
    constructor(player){
        super('JUMPING LEFT');
        this.player = player;
    }
    enter(){
        this.player.frameY = 3;
        if(this.player.onGround()) this.player.vy = -25;
        this.player.speed = - this.player.maxSpeed * 0.5;
        this.player.maxframe = 6;
    }
    handleInput(input){
        if(input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT);
        else if(this.player.vy > 0) this.player.setState(states.FALL_LEFT)
    }
}
export class FallRight extends State{
    constructor(player){
        super('FALL RIGHT');
        this.player = player;
    }
    enter(){
        this.player.frameY = 4;
        this.player.maxframe = 6;
    }
    handleInput(input){
        if(input === 'PRESS left') this.player.setState(states.FALL_LEFT);
        else if(this.player.onGround()) this.player.setState(states.STANDING_RIGHT);
    }
}
export class FallLeft extends State{
    constructor(player){
        super('FALL LEFT');
        this.player = player;
    }
    enter(){
        this.player.frameY = 5;
        this.player.maxframe = 6;
    }
    handleInput(input){
        if(input === 'PRESS right') this.player.setState(states.FALL_RIGHT);
        else if(this.player.onGround()) this.player.setState(states.STANDING_LEFT);
    }
}

//////////rolling not completed yet///////////

/* export class RollRight extends State{
    constructor(player){
        super('ROLL RIGHT');
        this.player = player;
    }
    enter(){
        this.player.frameY = 10;
        this.player.speed = this.player.maxSpeed; 
        this.player.maxframe = 6;
    }
    handleInput(input){
                
    }
}
export class RollLeft extends State{
    constructor(player){
        super('ROLL LEFT');
        this.player = player;
    }
    enter(){
        this.player.frameY = 11;
        this.player.speed = this.player.maxSpeed; 
        this.player.maxframe = 6;
    }
    handleInput(input){
                
    }
}
 */
