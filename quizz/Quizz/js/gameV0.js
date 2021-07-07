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
let welcomIm;
let playOIm;
let quizT;
let menueT;
let restartIm;

let answersT = [];
let questionT;
let answersNum = 3;
let barreTitreIm;
let starImage = [];
let playButton;
let currentQIndexc = 0;
let score = 0;
let goodAnswerSound;
let wrongAnswerSound;
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

    this.load.image('welcom','./assets/Sprites/Windows3.png');
    this.load.image('playo','./assets/Sprites/PlayOFF.png');
    this.load.image('barre','./assets/Sprites/Label4.png');
    this.load.image('barreTitre','./assets/Sprites/Label1.png');
    this.load.json('questions', './assets/data/question.json'); 
    this.load.image('star','./assets/Sprites/Star.png');
    this.load.image('play','./assets/Sprites/Play.png');
    this.load.audio('good','./assets/Sound/good.wav');
    this.load.audio('wrong','./assets/Sound/wrong.wav');
    this.load.image('restart','./assets/Sprites/Restart.png');

}

function create()
{
    quizz = this.cache.json.get('questions'); 
    
    fondIm = this.add.image(0, 0, 'fond');
    fondIm.setOrigin(0, 0);
    fondIm.setScale(0.5);

    welcomIm = this.add.image(300, 230, 'welcom');
    welcomIm.setScale(0.8);
    quizT = this.add.text(280, 60,"Quizz",{ fontFamily: 'Georgia', fontSize : 20, color : '#c08aeb' })
    menueT = this.add.text(120, 160,"Êtres supérieurs, ces mots sont pour vous seul \nPour découvrir ce que contiennent les secrets scellés,\n il faut endurer la punition la plus sévère. ",{ fontFamily: 'Georgia', fontSize : 16, color : '#000000' })

    playOIm = this.add.image(300,290,'playo').setInteractive();
    playOIm.on("pointerdown",disGameScreen);
    playOIm.setScale(0.5);
     
    barreTitreIm =this.add.image(300, 90, 'barreTitre');
    barreTitreIm.setScale(0.8);
    barreTitreIm.setVisible(false);

    
    for(let i=0; i<answersNum; i++)
    {
        barreIm[i] = this.add.image(290, 230  +i*125, 'barre').setInteractive();
        barreIm[i].on("pointerdown",() => {check(i)});
        barreIm[i].setScale(1.3);
        barreIm[i].setVisible(false);
    }
    questionT = this.add.text(90, 70, quizz.questions[0].title,{ fontFamily: 'Georgia', fontSize : 20, color : '#c08aeb' }); 
    questionT.setVisible(false);
    for(let i=0; i<answersNum; i++) 
    {
        answersT[i] = this.add.text(150, 210 + (i*120), quizz.questions[0].answers[i], {fontFamily: "Georgia", fontSize: 17, color: "#ffffff"});
        answersT[i].setVisible(false);
    }
    for (let i=0; i<10; i++) 
    { 
        starImage[i] = this.add.image(30 + i * 60, 600, 'star'); 
        starImage[i].setScale(0.3); 
        starImage[i].alpha = 0.5; 
       
       
    }
    
    playButton = this.add.image(550,350,'play').setInteractive();
    playButton.on("pointerdown",disnextQ);
    playButton.setScale(0.5);
    playButton.setVisible(false);

    restartIm = this.add.image(300,290,'restart').setInteractive();
    restartIm.setScale(0.5);
    restartIm.on("pointerdown",disGameOver);
    restartIm.setVisible(false);

    goodAnswerSound = this.sound.add('good');
    wrongAnswerSound = this.sound.add('wrong');



    //playButton.on("pointerdown");
    //barreIm = this.add.image(300, 350, 'barre');
    //barreIm1.setScale(1.3);
    //barreIm2 = this.add.image(300, 450, 'barre');
    //barreIm2.setScale(1.3);
    //barreIm.setScale(0.5);
    
    //myText = this.add.text(140, 232, "La lumière fera place à l'obscurité.\n Nous n'entrerons plus dans cet endroit",{ fontFamily: 'Consolas', fontSize : 15, color : '#550f8f' }); 
   // myText = this.add.text(140, 342, "Aucun sacrifice n'est trop grand",{ fontFamily: 'Consolas', fontSize : 15, color : '#550f8f' }); 
    //myText = this.add.text(140, 422, "Notre Vaisseau pur a fait son ascension.\n Il ne reste au delà que le refus et \nles regrets de sa création",{ fontFamily: 'Consolas', fontSize : 15, color : '#550f8f' }); 

     
   

       
}

function update()
{

}
function check(answerIndex)
{
    
    if (answerIndex== quizz.questions[currentQIndexc].goodAnswerIndex) 
    {
        
        goodAnswerSound.play();
        starImage[currentQIndexc].alpha = 1;
        score++;
    }
    else 
    {
        
        wrongAnswerSound.play();
        starImage[currentQIndexc].tint = 0xff0000;
    }

    playButton.setVisible(true);

    for (let i=0; i<answersNum; i++)
    {
        barreIm[i].disableInteractive();
        if (i== quizz.questions[currentQIndexc].goodAnswerIndex) 
        {
            answersT[i].setColor('#00ff00');
        }
        else answersT[i].setColor("#ff0000");
    }
   
    
}
function disnextQ()
{
    currentQIndexc ++;
    if (currentQIndexc >9)
    {
        
        disGameOver();
    }
    else
    {
        questionT.text = quizz.questions[currentQIndexc].title;
        for(let i=0; i<answersNum; i++)
        {
            answersT[i].text = quizz.questions[currentQIndexc].answers[i] ;
            answersT[i].setColor("#ffffff");
        }
        playButton.setVisible(false);
    
        for (let i=0; i<answersNum; i++)
        {
            barreIm[i].setInteractive();
    
        }

    }

}

function disGameScreen()
{
    welcomIm.setVisible(false);
    quizT.setVisible(false);
    menueT.setVisible(false);
    playOIm.setVisible(false);
    barreTitreIm.setVisible(true);
    
    questionT.setVisible(true);
    for(let i=0; i<3; i++)
    {
        barreIm[i].setVisible(true);
        answersT[i].setVisible(true);

    }
}

function disGameOver()
{
    welcomIm.setVisible(true);
    quizT.setVisible(true);
    menueT.setVisible(true);
    menueT.text="vous avez un score de " +score+"/10 \n Presse le bouton pour recommencer";
    restartIm.setVisible(true);

    playButton.setVisible(false);
    questionT.setVisible(false);
    barreTitreIm.setVisible(false);
    for(let i=0; i<3; i++)
    {
        barreIm[i].setVisible(false);
        answersT[i].setVisible(false);

    }

}

