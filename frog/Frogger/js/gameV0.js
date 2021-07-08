let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 320,
    physics: {
        default: 'arcade'
    },
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update
    },
    audio: {
        disableWebAudio: true
    },
    autoCenter: true
};


let game = new Phaser.Game(config);
let frogIm, mumIm;
let down, up, left, right;
let haertIm;
let tweenHeart;
function init() {
   
}

function preload() 
{
    this.load.image('background', './assets/images/FroggerBackground.png');
    this.load.image('frog', './assets/images/Frog.png');
    this.load.image('mum', './assets/images/MumFrog.png');
    this.load.image('heart', './assets/images/heart.png');
    this.load.image('car', './assets/images/car.png');
}

function create() 
{
    backgroundImage = this.add.image(0, 0, 'background'); 
    backgroundImage.setOrigin(0, 0);    
    frogIm = this.add.image(100, 300, 'frog');   
    mumIm = this.add.image(Phaser.Math.Between(0,400),15, 'mum');
    haertIm = this.add.image(240,160,"heart");
    haertIm.setScale(0,0);
    tweenHeart = this.tweens.add({
        targets: haertIm,
        scale: 4.0, 
        duration: 3000, 
        ease: 'Linear', 
        yoyo: false,
        loop: 0,
        paused: true
        });
    carIm = this.add.image(200, 100, 'car');  
   
    down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); 
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


}

function update()
{
    if (Phaser.Input.Keyboard.JustDown(down)&& frogIm.y < 304)
    {
        frogIm.y += 16 ;
        frogIm.setAngle(180);
    } 
        
    if (Phaser.Input.Keyboard.JustDown(up)&& frogIm.y > 16)
    {
        frogIm.y -= 16 ;
        frogIm.setAngle(0);
    } 
    if (Phaser.Input.Keyboard.JustDown(left)&& frogIm.x > 16)
    {
        frogIm.x -= 16;
        frogIm.setAngle(-90);
    } 
    if (Phaser.Input.Keyboard.JustDown(right)&& frogIm.x < 464)
    {
        frogIm.x += 16;
        frogIm.setAngle(90);
    } 

    if(Phaser.Geom.Intersects.RectangleToRectangle(frogIm.getBounds(),mumIm.getBounds() )) tweenHeart.play();

    
}