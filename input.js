   
const barkTwiceSound = new Audio();
barkTwiceSound.src = 'sounds/sounds_dog-barking-twice.wav';    
barkTwiceSound.volume = 0.2;
const fireBallSound = new Audio();
fireBallSound.src = 'sounds/sounds_fireball3.mp3';
fireBallSound.volume = 0.2;

export default class handleInput{
  constructor(){
    this.lastkey = '';
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
        
                  this.lastkey = "PRESS left";                         
                  break;
              case 'ArrowRight':

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
  

    /////control button input/////
    const jumpLeft = document.getElementById('jumpLeft');
    const jumpRight = document.getElementById('jumpRight');
    const runLeft = document.getElementById('runLeft');
    const runRight = document.getElementById('runRight');
    const rollLeft = document.getElementById('rollLeft');
    const rollRight = document.getElementById('rollRight');

      jumpLeft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.lastkey = "PRESS up";
        barkTwiceSound.currentTime = 0;
        barkTwiceSound.play();
    })
    jumpLeft.addEventListener('touchend', (e) => {
      e.preventDefault();
        this.lastkey = 'RELEASE up';
    })
    jumpRight.addEventListener('touchstart', (e) => {
      e.preventDefault();
        this.lastkey = "PRESS up";
        barkTwiceSound.currentTime = 0;
        barkTwiceSound.play();
    })
    jumpRight.addEventListener('touchend', (e) => {
      e.preventDefault();
        this.lastkey = 'RELEASE up';
    })

    runLeft.addEventListener('touchstart', (e) => {
      e.preventDefault();
        this.lastkey = "PRESS left";
    })
    runLeft.addEventListener('touchend', (e) => {
      e.preventDefault();
        this.lastkey = 'RELEASE left';
    })

    runRight.addEventListener('touchstart', (e) => {
      e.preventDefault();
        this.lastkey = "PRESS right";
    })
    runRight.addEventListener('touchend', (e) => {
      e.preventDefault();
        this.lastkey = 'RELEASE right';
    })

    rollLeft.addEventListener('touchstart', (e) => {
      e.preventDefault();
        this.lastkey = 'PRESS ctrl left';
        fireBallSound.play();
        fireBallSound.currentTime = 0;
    })
    rollLeft.addEventListener('touchend', (e) => {
      e.preventDefault();
        this.lastkey = 'RELEASE left';
    })
    rollRight.addEventListener('touchstart', (e) => {
      e.preventDefault();
        this.lastkey = 'PRESS ctrl right';
        fireBallSound.play();
        fireBallSound.currentTime = 0;
    })
    rollRight.addEventListener('touchend', (e) => {
      e.preventDefault();
        this.lastkey = 'RELEASE right';
    })

    //touch screen 
    
  }
}   