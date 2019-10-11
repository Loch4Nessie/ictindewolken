const grav = 0.5; //zwaartekracht voor springen
const xSize = 800;
const ySize = 400; //canvas
let caver; // player

let Bullet; 
let Bullets = [];
let amountOfBullets = 0;
let maxBullets = 7; //aantal ballen

let score;
let startTime; //voor score

let mainMenu = true;
let startGame = false;
let initGame = false;
let gameOver = false;
let controlMenu = false; //de aantal schermen

let noobStroke = 1000;
let easyStroke = 0;
let regularStroke = 0;
let veteranStroke = 0;
let godStroke = 0; //voor witte rand als mode aangeklikt

//let song; //heel leuk muziekje


/*function preload() {
  song = loadSound('music')
} //zorgt dat muziek aangaat */

/*function mouseReleased() {
  if (mouseX > muteButton.xPos &&
			mouseX < muteButton.xPos + muteButton.width &&
      mouseY > muteButton.yPos &&
      mouseY < muteButton.yPos + muteButton.height &&
   	  mainMenu == true){
		if (song.isPlaying()) {
  		song.pause();
  	} else {
    	song.play();
  	}
	}
} //zorgt dat je muziek uit kunt doen */

function setup() {
  createCanvas(xSize, ySize); //maakt canvas
  //song.loop(); //zorgt dat het nummer de hele tijd herhaald
}

function draw() {
  background(0, 100, ); //maakt background

  if (initGame == true) { 
    
    caver = new player();
    

    startTime = millis();//om score bij te houden 
    
    Bullets = []; //leegt array
    for (let i = 0; i < maxBullets; i++) {
      
      amountOfBullets += 1
      
    } //maakt aantal ballen aan
    
    for (let i = 0; i < maxBullets; i++) {
      x = random(50, 500);
      y = 50;
      radius = 6;
      xSpeed = random((-6, -3), (3, 6));
      ySpeed = random((-5, -4), (4, 5));
      r = random(200, 255)
      g = random(170, 20)
      b = random(0, 30)
      Bullet = new bullet(x, y, radius, xSpeed, ySpeed, r, g, b);
      Bullets.push(Bullet);
    } //maakt verschillende ballen aan
    
    
    initGame = false;
    startGame = true;
    //zorgt er voor om naar andere scene te gaan

  } //maakt de game klaar na dat je op start hebt geklikt
  else if (mainMenu == true) { 	
    
		startButton = new buttonStart();
		startButton.display();
    startButton.buttonPressed();
    
		controlButton = new buttonControl();
		controlButton.display();
    controlButton.buttonPressed();
    
		noobButton = new buttonNoob();
	  noobButton.display();
    noobButton.buttonPressed();    
    
		easyButton = new buttonEasy();
		easyButton.display();   
    easyButton.buttonPressed();
    
		regularButton = new buttonRegular();
		regularButton.display();
    regularButton.buttonPressed();    
    
		veteranButton = new buttonVeteran();	
    veteranButton.display();
    veteranButton.buttonPressed();    
    
		godButton = new buttonGod();
		godButton.display();
    godButton.buttonPressed();    
     
    muteButton = new buttonMute();
	  muteButton.display();  
    
    //maakt alle knoppen aan

    
    fill('white');
    textSize(80);
		text('DÜMPELL', 25, 125);    
    //laat titel zien
    
	} //maakt mainMenu
	else if (startGame == true){ 

      for (let i = 0; i < Bullets.length; i++) {
      	Bullet = Bullets[i];
        Bullet.display();
        Bullet.move();
				caver.gameOver();
  } //maakt ballen aan en zorgt er voor dat je af kan gaan

      caver.display();
      caver.move();
      caver.update();

    
      score = floor((millis() - startTime)*(maxBullets/10)/100);
   	  //berekent score
      
      fill(player.r, player.g, player.b) 
      textSize(30);
      text(score, 15, 30);
			//laat score zien
    
  } //laat de game beginnen
  else if (gameOver == true) {
    
    backButton = new buttonBack();
    backButton.display();
		backButton.buttonPressed();
       
    retryButton = new buttonRetry();
    retryButton.display();
    retryButton.buttonPressed();
    
    noStroke();
    fill('gray');
    textSize(130);   
    text('Game over',80 ,200 );
    //laat tekst zien
    
    textSize(30);
    text('your score was:', 265, 300);
    fill(169, 50, 38);
    text(score, 485, 300);
    //laat finalScore zien
       
  } //maakt gameOver screen
  else if (controlMenu == true) {
    
    backButton = new buttonBack();
    backButton.display();
    backButton.buttonPressed();
    
    noStroke('250');
    fill('brown');
    rect(-1, 80, 380, 60);
    fill('gray');
    rect(-1, 150, 440, 60);
    fill('brown');    
    rect(-1, 220, 500, 60);  
    fill('gray');     
    rect(-1, 290, 560, 60);    
    
    //voor de tekstbalken
    
    textSize(25);
    noStroke();
    fill('black');
    text('Press A/D to walk', 40, 120);
    text('Press W to jump', 40, 190);
    text('Press S to dash', 40, 260);
    text('Press spacebar in the air to get a jump boost', 40, 330);
    
    //voor de tekst

    
	} //maakt controlMenu
}



class player {
  constructor() {
    this.playerHeight = 40; //lengte 'player'
    this.playerWidth = 25; //breedte 'player'
    this.xPos = width / 2 - 25;
    this.yPos = height - 40;
    this.speed = 7; //snelheid 'player'
    this.onGround = false; //checkt of 'player' op de grond staat
    this.drag = 0.99;
    this.jumpForce = ySize / 150;
    this.boost = 0; //gegevens om te kunnen springen
    this.r = 150;
    this.b = 150;
    this.g = 150; //r, g, b voor kleuren
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b);
    rect(this.xPos, this.yPos, this.playerWidth, this.playerHeight);
    		//creërt 'player'
  }

  move() {   
    if (keyIsDown(65) && this.xPos > 1) {
     	  this.xPos -= this.speed;
    } //zorgt er voor dat 'player' naar links loopt met A

    if (keyIsDown(68) && this.xPos + 4 < width - this.playerWidth) {
      	this.xPos += this.speed;
    }
    //zorgt er voor dat 'player' naar rechts loopt met D

  }

  update() {
    this.jumpForce += grav;
    this.yPos += this.jumpForce;

    if (this.yPos > ySize - this.playerHeight - 1.7) {
      this.onGround = true;
      this.jumpForce = -grav;
      this.boost = 0;
    } else {
      this.onGround = false;
    } //zorgt er voor dat je niet door de grond zakt en checkt of je op de grond staat


      if (keyIsDown(87)&& this.onGround == true ) {
      this.jumpForce = -12;
    }
    //zorgt er voor dat 'player' springt met W
    
    if (keyIsDown(83) && this.onGround == false) {
      this.jumpForce = 12;
    }
		//zorgt er voor dat 'player' duikt met S
    
    if (keyIsDown(32) && this.onGround == false) { 
      
			this.r = random(0, 0);
			this.g = random(80, 220);
			this.b = random(80, 220); //voor kleurtjes
      
      if (this.boost < 1) {
      	this.jumpForce = -11;
        this.boost += 1; //voor een jumpBoost
      }
      
	} else if (keyIsDown(83) && this.onGround == false){
			this.r = random(0, 0);
			this.g = random(80, 220);
			this.b = random(80, 220); //voor kleurtjes
    
      if (this.boost < 1) {
      	this.jumpForce = 16;
        this.boost += 1;
      }
  } else {
    	this.r = (86);
      this.g = (101);
      this.b = (115); //voor kleurtjes
    }
  }

  gameOver(bullet){
    
		if (Bullet.xPos - caver.playerWidth < caver.xPos &&
        caver.xPos < Bullet.xPos + Bullet.radius &&
        Bullet.yPos - caver.playerHeight < caver.yPos &&
       	caver.yPos < Bullet.yPos + Bullet.radius) {
        	gameOver = true;
    			startGame = false;
    } 
    
  }
} //gegevens player

class bullet {
  constructor(x, y, radius, xSpeed, Clr) {
    this.xPos = x;
    this.yPos = y;
    this.radius = radius;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.r = r;
    this.g = g;
    this.b = b; //r, g, b voor kleuren
  }

  display() {
    noStroke(0);
    fill(this.r, this.g, this.b);
    ellipse(this.xPos, this.yPos, 2 * this.radius, 2 * this.radius);
  }

  move() {
    if (this.xPos > width - this.radius || this.xPos < this.radius) {
      	this.xSpeed = -this.xSpeed;
    }
    if (this.yPos > height - this.radius || this.yPos < this.radius) {
      	this.ySpeed = -this.ySpeed;
    }
   		 	this.xPos += this.xSpeed;
    	  this.yPos += this.ySpeed;
  }
} // gegevens bullets

class buttonStart {
  constructor() {
    this.xPos = 0;
    this.yPos = 175;
    this.height = 100;
    this.width = 300;
		

  }

  display() {
    stroke('brown');
    fill('brown');
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(80);
    fill('black');
    textFont('Georgia');
    text('Start', this.xPos + 80, this.yPos + 75)
  }
  
  buttonPressed(){
  	  
    if (mouseIsPressed &&
        mouseX > this.xPos &&
        mouseX < this.xPos + this.width &&
        mouseY > this.yPos &&
        mouseY < this.yPos + this.height || keyIsDown(32)) {
        	if (mouseButton == LEFT) {
         		initGame = true;
            mainMenu = false;
			}
		} //zorgt dat je naar 'innitGame' gaat
  }
} //gegevens startButton

class buttonBack {
	constructor(){
  	this.xPos = xSize - 100;
  	this.yPos = 15;
  	this.height = 40;
 	  this.width = 200;
	}

	display(){
  	noStroke();
    fill(5, 99, 150);
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(32);
    fill('black');
    text('Back', this.xPos + 3, this.yPos + 30);
	}
  
  buttonPressed(){
    
   if (mouseIsPressed &&
        mouseX > this.xPos &&
        mouseX < this.xPos + this.width &&
        mouseY > this.yPos &&
        mouseY < this.yPos + this.height) {
        	if (mouseButton == LEFT) {
        	  controlMenu = false;
            gameOver = false;
            mainMenu = true;
			}
		} //zorgt dat je naar 'controlMenu' gaat 
  }
} //gegevens backButton

class buttonControl {
	constructor(){
  	this.xPos = 0;
  	this.yPos = 300;
  	this.height = 50;
 	  this.width = 300;
	}

	display(){
  	stroke('gray');
    fill('gray');
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(25);
    fill('black');
    text('controls', this.xPos + 125, this.yPos + 35);
	}
  
  buttonPressed(){
    
   if (mouseIsPressed &&
        mouseX > this.xPos &&
        mouseX < this.xPos + this.width &&
        mouseY > this.yPos &&
        mouseY < this.yPos + this.height) {
        	if (mouseButton == LEFT) {
        	  controlMenu = true;  
            mainMenu = false;
			}
		} //zorgt dat je naar 'controlMenu' gaat 
  }
} //gegevens controlsButton

class buttonNoob {
	constructor(){
  	this.xPos = 500;
  	this.yPos = 60;
  	this.height = 50;
 	  this.width = 500;
	}

	display(){
  	stroke(noobStroke);
    fill(5, 99, 150);
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(25);
    noStroke();
    fill('black');
    text('Noob mode', this.xPos + 25, this.yPos + 35);
	}
  
  buttonPressed(){
    
		 if (mouseIsPressed &&
        mouseX > noobButton.xPos &&
        mouseX < noobButton.xPos + noobButton.width &&
        mouseY > noobButton.yPos &&
        mouseY < noobButton.yPos + noobButton.height) {
        	if (mouseButton == LEFT) {
         		maxBullets = 7;
            noobStroke = 1000;
            easyStroke = 0;
            regularStroke = 0;
            veteranStroke = 0
            godStroke = 0;            
		
         }
     }    
  }
} //gegevens noobButton

class buttonEasy {
	constructor(){
  	this.xPos = 500;
  	this.yPos = 120;
  	this.height = 50;
 	  this.width = 500;
	}

	display(){
  	stroke(easyStroke);
    fill(0, 180, 70);
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(25);
    noStroke();
    fill('black');
    text('Easy mode', this.xPos + 25, this.yPos + 35);
	}
  
  buttonPressed(){
    
     if (mouseIsPressed &&
        mouseX > easyButton.xPos &&
        mouseX < easyButton.xPos + easyButton.width &&
        mouseY > easyButton.yPos &&
        mouseY < easyButton.yPos + easyButton.height) {
        	if (mouseButton == LEFT) {
         		maxBullets = 12;
            noobStroke = 0;
            easyStroke = 1000;
            regularStroke = 0;
            veteranStroke = 0;
            godStroke = 0;             
			}
		} 
  }
} //gegevens easyButton

class buttonRegular {
	constructor(){
  	this.xPos = 500;
  	this.yPos = 180;
  	this.height = 50;
 	  this.width = 500;
	}

	display(){
  	stroke(regularStroke);
    fill(25, 216, 0);
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(25);
    noStroke();
    fill('black');
    text('Regular mode', this.xPos + 25, this.yPos + 35);
	}
    
  buttonPressed(){
    
      	 if (mouseIsPressed &&
        mouseX > regularButton.xPos &&
        mouseX < regularButton.xPos + regularButton.width &&
        mouseY > regularButton.yPos &&
        mouseY < regularButton.yPos + regularButton.height) {
        	if (mouseButton == LEFT) {
         		maxBullets = 17;
            noobStroke = 0;
            easyStroke = 0;
            regularStroke = 1000;
            veteranStroke = 0;
            godStroke = 0;             
          }
      }
  }
} //gegevens regularButton

class buttonVeteran {
	constructor(){
  	this.xPos = 500;
  	this.yPos = 240;
  	this.height = 50;
 	  this.width = 500;
	}

	display(){
  	stroke(veteranStroke);
    fill(230, 125, 0);
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(25);
    noStroke();
    fill('black');
    text('Veteran mode', this.xPos + 25, this.yPos + 35);
	}
    
  buttonPressed(){
    
    if (mouseIsPressed &&
        mouseX > veteranButton.xPos &&
        mouseX < veteranButton.xPos + veteranButton.width &&
        mouseY > veteranButton.yPos &&
        mouseY < veteranButton.yPos + veteranButton.height) {
        	if (mouseButton == LEFT) {
         		maxBullets = 21;
            noobStroke = 0;
            easyStroke = 0;
            regularStroke = 0;
            veteranStroke = 1000;
            godStroke = 0;             
			}
		}  
  }
} //gegevens veteranButton

class buttonGod {
	constructor(){
  	this.xPos = 500;
  	this.yPos = 300;
  	this.height = 50;
 	  this.width = 500;
	}

	display(){
  	stroke(godStroke);
    fill(218, 0, 0);
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(25);
    noStroke()
    fill('black');
    text('God mode', this.xPos + 25, this.yPos + 35);
	}
    
  buttonPressed(){
    
    if (mouseIsPressed &&
        mouseX > godButton.xPos &&
        mouseX < godButton.xPos + godButton.width &&
        mouseY > godButton.yPos &&
        mouseY < godButton.yPos + godButton.height) {
        	if (mouseButton == LEFT) {
         		maxBullets = 25;
            noobStroke = 0;
            easyStroke = 0;
            regularStroke = 0;
            veteranStroke = 0
            godStroke = 1000;             
			} 
		}
  }
} //gegevens godButton

class buttonMute {
	constructor(){
  	this.xPos = 735;
  	this.yPos = 360;
  	this.height = 30;
 	  this.width = 500;
	}

	display(){
  	noStroke();
    fill(200, 100, 100);
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(20);
    noStroke()
    fill('black');
    text('mute', this.xPos + 10, this.yPos + 21);
	}
} //gegevens muteButton

class buttonRetry {
	constructor(){
  	this.xPos = -100;
  	this.yPos = 15;
  	this.height = 40;
 	  this.width = 200;
	}

	display(){
  	noStroke(46, 134, 193);
    fill(5, 99, 150);
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(32);
    fill('black');
    text('Retry', this.xPos + 115, this.yPos + 30);
	}
    
  buttonPressed(){
    
         if (mouseIsPressed &&
        mouseX > this.xPos &&
        mouseX < this.xPos + this.width &&
        mouseY > this.yPos &&
        mouseY < this.yPos + this.height || keyIsDown(13)) {
        	if (mouseButton == LEFT) {
         		  gameOver = false;
              initGame = true;      
			}
		}   //zorgt dat je naar 'innitGame' gaat
  }
} //gegevens retryButton
