//BG layers
//let gameSpeed = 5;
const bgLayer1 = new Image();
bgLayer1.src = './background/forest_bg_1/sky.png';
const bgLayer2 = new Image();
bgLayer2.src = './background/forest_bg_1/decor.png';
const bgLayer3 = new Image();
bgLayer3.src = './background/forest_bg_1/middle.png';
const bgLayer4 = new Image();
bgLayer4.src = './background/forest_bg_1/foreground.png';
const bgLayer5 = new Image();
bgLayer5.src = './background/forest_bg_1/ground.png';

class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.image = image;
        this.width = 1920;
        this.height = 640 ;
        this.x2 = this.x + this.width;
        this.gameSpeed = 5;
        this.speedModifier = speedModifier;
        this.speed = this.gameSpeed * this.speedModifier;
    }
    update(state){
        this.speed = this.gameSpeed * this.speedModifier;
        if(this.x <= -this.width) {
             this.x = this.width + this.x2 - this.speed;
        }
        if(this.x2 <= -this.width) {
             this.x2 = this.width + this.x - this.speed;
        }
        this.x = this.x - this.speed;
        this.x2 = this.x2 - this.speed;
    
        if(state === 'RUNNING RIGHT'){
            this.gameSpeed = 20;
        } else if(state === 'RUNNING LEFT'){
            this.gameSpeed = - 10;
        } else {
            this.gameSpeed = 5;
        }
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

///// level 1 forest ///////
const layer1 = new Layer(bgLayer1, 0);
const layer2 = new Layer(bgLayer2, 0.001);
const layer3 = new Layer(bgLayer3, 0.01);
const layer4 = new Layer(bgLayer4, 0.05);
const layer5 = new Layer(bgLayer5, 0.1);

export const level1layers = [layer1, layer2, layer3, layer4, layer5];

//level 2 layers 
const bg2Layer1 = new Image();
bg2Layer1.src = './background/forest_bg_2/Sky.png';
const bg2Layer2 = new Image();
bg2Layer2.src = './background/forest_bg_2/BG_Decor.png';
const bg2Layer3 = new Image();
bg2Layer3.src = './background/forest_bg_2/Middle_Decor.png';
const bg2Layer4 = new Image();
bg2Layer4.src = './background/forest_bg_2/Foreground.png';
const bg2Layer5 = new Image();
bg2Layer5.src = './background/forest_bg_2/Ground.png';

const level2layer1 = new Layer(bg2Layer1, 0);
const level2layer2 = new Layer(bg2Layer2, 0.001);
const level2layer3 = new Layer(bg2Layer3, 0.01);
const level2layer4 = new Layer(bg2Layer4, 0.05);
const level2layer5 = new Layer(bg2Layer5, 0.1);

export const level2layers = [level2layer1, level2layer2, level2layer3, level2layer4, level2layer5];

//level 3 layers 
const bg3Layer1 = new Image();
bg3Layer1.src = './background/forest_bg_3/Sky.png';
const bg3Layer2 = new Image();
bg3Layer2.src = './background/forest_bg_3/BG_Decor.png';
const bg3Layer3 = new Image();
bg3Layer3.src = './background/forest_bg_3/Middle_Decor.png';
const bg3Layer4 = new Image();
bg3Layer4.src = './background/forest_bg_3/Foreground.png';
const bg3Layer5 = new Image();
bg3Layer5.src = './background/forest_bg_3/Ground.png';

const level3layer1 = new Layer(bg3Layer1, 0);
const level3layer2 = new Layer(bg3Layer2, 0.001);
const level3layer3 = new Layer(bg3Layer3, 0.01);
const level3layer4 = new Layer(bg3Layer4, 0.05);
const level3layer5 = new Layer(bg3Layer5, 0.1);

export const level3layers = [level3layer1, level3layer2, level3layer3, level3layer4, level3layer5];

//level 4 layers 
const bg4Layer1 = new Image();
bg4Layer1.src = './background/forest_bg_4/Sky.png';
const bg4Layer2 = new Image();
bg4Layer2.src = './background/forest_bg_4/BG_Decor.png';
const bg4Layer3 = new Image();
bg4Layer3.src = './background/forest_bg_2/Middle_Decor.png';
const bg4Layer4 = new Image();
bg4Layer4.src = './background/forest_bg_4/Foreground.png';
const bg4Layer5 = new Image();
bg4Layer5.src = './background/forest_bg_4/Ground.png';

const level4layer1 = new Layer(bg4Layer1, 0);
const level4layer2 = new Layer(bg4Layer2, 0.001);
const level4layer3 = new Layer(bg4Layer3, 0.01);
const level4layer4 = new Layer(bg4Layer4, 0.05);
const level4layer5 = new Layer(bg4Layer5, 0.1);

export const level4layers = [level4layer1, level4layer2, level4layer3, level4layer4, level4layer5];

