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
function init() {
   
}

function preload() 
{
    this.load.image('background', './assets/images/FroggerBackground.png');
    this.load.image('frog', './assets/images/Frog.png')
    this.load.image('mum', './assets/images/MumFrog.png')
}

function create() 
{
    backgroundImage = this.add.image(0, 0, 'background'); 
    backgroundImage.setOrigin(0, 0);    
    frogIm = this.add.image(100, 300, 'frog');   
    mumIm = this.add.image(Phaser.Math.Between(0,400),15, 'mum');
   
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

    if(Phaser.Geom.Intersects.RectangleToRectangle(frogIm.getBounds(),mumIm.getBounds() ));

    
}