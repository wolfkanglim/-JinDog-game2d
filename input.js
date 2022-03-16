   const pantingSound = new Audio();
    pantingSound.src = './asset/dog_panting.wav';    
    pantingSound.volume = 0.5;
  const barkTwiceSound = new Audio();
    barkTwiceSound.src = './asset/dog-barking-twice.wav';    
    barkTwiceSound.volume = 0.5;
    const fireBallSound = new Audio();
    fireBallSound.src = './asset/fireball3.mp3';
    fireBallSound.volume = 0.2;

export default class handleInput{
    constructor(){
        this.lastkey = '';
        this.touchY = 0;
        this.touchTreshold = 30;
        window.addEventListener('keydown', (e) => {
            if((e.ctrlKey) && e.key === 'ArrowRight'){
                this.lastkey = 'PRESS ctrl right';
                fireBallSound.currentTime = 0;
                fireBallSound.play();
            }    
            if((e.ctrlKey) && e.key === 'ArrowLeft'){
                this.lastkey = 'PRESS ctrl left';
                fireBallSound.currentTime = 0;
                fireBallSound.play(); 
            }    
           else if(!e.ctrlKey){
                switch(e.key){
                 case 'ArrowLeft':
                     pantingSound.currentTime = 0;                       
                     pantingSound.play();                      
                     this.lastkey = "PRESS left";                         
                     break;
                 case 'ArrowRight':
                     pantingSound.currentTime = 0;
                    pantingSound.play();
                    this.lastkey = "PRESS right";
                    break;        
                 case 'ArrowDown':                    
                    this.lastkey = "PRESS down";
                     break;                       
                 case 'ArrowUp':
                     this.lastkey = "PRESS up";
                     barkTwiceSound.currentTime = 0;
                     barkTwiceSound.play();
                     break;
               }   
           }               
        })             
      
        window.addEventListener('keyup', (e) => {
            switch(e.key){
                case 'ArrowLeft':
                    this.lastkey = 'RELEASE left';
                    break;
                case 'ArrowRight':
                    this.lastkey = 'RELEASE right';
                    break;    
                case 'ArrowDown':
                    this.lastkey = 'RELEASE down';
                    break;    
                case 'ArrowUp':
                    this.lastkey = 'RELEASE up';
                    break;    
            }
        }) 
        
        /////mouse toggle for Pause Game///// 
        window.addEventListener('mouseclick', (e) => {

            console.log('pause');
            console.log(e);
            if(!gameOver){
                gameOver = true;
            } else {
                gameOver = false;
            }
        })        

      /////control button input/////
        const jumpLeft = document.getElementById('jumpLeft');
        const jumpRight = document.getElementById('jumpRight');
        const runLeft = document.getElementById('runLeft');
        const runRight = document.getElementById('runRight');
        const rollLeft = document.getElementById('rollLeft');
        const rollRight = document.getElementById('rollRight');

        jumpLeft.addEventListener('mousedown', () => {
            this.lastkey = "PRESS up";
        })
        jumpLeft.addEventListener('mouseup', () => {
            this.lastkey = 'RELEASE up';
        })
        jumpRight.addEventListener('mousedown', () => {
            this.lastkey = "PRESS up";
        })
        jumpRight.addEventListener('mouseup', () => {
            this.lastkey = 'RELEASE up';
        })

        runLeft.addEventListener('mousedown', () => {
            this.lastkey = "PRESS left";
        })
        runLeft.addEventListener('mouseup', () => {
            this.lastkey = 'RELEASE left';
        })

        runRight.addEventListener('mousedown', () => {
            this.lastkey = "PRESS right";
        })
        runRight.addEventListener('mouseup', () => {
            this.lastkey = 'RELEASE right';
        })

        rollLeft.addEventListener('mousedown', () => {
            this.lastkey = 'PRESS ctrl left';
        })
        rollLeft.addEventListener('mouseup', () => {
            this.lastkey = 'RELEASE left';
        })
        rollRight.addEventListener('mousedown', () => {
            this.lastkey = 'PRESS ctrl right';
        })
        rollRight.addEventListener('mouseup', () => {
            this.lastkey = 'RELEASE right';
        })
 

        ///// touchsreen ///// 
        ///// need to add 'swipe up' 'swipe down' in inputHandler at state.js 

        window.addEventListener('touchstart', (e) => {
            this.touchY = e.changedTouches[0].pageY;
        })
        window.addEventListener('touchmove', (e) => {
            console.log('move');
            let swipeDistance = e.changedTouches[0].pageY - this.touchY;
            if(swipeDistance < - this.touchTreshold && this.lastkey.indexOf('swipe up') === -1) this.lastkey.push('swipe up');
            else if(swipeDistance > this.touchTreshold && this.lastkey.indexOf('swipe down') === -1) this.lastkey.push('swipe down');
        })
        window.addEventListener('touchend', (e) => {
            console.log('end');
            this.lastkey.splice(this.lastkey.indexOf('swipe up'), 1);
            this.lastkey.splice(this.lastkey.indexOf('swipe down'), 1);
        })
    }
}
