import Player, {PlayerTrails} from './player.js';
import handleInput from './input.js';
import {drawStatusText} from './utils.js';
import {level1layers, level2layers,level3layers, level4layers} from './layer.js';
import Fish from './enemyfish.js';
import Treasure from './treasure.js';
import Butterfly from './butterfly.js';
import {orangefoxesWalk, orangefoxesRun, orangefoxesJump, silverfoxesWalk, silverfoxesRun,silverfoxesJump, orangeFoxRunHandler, orangeFoxWalkHandler, orangeFoxJumpHandler,  silverFoxWalkHandler, silverFoxJumpHandler, silverFoxRunHandler} from './enemyfox.js';
import {Chicken} from './enemychicken.js';
 

export function init(){
     const loading = document.getElementById('loading');
    loading.style.display = 'block'; 
    
    const canvas = document.getElementById('canvas_main');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
    
    let deltaTime, score;
    let gameOver = false;
    const bgm = document.getElementById('bgm');
        bgm.volume = 0.35;
        bgm.play();
    const treasureSound = document.getElementById('scoreBell');
        treasureSound.volume = 0.5;
    const collisionSound = document.getElementById('collisionSound');
    const player = new Player(canvas.width, canvas.height);
    const input = new handleInput();    
    const restartBtn = document.getElementById('restartBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const signboard = document.getElementById('signboard');
    const levelUpBtn = document.getElementById('levelUpBtn');     

   /////layer handler
   function layerHandler(layers, player){
    layers.forEach(layer => {
         layer.update(player.currentState.state);
         layer.draw(ctx);
         })      
        }

        /////level change 
       levelUpBtn.onclick = function levelUp() {
            fishes = []; 
            chickens = [];
            lastTime = 0;
            player.restart(); 
               levelUpBtn.style.display = 'none';            
                bgm.play();
             score += 100;
                gameOver = false;
                animate(0);                 
        }          
            
    //player trails
    const trailsArray = [];
    function trailsHandler(){        
             trailsArray.unshift(new PlayerTrails(canvas.width, canvas.height, player.x, player.y));
                trailsArray.forEach(trail => {
            trail.draw(ctx);
            trail.update();
        })        
        if(trailsArray.length > 25){
            for(let i = 0; i < 5 ; i++){
                trailsArray.pop(trailsArray[i]);
            }
        }
    }       

    /////enemyfish handler
    const fishYellowImage = document.getElementById('yellow_fish');
    const fishBlueImage = document.getElementById('blue_fish')
    const fishBlackImage = document.getElementById('black_fish')
    const fishRedImage = document.getElementById('red_fish')

    let fishTimer = 0;
    let fishInterval = 5000 + Math.random() * 5000;
    let fishes = [];

    function fishHandler(deltaTime){
        if(fishTimer > fishInterval + Math.random() * 8000){
            const fishYellow = new Fish(fishYellowImage, canvas.width, canvas.height);
            const fishBlue = new Fish(fishBlueImage, canvas.width, canvas.height);
            const fishBlack = new Fish(fishBlackImage, canvas.width, canvas.height);
            const fishRed = new Fish(fishRedImage, canvas.width, canvas.height);

            let fishArray = [fishYellow, fishBlue, fishBlack, fishRed];
            let randomNumber = Math.floor(Math.random() * 4);
            fishes.push(fishArray[randomNumber]);
            fishTimer = 0;
        }          
        fishes.forEach(fish => {
            fish.draw(ctx);
            fish.update(deltaTime);    
        })
        fishes = fishes.filter(fish => !fish.markedForDeletion);      
            fishTimer += deltaTime;
    }
 
    /////chicken handler
    const chickenWalkImage = document.getElementById('chickenWalk');   
    const chickenFlyingImage = document.getElementById('chickenFlying');
    const chickenFallImage = document.getElementById('chickenFall');

    let chickenTimer = 0;
    let chickenInterval = Math.random() * 5000 + 3000;
    let chickens = [];

    function chickenHandler(context, deltaTime){
        if(chickenTimer > chickenInterval + Math.random() * 8000){
            const chickenWalk = new Chicken(chickenWalkImage, canvas.width, canvas.height, 15, canvas.height - 90, 0.01);
            const chickenFall = new Chicken(chickenFallImage, canvas.width, canvas.height, 19, canvas.height - 90, 1);
            const chickenFlying = new Chicken(chickenFlyingImage, canvas.width, canvas.height, 27, canvas.height - 90, 3);
            let randomChicken = [chickenWalk, chickenFall, chickenFlying]; 
            let random = Math.floor(Math.random() * 3);
            chickens.push(randomChicken[random]);
            chickenTimer = 0;
        }
            chickens.forEach(chic => {
            chic.draw(context);
            chic.update(deltaTime);
        })
        chickens =  chickens.filter(chic => !chic.markedForDeletion);
        chickenTimer += deltaTime;
    }

/////enemychicken enemyfox enemyfish collision
function collisionEnemy(enemy){      
    for(let i = 0; i < enemy.length; i++){
        let dx = enemy[i].x - player.x;
        let dy = enemy[i].y - player.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if(distance < 45){
            enemy[i].markedForDeletion = true;
            enemy[i].collision = true;
            collisionSound.volume = 0.5;
            collisionSound.play();
            bgm.pause();
            gameOver = true;   
            restartBtn.style.display = 'block'; 
        }                 
    }
}

// treasures apples and hearts
    score = 0;
    let forest = 'FAUNUS FOREST'; //god of forests
    let treasureTimer = 0;
    let treasureInterval = Math.random() * 3000 + 2000;
    let treasures = [];
    const apple = document.getElementById('apple');
    const heart = document.getElementById('heart');

    function treasureHandler(ctx, deltaTime){
        if(treasureTimer > treasureInterval){
            treasures.push(new Treasure(apple, canvas.width, canvas.height));        
            treasures.push(new Treasure(heart, canvas.width, canvas.height));      
            treasureTimer = 0;
        } else {
            treasureTimer += deltaTime;
        }
        treasures.forEach(treasure => {
            treasure.draw(ctx);
            treasure.update();       
        })
        treasures = treasures.filter(treasure => !treasure.markedForDeletion);

        //collision eating hearts apples
        for(let i = 0; i < treasures.length; i++){
            let dx = treasures[i].x - player.x;
            let dy = treasures[i].y - player.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let point = Math.floor(treasures[i].speed);
            
            if(distance < 35){
                treasureSound.currentTime = 0;
                treasureSound.play();
                score += point;
                treasures[i].markedForDeletion = true;    
                }
         }
    }

//butterefly
    let butterflies = [];
    let butterflyTimer = 0;
    let butterflyInterval = 5000;

    function butterflyHandler(ctx, deltaTime){
        const butterfly = new Butterfly(canvas.width, canvas.height);    
        if(butterflyTimer > butterflyInterval){
            butterflies.push(butterfly);
            butterflyTimer = 0;
            } else { 
                butterflyTimer += deltaTime;
            }    
    
        butterflies.forEach(butter => {
        butter.draw(ctx);
        butter.update(deltaTime);
        })   
    butterflies = butterflies.filter(butter => !butter.markedForDeletion); 
    
    //catch butterflies collision
    for(let i = 0; i <butterflies.length; i++){
        let dx = butterflies[i].x - player.x;
        let dy = butterflies[i].y - player.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let point = Math.ceil(butterflies[i].speedX) * 2;
        if(distance < 30){
        treasureSound.currentTime = 0;
            treasureSound.play();
            score += point;
            butterflies[i].markedForDeletion = true;                
        }
      }
    }

    function drawText(){
        ctx.fillStyle = 'rgba(20, 20, 20, 0.5)';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.drawImage(signboard, canvas.width / 1.4 + 30, 0, 200, 70);
        ctx.drawImage(signboard, canvas.width / 15 + 10, 0, 240, 70);
        ctx.fill();
        ctx.stroke();
        ctx.font = '20px "Inknut Antiqua"'; //font-family: , serif;
        ctx.fillStyle = 'black';
        ctx.fillText('SCORE: ' + score, canvas.width / 1.3, 55);
        ctx.fillText(forest, canvas.width / 10 - 10, 55);
    }
    //restart game
    restartBtn.addEventListener('click', restartGame);
    window.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') restartGame();
    })

    function restartGame(){
         fishes = []; 
         chickens = [];
         lastTime = 0;
         player.restart(); 
         bgm.play()        
         score = 0;
         gameOver = false;
         restartBtn.style.display = 'none';
         animate(0);
    }

    pauseBtn.onclick = function pauseGame() {
        if(!gameOver){
                pauseBtn.innerHTML = 'continue';
                    bgm.pause();                    
                    gameOver = true;
                }     
                else {
            pauseBtn.innerHTML = 'pause';
            bgm.play();
            gameOver = false;
            animate(0);
            }          
        }
        
    /////animation
    let lastTime = 0;
    function animate(timeStamp){
        deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    /////layer change by score
    if(score <= 100){
        layerHandler(level1layers, player);
        fishHandler(deltaTime);
        //chickenHandler(ctx, deltaTime);      
    } else if(score > 100 && score < 110){
        bgm.pause();                            
        gameOver = true;        
        levelUpBtn.style.display = 'block'; 
    } else if (score <= 300){
        forest = 'NAHELE FOREST'; //HAWAIIAN TREE GROVE
        layerHandler(level2layers, player); 
        chickenHandler(ctx, deltaTime);           
    }  else if(score > 300 && score < 310){
        bgm.pause();                            
        gameOver = true;        
        levelUpBtn.style.display = 'block'; 
    } else if( score <= 500){
        forest = 'KEZIA FOREST'; // cassia tree
        fishes = [];
        layerHandler(level3layers,player);
        orangeFoxWalkHandler(ctx, deltaTime, canvas.width, canvas.height);
        orangeFoxRunHandler(ctx, deltaTime, canvas.width, canvas.height);
        orangeFoxJumpHandler(ctx, deltaTime, canvas.width, canvas.height);
    }  else if(score > 500 && score < 510){
        bgm.pause();                            
        gameOver = true;        
        levelUpBtn.style.display = 'block'; 
    } else if( score <= 700){
        forest = 'ARYWODE FOREST'; //from the fir forest
        layerHandler(level4layers, player);       
        silverFoxWalkHandler(ctx, deltaTime, canvas.width, canvas.height);
        silverFoxRunHandler(ctx, deltaTime, canvas.width, canvas.height);
        silverFoxJumpHandler(ctx, deltaTime, canvas.width, canvas.height);
    } else if(score > 1000) {
        forest = 'WONDER FOREST';
        layerHandler(level1layers, player);
        orangeFoxWalkHandler(ctx, deltaTime, canvas.width, canvas.height);
        orangeFoxRunHandler(ctx, deltaTime, canvas.width, canvas.height);
        orangeFoxJumpHandler(ctx, deltaTime, canvas.width, canvas.height);
        silverFoxWalkHandler(ctx, deltaTime, canvas.width, canvas.height);
        silverFoxRunHandler(ctx, deltaTime, canvas.width, canvas.height);
        silverFoxJumpHandler(ctx, deltaTime, canvas.width, canvas.height);
    } else {
        layerHandler(level1layers, player);
        orangeFoxWalkHandler(ctx, deltaTime, canvas.width, canvas.height);
        orangeFoxRunHandler(ctx, deltaTime, canvas.width, canvas.height);
        orangeFoxJumpHandler(ctx, deltaTime, canvas.width, canvas.height);
        silverFoxWalkHandler(ctx, deltaTime, canvas.width, canvas.height);
        silverFoxRunHandler(ctx, deltaTime, canvas.width, canvas.height);
        silverFoxJumpHandler(ctx, deltaTime, canvas.width, canvas.height);
        fishHandler(deltaTime);
       chickenHandler(ctx, deltaTime);
    }
    trailsHandler();
    player.update(input.lastkey);
    player.draw(ctx, deltaTime);
    treasureHandler(ctx,deltaTime);
    butterflyHandler(ctx, deltaTime);

    /////collsion check
    collisionEnemy(orangefoxesWalk);
    collisionEnemy(orangefoxesRun);
    collisionEnemy(orangefoxesJump);
    collisionEnemy(silverfoxesWalk);
    collisionEnemy(silverfoxesRun);
    collisionEnemy(silverfoxesJump);
    collisionEnemy(chickens);
    collisionEnemy(fishes);
        drawText();
        drawStatusText(ctx, input, player);
        if(!gameOver) requestAnimationFrame(animate);
        }
      animate(0);
   }
 