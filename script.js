import Player, {PlayerTrails} from './player.js';
import handleInput from './input.js';
import {drawStatusText} from './utils.js';
import {level1layers, level2layers,level3layers, level4layers} from './layer.js';
//import {level1layers, level2layers,level3layers, level4layers} from './layer2fairy.js';
import Fish from './enemyfish.js';
import Treasure from './treasure.js';
import Butterfly from './butterfly.js';
import {Chicken} from './enemychicken.js';
import {Fox} from './enemyfox.js';

export function init(){
     const loading = document.getElementById('loading');
    loading.style.display = 'none'; 

    
    const canvas = document.getElementById('canvas_main');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 720; 
    
    let deltaTime, score;
    let gameOver = false;
    const bgm = document.getElementById('bgm');
        bgm.volume = 0.35;
        bgm.play();
    const treasureSound = document.getElementById('scoreBell');
        treasureSound.volume = 0.5;
    const collisionSound = document.getElementById('collisionSound');
     const magicBell = document.getElementById('magicBell');
    const player = new Player(canvas.width, canvas.height);
    const input = new handleInput();    
    const restartBtn = document.getElementById('restartBtn');
    const signboard = document.getElementById('signboard');
    const levelUpBtn = document.getElementById('levelUpBtn');     
    const endingBtn = document.getElementById('endingBtn');
  
   /////layer handler
   function layerHandler(layers, player){
    layers.forEach(layer => {
         layer.update(player.currentState.state);
         layer.draw(ctx);
         })      
        }
     
    //player trails
    const trailsArray = [];
    let  color, size;
    function trailsHandler(){
         if(player.currentState.state == 'ROLL RIGHT' || player.currentState.state == 'ROLL LEFT'){
            color = '#e25822';
            size = 3.3;
         } else {
             color = '#fff';  
             size = 1;
         }                       
            trailsArray.unshift(new PlayerTrails(canvas.width, canvas.height, player.x, player.y, color, size));
           
            trailsArray.forEach(trail => {
            trail.draw(ctx);
            trail.update();
             })
            if(trailsArray.length > 35){
            for(let i = 0; i < 16 ; i++){
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
 
    /////enemy chicken handler
    const chickenWalkImage = document.getElementById('chickenWalk');   
    const chickenFlyingImage = document.getElementById('chickenFlying');
    const chickenFallImage = document.getElementById('chickenFall');

    let chickenTimer = 0;
    let chickenInterval = Math.random() * 5000 + 3000;
    let chickens = [];

    function chickenHandler(context, deltaTime){
        if(chickenTimer > chickenInterval + Math.random() * 8000){
            const chickenWalk = new Chicken(chickenWalkImage, canvas.width, canvas.height, 15, canvas.height - 130, 0.01);
            const chickenFall = new Chicken(chickenFallImage, canvas.width, canvas.height, 19, canvas.height - 130, 1);
            const chickenFlying = new Chicken(chickenFlyingImage, canvas.width, canvas.height, 27, canvas.height - 130, 3);
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

/////enemy  orangefox handler
    let foxTimer = 0;
    let foxInterval = 3000 + Math.random() * 4000;
    let orangeFoxes = [];
    const orangeFoxWalkImage = document.getElementById('orangeFox_walk');
    const orangeFoxRunImage = document.getElementById('orangeFox_run');
    const orangeFoxJumpImage = document.getElementById('orangeFox_jump');

    function orangeFoxHandler(context, deltaTime,width, height){  
        const orangeFoxWalk = new Fox(orangeFoxWalkImage, width, height, 20, 0.1);
        const orangeFoxRun = new Fox(orangeFoxRunImage, width, height, 10, 5);
        const orangeFoxJump = new Fox(orangeFoxJumpImage, width, height, 23, 1);
        if(foxTimer > foxInterval + Math.random() * 20000){
            let randomNumber = Math.floor(Math.random() * 3);
            let orangeFoxesArray = [orangeFoxWalk, orangeFoxRun, orangeFoxJump];
            orangeFoxes.push(orangeFoxesArray[randomNumber]);
            foxTimer = 0;
        }
        orangeFoxes = orangeFoxes.filter(fox => !fox.markedForDeletion);
            foxTimer += deltaTime;
            orangeFoxes.forEach(fox => {
            fox.draw(context);
            fox.update(deltaTime);
        })
    } 

    /////enemy silver fox handler
    let silverFoxes = [];
    const silverFoxWalkImage = document.getElementById('silverFox_walk');
    const silverFoxRunImage = document.getElementById('silverFox_run');
    const silverFoxJumpImage = document.getElementById('silverFox_jump');

    function silverFoxHandler(context, deltaTime,width, height){  
        const silverFoxWalk = new Fox(silverFoxWalkImage, width, height, 20, 0.1);
        const silverFoxRun = new Fox(silverFoxRunImage, width, height, 10, 5);
        const silverFoxJump = new Fox(silverFoxJumpImage, width, height, 23, 1);
        if(foxTimer > foxInterval + Math.random() * 20000){
            let randomNumber = Math.floor(Math.random() * 3);
            let silverFoxesArray = [silverFoxWalk, silverFoxRun, silverFoxJump];
            silverFoxes.push(silverFoxesArray[randomNumber]);
            foxTimer = 0;
        }
        silverFoxes = silverFoxes.filter(fox => !fox.markedForDeletion);
            foxTimer += deltaTime;
            silverFoxes.forEach(fox => {
            fox.draw(context);
            fox.update(deltaTime);
        })
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
                
                if(player.currentState.state =='ROLL RIGHT' || player.currentState.state == 'ROLL LEFT'){
                    return;
                } else {
                    collisionSound.volume = 0.5;
                    collisionSound.play();
                    player.life--; 
                    player.restart();
                    if(player.life === 0){
                    bgm.pause();
                    gameOver = true;   
                    restartBtn.style.display = 'block';
                     }
                }
            }                 
        }
    }

// treasures apples and hearts
    score = 0;
    let appleCount = 0;
    let heartCount = 0
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
                if(treasures[i].image.id == 'apple') appleCount++;
                else heartCount++;
                }
         }
    }

//butterefly
    let butterflies = [];
    let butterflyTimer = 0;
    let butterflyInterval = 5000;
    let butterflyCount = 0;

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
        let point = Math.ceil(butterflies[i].speedX);
        if(distance < 30){
        treasureSound.currentTime = 0;
            treasureSound.play();
            score += point;
            butterflyCount++;
            butterflies[i].markedForDeletion = true;                
        }
      }
    }

    function drawText(){
        ctx.fillStyle = 'rgba(20, 20, 20, 0.5)';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.drawImage(signboard, canvas.width / 1.45, 0, 230, 70);
        ctx.drawImage(signboard, canvas.width / 15 + 10, 0, 240, 70);
        ctx.fill();
        ctx.stroke();
        ctx.font = '20px "Inknut Antiqua"'; //font-family: , serif;
        ctx.fillStyle = 'black';
        ctx.fillText('SCORE: ' + score, canvas.width / 1.4, 55);
        ctx.fillText(forest, canvas.width / 11 - 10, 55);
    }

/////restart game
    restartBtn.addEventListener('click', restartGame);
    endingBtn.addEventListener('click', bonusGame);
    window.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') restartGame();
    })

    function restartGame(){
         fishes = []; 
         chickens = [];
         orangeFoxes = [];
         silverFoxes = [];
         lastTime = 0;
         player.life = 10;
         player.restart(); 
         bgm.play()        
         score = 0;
         gameOver = false;
         restartBtn.style.display = 'none';
         animate(0);
    }
  
       ///canvas pause and how to play
         const paused = document.getElementById('paused');
        canvas.addEventListener('touchstart', (e) => {
             e.preventDefault();
            if(!gameOver){
                bgm.pause();                    
                gameOver = true;                 
                paused.style.display = 'block';
                }    
        })
        paused.addEventListener('click', () => {
             bgm.play();
                gameOver = false;
                paused.style.display = 'none';
                animate(0);
        }) 
               

            
    function bonusGame(){
            fishes = []; 
            chickens = [];
            orangeFoxes = [];
            silverFoxes = [];
            lastTime = 0;
            player.restart(); 
            endingBtn.style.display = 'none';
            //bgm.play()        
            score += 100;
            gameOver = false;
            animate(0);
    }

////for count 
    function drawSingles(){
        const dogImage = document.getElementById('dog_sprite');
        const butterflypng = new Image();
        butterflypng.src = './asset/butterfly_angle2.png';
        ctx.drawImage(dogImage, 0,0, 200, 181, 80, 70, 40, 35);
        ctx.drawImage(apple, canvas.width / 1.4, 76, 25, 25);
        ctx.drawImage(heart ,canvas.width / 1.25, 80, 25, 25);
        ctx.drawImage(butterflypng, 0, 0, 75, 70, canvas.width / 1.15, 70, 42, 42)
        ctx.font = '20px Arial';
         ctx.fillText(appleCount, canvas.width / 1.36 + 15, 96);
        ctx.fillText(heartCount, canvas.width / 1.22 + 15, 96);
        ctx.fillText(butterflyCount, canvas.width / 1.12 + 15, 96);
    }

   /////level change 
     function levelUpBonus(){
        fishes = []; 
        chickens = [];
        orangeFoxes = [];
        silverFoxes = [];
        lastTime = 0;
         player.life++;
        score += 100;
     }               
/// draw bonus text and set timeout
    function drawTextBonus(){
        ctx.font = '36px "Inknut Antiqua"';
        ctx.fillText('BONUS', canvas.width/3 + 20, canvas.height/3 - 50);        
        ctx.fillText('100 Point', canvas.width/3, canvas.height/3);        
        ctx.fillText('+ 1 Life', canvas.width/3, canvas.height/3 + 50);        
    }
    function clearTextBonus(){
        ctx.clearRect(0,0, canvas.widht, canvas.height);
        gameOver = false;
        animate(0);
    }
    function showTextBonus(){
        drawTextBonus();
        setTimeout(clearTextBonus, 5000)
    }
                 
  /////layer change by score
  function levelUp(){
        if(score <= 100){
            layerHandler(level1layers, player);
            fishHandler(deltaTime); 
            //showTextBonus();   
        } else if(score > 100 && score < 110){
            magicBell.play();
            gameOver = true;
            levelUpBonus();
            showTextBonus();            
        } else if (score <= 300){
            forest = 'NAHELE FOREST'; //HAWAIIAN TREE GROVE
            layerHandler(level2layers, player); 
            chickenHandler(ctx, deltaTime);           
        }  else if(score > 300 && score < 310){
            magicBell.play();
            gameOver = true;
            levelUpBonus();
            showTextBonus();
        } else if( score <= 500){
            forest = 'KEZIA FOREST'; // cassia tree        
            layerHandler(level3layers,player);
            orangeFoxHandler(ctx, deltaTime, canvas.width, canvas.height);
        }  else if(score > 500 && score < 510){
            magicBell.play();
            gameOver = true;
            levelUpBonus();
            showTextBonus();
        } else if( score <= 700){
            forest = 'ARYWODE FOREST'; //from the fir forest
            layerHandler(level4layers, player);       
            silverFoxHandler(ctx, deltaTime, canvas.width, canvas.height);
        } else if(score >700 && score < 710) {
            magicBell.play();
            gameOver = true;
            levelUpBonus();
            showTextBonus();
        }   
        else if(score <= 1000) {
            forest = 'WONDER FOREST';
            layerHandler(level1layers, player);
            orangeFoxHandler(ctx, deltaTime, canvas.width, canvas.height);
            silverFoxHandler(ctx, deltaTime, canvas.width, canvas.height);
        } else if(score > 1000 && score < 1010){
            //insert ending scene, special challenge course add rollpower! bonus 500 point target 2000point for win
            //bgm.pause();                            
            gameOver = true;        
            endingBtn.style.display = 'block'; 
        } else if(score > 1010) {
            layerHandler(level1layers, player);
            orangeFoxHandler(ctx, deltaTime, canvas.width, canvas.height); 
            silverFoxHandler(ctx, deltaTime, canvas.width, canvas.height);
            fishHandler(deltaTime);
            chickenHandler(ctx, deltaTime);
        }
    }

 /////animation//////
    let lastTime = 0;
    function animate(timeStamp){
        deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);        
        levelUp();
        trailsHandler();
        player.update(input.lastkey);
        player.draw(ctx, deltaTime);
        treasureHandler(ctx,deltaTime);
        butterflyHandler(ctx, deltaTime);
        drawSingles();
        /////collsion check  
        collisionEnemy(orangeFoxes);
        collisionEnemy(silverFoxes);
        collisionEnemy(chickens);
        collisionEnemy(fishes);
        drawText();
        drawStatusText(ctx, input, player);        
        if(!gameOver) requestAnimationFrame(animate);
        }
      animate(0);
 }
 
