let config =
 {
    type: Phaser.AUTO,
    width: 611,
    height: 980,
    audio: { 
        disableWebAudio: true
    },
    physics: {
        default: 'arcade'
    },
    scene: {
        preload : preload,     
        create: create,     
        update : update   
    }
};

let game = new Phaser.Game(config);
let starImage;
let snowflake;
let chrismax;
let clocheIm;
let guirImage;
let tweenguir;
let bougieIm;
let gifCanvas;
let winText;
let floIm;

function preload() 
{
    this.load.image('background', './assets/images/back_2.png'); 
    this.load.image("sapin","./assets/images/tree_1.png");
    this.load.image("boul1","./assets/images/obj/obj_08.png");
    this.load.image("boul2","./assets/images/obj/obj_21.png");
    this.load.image("cloche","./assets/images/obj/obj_27.png");
    this.load.image("boul3","./assets/images/obj/obj_24.png");
    this.load.image("guir","./assets/images/ribbonClear.png");
    this.load.image("guir1","./assets/images/ribbon.png");
    this.load.image("star","./assets/images/obj/star.png");
    this.load.image("snowflake","./assets/images/snowflake.png")
    this.load.audio('chrismax', "./assets/audio/christmasMusic.mp3"); 
    this.load.image("cadeau","./assets/images/obj/obj_13.png");
    this.load.image("bougie","./assets/images/obj/obj_03.png");
    this.load.image("flo","./assets/images/obj/obj_10.png");
    this.load.image("canvas","./assets/images/button.png");

}

function create() 
{
    chrismax =  this.sound.add("chrismax");
    

    let backImage = this.add.image(0, 0, 'background'); 
    backImage.setOrigin(0, 0); 
    backImage.setScale(0.5); 
    for (let i=0; i<50; i++)
    { 
        let x = Math.floor(Math.random()*611);
        let y = Math.floor(Math.random()*510);
        let starImage = this.add.image(x,y,"star");
        
        starImage.alpha = (Math.random()/2)+0.5;
    }
    
    let sapinImage = this.add.image(66,230,"sapin");
    sapinImage.setOrigin(0,0);
    sapinImage.setScale(0.5);
    let guir1Image = this.add.image(110,300,"guir1");
    guir1Image.setOrigin(0,0);
    guir1Image.setScale(0.6);
    guir1Image.on("guir1down",guirbuttondown);

    guirImage = this.add.image(110,300,"guir").setInteractive();
    guirImage.setOrigin(0,0);
    guirImage.setScale(0.6);
    
    let boul1Image = this.add.image(380,650,"boul1");
    boul1Image.setScale(0.5);

    let boul2Image = this.add.image(250,560,"boul2");
    boul2Image.setScale(0.5);

    let boul3Image = this.add.image(190,740,"boul3");
    boul3Image.setScale(0.5);
    starImage = this .add.image(100,100,"star");

    clocheIm = this.add.image(290,410,"cloche").setInteractive();
    clocheIm.setScale(0.6);
    clocheIm.on("pointerdown",musicButton);

    let cadeauIm = this.add.image(150,920,"cadeau").setInteractive();
    cadeauIm.setScale(0.4);
    cadeauIm.on("pointerdown",cadeauBouttonDown)
    
    floIm = this.add.image(390,830,"flo").setInteractive();
    floIm.setScale(0.4);
    floIm.on("pointerdown",snowflakeButtonDown);

    bougieIm = this.add.image(290,690,"bougie").setInteractive();
    bougieIm.setScale(0.6);
    bougieIm.on("pointerdown",guirbuttondown)

    gifCanvas = this.add.image(300,140,"canvas");
    gifCanvas.setScale(0.8);
    //gifCanvas.alpha = 0;
    winText =  this.add.text(300,140,"Bravo");
    //{fontFamily: "Arial",fonSize : 18, color :"#07467"};
    
    
    let tweenstarImage = this.tweens.add
    (
        { 
        targets: starImage, 
        alpha: 0, 
        duration: 2000, 
        ease: 'Linear', 
        yoyo: true, 
        loop: -1 
        }
    );
    tweenguir = this.tweens.add
    (
        { 
        targets: guirImage, 
        alpha: 0, 
        duration: 2000, 
        ease: 'Linear', 
        yoyo: true, 
        loop: -1 
        }
    );

    snowflakes = this.physics.add.group
    (
        {
            defaultKey: 'snowflake',
            maxSize: 40
        }
    );
    let timerSnowflakes = this.time.addEvent({ 
        delay: 500, 
        callback: fallingSnowflake, 
         
        callbackScope: this, 
        repeat: -1
       });

    //for (let i=0; i<20; i++)
    //{

    //    let snowflake = snowflake.get();
        
    //    snowflake.setPosition(Math.floor(Math.random()*611), -Math.floor(Math.random()*980));
        
    //    snowflake.setVelocity(0,50);
        
    //}
}

function update()
{
    snowflakes.getChildren().forEach(

        function(snowflake) {
        
        if (snowflake.y>980) snowflake.destroy();
        
        }, this);

    //starImage.alpha += inc8Linking;
    //if(starImage.alpha >= 1.0) inc8Linking = -0.01;
    //{
    //    starImage.alpha == 0.1;
    //}
    //if (starImage.alpha >= 0.0) inc8Linking = 0.01;
    //{
        
    //}
}
function fallingSnowflake()
{
    if(isSnowing)
    {
        let snowflake = snowflakes.get();
        if (snowflake)
        {
            snowflake.setPosition(Math.floor(Math.random()*611), -10);
            snowflake.setVelocity(0,50);   
        }
    }
}
function musicButton()
{
    if(chrismax.isPlaying)
    {
        chrismax.stop();
        clocheIm.alpha = 0.3;
    }
    else
    {
        chrismax.play();
        clocheIm.alpha = 1.0;
    } 
}

function snowflakeButtonDown()
{
    if(isSnowing)
    {
        isSnowing = false;
        floIm.alpha = 0.3;
    } 

    else 
    {
        isSnowing = true;
        floIm.alpha = 1.0;
    }
    
}

function guirbuttondown()
{
    if(tweenguir.isPlaying())
    {
        tweenguir.pause();
        bougieIm.alpha = 0.3;
    }
    else
    {
        tweenguir.resume()
        bougieIm.alpha = 0.1;
    }
    
}   
function cadeauBouttonDown()
{
    gifCanvas.alpha = 1;
    winText.alpha = 1;

}