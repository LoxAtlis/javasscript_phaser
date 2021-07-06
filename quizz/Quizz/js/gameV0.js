let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 640,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    autoCenter: true
};

let game = new Phaser.Game(config);
let barreIm = [];
let fondIm;
let answersT = [];
let questionT;
let answersNum = 3;
let barreTitreIm;
let starImage = [];

let quizz ;//= JSON.parse(quizzString);
let quizzString ;//= " { } "
/*let quizz = 
{ "questions":
    [
     { "Comment se nomment les 3 frères d aiguillon ?",
      "answer": 
        [
            "Cloth, Quirrel et Tuk",
            "Sheo, Tiso et Miro",
            "Oro, Mato et Sheo"
        ],
            "goodAnswerIndex" : 2 
     },
     {"title": "Quel boss n est pas tué à la fin de son combat ?",
     "answer": 
        [
            "Défenseur Bousier",
            "Chevalier de la Ruche",
            "Maître de l Âme"
        ],
            "goodAnswerIndex" : 0
     }
    ]
};
*/



function preload()
{
    this.load.image('fond','./assets/Sprites/background.png');
    this.load.image('barre','./assets/Sprites/Label4.png');
    this.load.image('barreTitre','./assets/Sprites/Label1.png');
    this.load.json('questions', './assets/data/question.json'); 
    this.load.image('star','./assets/Sprites/Star.png');

}

function create()
{
    quizz = this.cache.json.get('questions'); 
    
    fondIm = this.add.image(0, 0, 'fond');
    fondIm.setOrigin(0, 0);
    fondIm.setScale(0.5);

    barreTitreIm =this.add.image(300, 90, 'barreTitre');
    barreTitreIm.setScale(0.8);

    barreIm = this.add.image;

    for(let i=0; i<answersNum; i++)
    {
        barreIm[i] = this.add.image(290, 230  +i*125, 'barre').setInteractive();
        barreIm[i].on("pointerdown",() => {check(i)});
        barreIm[i].setScale(1.3);
    }
    questionT = this.add.text(90, 70, quizz.questions[0].title,{ fontFamily: 'Georgia', fontSize : 20, color : '#c08aeb' }); 
    for(let i=0; i<answersNum; i++) 
    {
        answersT[i] = this.add.text(150, 210 + (i*120), quizz.questions[0].answers[i], {fontFamily: "Georgia", fontSize: 17, color: "#ffffff"});
    }
    //barreIm = this.add.image(300, 350, 'barre');
    //barreIm1.setScale(1.3);
    //barreIm2 = this.add.image(300, 450, 'barre');
    //barreIm2.setScale(1.3);
    //barreIm.setScale(0.5);
    
    //myText = this.add.text(140, 232, "La lumière fera place à l'obscurité.\n Nous n'entrerons plus dans cet endroit",{ fontFamily: 'Consolas', fontSize : 15, color : '#550f8f' }); 
   // myText = this.add.text(140, 342, "Aucun sacrifice n'est trop grand",{ fontFamily: 'Consolas', fontSize : 15, color : '#550f8f' }); 
    //myText = this.add.text(140, 422, "Notre Vaisseau pur a fait son ascension.\n Il ne reste au delà que le refus et \nles regrets de sa création",{ fontFamily: 'Consolas', fontSize : 15, color : '#550f8f' }); 

     
    for (let id = 0; id < 10; id++)
    { 
        starImage[id] = this.add.image(30 + i * 60, 600, 'star'); 
        starImage[id].setScale(0.3); 
        starImage[id].alpha = 0.3; 
        starImage[id].setVisible(false); 
    }

       
}

function update()
{

}
function check(answerIndex)
{
    
    if (answerIndex== quizz.questions[0].goodAnswerIndex) alert("OK");
    else alert("faux");
    
}





