let config = {
    type: Phaser.AUTO,
    width: 611,
    height: 980,
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

function preload() {
    this.load.image('background', '/assets/images/back_2.png');
}

function create() {
    backImage = this.add.image(0, 0, 'background');
}

function update() {
    
}