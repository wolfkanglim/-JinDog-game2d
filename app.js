import Butterfly from './butterfly.js';
import {init} from './script.js';

window.addEventListener('load', function(){
    const canvasHome = document.getElementById('canvas_home');
    const ctxHome = canvasHome.getContext('2d');
    canvasHome.width = window.innerWidth;
    canvasHome.height = window.innerHeight;
    const home = document.getElementById('home');
    const main = document.getElementById('main');
 
    home.addEventListener('click', () => {
        home.style.display = 'none';
        main.style.display = 'block';
        init();
    })
 
  /////butterfly
   let butterflies = [];
   let lastTime = 0;
   let speedY = Math.random() * 1.5 -1;
   //let deltaTime;
  
    for(let i = 0; i < 5; i++){
          butterflies.push(new Butterfly(canvasHome.width, canvasHome.height));
      }

  function flyHome(timeStamp){
      let deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      ctxHome.clearRect(0, 0, canvasHome.width, canvasHome.height);
      for(let i = 0; i < butterflies.length; i++){
          butterflies[i].draw(ctxHome);
          butterflies[i].update(deltaTime);
         if(butterflies[i].x < 0 || butterflies[i].x > canvasHome.width) butterflies[i].speedX = -butterflies[i].speedX;
         if(butterflies[i].y < 0 || butterflies[i.y > canvasHome.height]) speedY = -speedY;
        }
    requestAnimationFrame(flyHome);      
  }
    flyHome(0);  
})
