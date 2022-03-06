  const pantingSound = new Audio();
    pantingSound.src = '../gamesound/dog_panting.wav';
    pantingSound.currentTime = 0;
    const barkTwiceSound = new Audio();
    barkTwiceSound.src = './asset/dog-barking-twice.wav';
    barkTwiceSound.currentTime = 0;
    barkTwiceSound.volume = 0.5;

export default class handleInput{
    constructor(){
        this.lastkey = '';
        this.touchY = 0;
        this.touchTreshold = 30;
        window.addEventListener('keydown', (e) => {
            switch(e.key){
                 case 'ArrowLeft':
                     if(e.key === 'Control'){
                        pantingSound.play();
                         this.lastkey = 'PRESS ctrl left';
                     } else {
                         this.lastkey = "PRESS left";                          
                     }                     
                     break;
                 case 'ArrowRight':
                     if(e.shift){
                         this.lastkey = 'PRESS ctrl right';
                     } else {
                         this.lastkey = "PRESS right";
                     }                     
                     break;        
                 case 'ArrowDown':                    
                         this.lastkey = "PRESS down";
                     break;                       
                 case 'ArrowUp':
                     this.lastkey = "PRESS up";
                     barkTwiceSound.play();
                     break;
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