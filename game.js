var sprites = {
  ironyman: { sx: 0, sy: 0, w: 100, h: 140, frames: 1 },
  missile: { sx: 5, sy: 150, w: 25, h: 25, frames: 1 },
  enemy_yellow: { sx: 100, sy: 0, w: 100, h: 140, frames: 1 },
  enemy_camo: { sx: 200, sy: 0, w: 100, h: 150, frames: 1 },
  enemy_red: { sx: 300, sy: 0, w: 100, h: 150, frames: 1 },
  explosion: { sx: 0, sy: 250, w: 50, h: 60, frames: 1 },
  enemy_missile: { sx: 40, sy: 145, w: 30, h: 25, frames: 1 },
  
  player_health1: { sx: 0, sy: 335, w: 60, h: 20, frames: 1 },
  player_health2: { sx: 70, sy: 335, w: 60, h: 20, frames: 1 },
  player_health3: { sx: 140, sy: 335, w: 60, h: 20, frames: 1 },
  player_health4: { sx: 210, sy: 335, w: 60, h: 20, frames: 1 },
  player_health5: { sx: 290, sy: 335, w: 60, h: 20, frames: 1 }
  
  
};

var enemies = {
  straight: {x: 0, y: -50, sprite: 'enemy_camo',health: 10,E: 100, firePercentage: 0.001},
  ltr: {x: 0, y: -100, sprite: 'enemy_red',health: 10,B: 75, C:1, E: 100, missiles: 2},
  wiggle:   { x: 100, y: -50, sprite: 'enemy_yellow', health: 20, B: 50, C: 4, E: 100, firePercentage: 0.001, missiles: 2 },  
  step:    {x: 0, y: -50, sprite: 'enemy_yellow', health: 10,B: 150, C: 1.2, E: 75 }
};


var OBJECT_PLAYER = 1,
    OBJECT_PLAYER_PROJECTILE = 2,
    OBJECT_ENEMY = 4,
    OBJECT_ENEMY_PROJECTILE = 8;

var gameLevel;

var level1 = [
    [ 0,     4000,     500,      'ltr' ],
    [ 6000,  13000,    800,      'step' ],
	[ 12000,  16000,   400,      'straight', {x:100} ],
	[ 22000,  25000,   400,      'wiggle', {x:100} ]
];


var level2 = [
    [ 0,     4000,     500,      'ltr' ],
    [ 6000,  13000,    800,      'step' ],
	[ 12000,  16000,   400,      'straight', {x:150} ],
	[ 18200,  20000,   500,      'straight', {x:100} ],	
	[ 22000,  25000,   400,      'wiggle', {x:300} ]
];

var level3 = [
    [ 0,     4000,     500,      'ltr' ],
    [ 6000,  13000,    800,      'step' ],
	[ 12000,  16000,   400,      'straight', {x:150} ],
	[ 18200,  20000,   500,      'straight', {x:100} ],	
	[ 22000,  25000,   400,      'wiggle', {x:300} ]
];

var level4 = [
    [ 0,     4000,     500,      'ltr' ],
    [ 6000,  13000,    800,      'step' ],
	[ 12000,  16000,   400,      'straight', {x:150} ],
	[ 18200,  20000,   500,      'straight', {x:100} ],	
	[ 22000,  25000,   400,      'wiggle', {x:300} ]
];

var intro = document.getElementById("intro");
var alarm = document.getElementById("alarm");
var soundBackground1 = document.getElementById("soundbackground1");
var soundBackground2 = document.getElementById("soundbackground2");
var soundBackground3 = document.getElementById("soundbackground3");
var victory = document.getElementById("victory");
var lost = document.getElementById("lost");




var winGame = function(obj) {
//	alert('wingame');
//	TitleScreenLose();
	Game.setBoard(1,new TitleScreenWin());		
};

var loseGame = function(obj) {
//	var board = obj.board;
//	board.add();
	Game.setBoard(1,new TitleScreenLose());		
};


window.addEventListener("load", function() {
  Game.initialize("game",sprites,startGame);
});

var playGame = function(levelId) {
//  Game.setBoard(0,new movingSky(100,0.4));
//  Game.setBoard(1,new ironyMan());

//	Game.setBoard(0,new movingSky(100,0.4));	
//	var levelStr = 'level' + levelId;
//	var setlevel = JSON.parse(levelStr);
	intro.pause();
	intro.currentTime = 0;
//	soundBackground1.play();
	soundBackground2.play();
//	soundBackground3.play();
  
    var board = new GameBoard();
	board.add(new ironyMan());
	
	board.add(new Level(levelId,winGame));
	Game.setBoard(1,board);	
	Game.setBoard(2,new TouchControls());
	Game.setBoard(3,new GamePoints(0));	
	Game.setBoard(4,new PlayerHealth(1));	
};

var startGame = function(){
	Game.setBoard(0,new splashScreen());
//	playGame();
//  Game.setBoard(1,new movingSky());
}


/*
var ironyMan = function(){
  this.w = SpriteSheet.map['ironyman'].w;
  this.h = SpriteSheet.map['ironyman'].h;
  this.x = Game.width/2 - this.w/2;
  this.y = Game.height - 10 - this.h;
  this.vx = 0;
  this.reloadTime = 0.25;  // Quarter second reload
  this.reload = this.reloadTime;
  this.maxVel = 200;

  this.step = function(dt) {
    if(Game.keys['left']){
      this.vx = -this.maxVel;
    }
    else if(Game.keys['right']){
      this.vx = this.maxVel;
    }
    else {
      this.vx = 0;
    }
    this.x += this.vx*dt;

    if(this.x < 0) {this.x = 0;}
    else if(this.x > Game.width - this.w){
      this.x = Game.width - this.w;
    }

	this.reload-=dt;
     if(Game.keys['fire'] && this.reload < 0) {
       Game.keys['fire'] = false;
       this.reload = this.reloadTime;

       this.board.add(new ironymanMissile(this.x,this.y+this.h/2));
       this.board.add(new ironymanMissile(this.x+this.w,this.y+this.h/2));
     }

  }

  this.draw = function(ctx){
    SpriteSheet.draw(ctx,'ironyman',this.x,this.y,0);
  }
};
*/

var ironyMan = function() {
  this.setup('ironyman', { vx: 0, reloadTime: 0.25, maxVel: 200 });

  this.reload = this.reloadTime;
  this.x = Game.width/2 - this.w / 2;
  this.y = Game.height - 10 - this.h;
  this.health = 100;

  this.step = function(dt) {
    if(Game.keys['left']) { 
    	this.vx = -this.maxVel; }
    else if(Game.keys['right']) { 
    	this.vx = this.maxVel; }
    else { this.vx = 0; }

    this.x += this.vx * dt;

    if(this.x < 0) { this.x = 0; }
    else if(this.x > Game.width - this.w) {
      this.x = Game.width - this.w;
    }

    this.reload-=dt;
    if(Game.keys['fire'] && this.reload < 0) {
      Game.keys['fire'] = false;
      this.reload = this.reloadTime;

      this.board.add(new ironymanMissile(this.x,this.y+this.h/2));
      this.board.add(new ironymanMissile(this.x+this.w,this.y+this.h/2));
    }
  };
};

ironyMan.prototype = new Sprite();
ironyMan.prototype.type = OBJECT_PLAYER;

ironyMan.prototype.hit = function(damage,type) {
	navigator.vibrate(100);
	if(type == OBJECT_ENEMY) {
		soundBackground2.pause();
		soundBackground2.currentTime = 0;
		alarm.pause();
		alarm.currentTime = 0;
		Game.setBoard(4,new PlayerHealth(5));
		this.board.add(new Explosion(this.x + this.w/2,(this.y + this.h/2)-30));

		if(this.board.remove(this)) {
				this.board.add(new Explosion(this.x + this.w/2,this.y + this.h/2));
				loseGame(this);
		}
	} else if (type == OBJECT_ENEMY_PROJECTILE) {
		this.board.add(new Explosion(this.x + this.w/2,this.y + this.h/2));
		this.health -= damage;

		
		if(this.health >=80 && this.health <= 100){
//			this.board.add(new PlayerHealth(2));
			Game.setBoard(4,new PlayerHealth(2));
		} else if(this.health >= 60 && this.health <= 80){
//			this.board.add(new PlayerHealth(3));
			Game.setBoard(4,new PlayerHealth(3));
		}else if(this.health >= 20 && this.health <= 50){
//			this.board.add(new PlayerHealth(4));
			Game.setBoard(4,new PlayerHealth(4));
//			soundBackground2.pause();
//			alarm.play();
		} else if(this.health <= 20){		
			Game.setBoard(4,new PlayerHealth(5));
			soundBackground2.pause();
			soundBackground2.currentTime = 0;
			alarm.play();
		} else if(this.health <=5) {
			alarm.pause();
			alarm.currentTime = 0;
			if(this.board.remove(this)) {
				this.board.add(new Explosion(this.x + this.w/2,this.y + this.h/2));
				loseGame(this);
			}
		}

	}

};

var ironymanMissile = function(x,y) {
  this.setup('missile',{ vy: -700, damage: 10 });
  this.x = x - this.w/2;
  this.y = y - this.h;
};

ironymanMissile.prototype = new Sprite();
ironymanMissile.prototype.type = OBJECT_PLAYER_PROJECTILE;

ironymanMissile.prototype.step = function(dt)  {
  this.y += this.vy * dt;
  var collision = this.board.collide(this,OBJECT_ENEMY);
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.y < -this.h) {
      this.board.remove(this);
  }
};


var Enemy = function(blueprint,override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
};

Enemy.prototype = new Sprite();
Enemy.prototype.type = OBJECT_ENEMY;

Enemy.prototype.baseParameters = { A: 0, B: 0, C: 0, D: 0,
                                   E: 0, F: 0, G: 0, H: 0,
                                   t: 0, firePercentage: 0.01, reloadTime: 0.75, reload: 0 };

Enemy.prototype.step = function(dt) {
  this.t += dt;

  this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
  this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);

  this.x += this.vx * dt;
  this.y += this.vy * dt;

  var collision = this.board.collide(this,OBJECT_PLAYER);
  if(collision) {
    collision.hit(this.damage,OBJECT_ENEMY);
    this.board.remove(this);
  }

  if(this.reload <= 0 && Math.random() < (this.firePercentage || 0.01) ) {
    this.reload = this.reloadTime;
    if(this.missiles == 2) {
      this.board.add(new EnemyMissile(this.x+this.w-2,this.y+this.h/2));
      this.board.add(new EnemyMissile(this.x+2,this.y+this.h/2));
    } else {
      this.board.add(new EnemyMissile(this.x+this.w/2,this.y+this.h));
    }

  }
  this.reload-=dt;

  if(this.y > Game.height ||
     this.x < -this.w ||
     this.x > Game.width) {
       this.board.remove(this);
  }
};

Enemy.prototype.hit = function(damage) {
  this.health -= damage;
  if(this.health <=0) {
    if(this.board.remove(this)) {
      Game.points += this.points || 100;
      this.board.add(new Explosion(this.x + this.w/2, 
                                   this.y + this.h/2));
    }
  }
};


/* Enemy missile code */
var EnemyMissile = function(x,y) {
	this.setup('enemy_missile',{vy: 200, damage: 10});
	this.x = x - this.w/2;
	this.y = y;
};

EnemyMissile.prototype = new Sprite();
EnemyMissile.prototype.type = OBJECT_ENEMY_PROJECTILE;

EnemyMissile.prototype.step = function(dt) {
	this.y += this.vy * dt;
	var collision = this.board.collide(this,OBJECT_PLAYER);
	if(collision) {
		collision.hit(this.damage,OBJECT_ENEMY_PROJECTILE);
		this.board.remove(this);
	}else if(this.y > Game.height) {
		this.board.remove(this);
	}	
};



var PlayerHealth = function(stage) {
	switch(stage){
		case 1: 
			this.setup('player_health1');
			break;
		case 2: 
		this.setup('player_health2');
			break;
		case 3: 
		this.setup('player_health3');
			break;	
		case 4: 
		this.setup('player_health4');
			break;				
		case 5:
		this.setup('player_health5');
			break;		
	}
	this.x = Game.width - 65;
	this.y = 5;	
};

PlayerHealth.prototype = new Sprite();
PlayerHealth.prototype.step = function(dt) {

};


/* Explosion Code */
var Explosion = function(centerX, centerY) {
  this.setup('explosion', {frame: 0});
  this.x = centerX - this.w/2;
  this.y = centerY - this.h/2;
};

Explosion.prototype = new Sprite();

Explosion.prototype.step = function(dt) {
  this.frame++;
  if(this.frame >= 1) {
    this.board.remove(this);
  }
}

var splashScreen = function(){
  var timeOut = 0;
  var img = new Image();
  img.onload = function() {
    Game.ctx.drawImage(img,0,0,Game.width,Game.height,0,0,Game.width,Game.height);
  };
  img.src = "images/splashscreen.png";

  this.step = function(dt){
     timeOut += dt*1000;
//     if(timeOut >= 2000) {
     intro.play();
     if(timeOut >= 2000) {
//		Game.setBoard(0,new movingSky(100,0.4));
//		gameLevel = level1;
//      playGame(level1);
		Game.setBoard(0,new introScreen());
     }
  };

  this.draw = function(ctx){

  }
};


var introScreen = function(){
  var timeOut = 0;
  var img = new Image();
  img.onload = function() {
    Game.ctx.drawImage(img,0,0,Game.width,Game.height,0,0,Game.width,Game.height);
  };
  img.src = "images/intro.png";

  this.step = function(dt){
     timeOut += dt*1000;
     if(timeOut >= 8000) {
		Game.setBoard(0,new movingSky(100,0.4));
		gameLevel = level1;
         playGame(level1);
     }
  };

  this.draw = function(ctx){

  }
};


var movingSky = function(speed,opacity){
  var offset = 0;
  var sky = document.createElement("canvas");
  sky.width = Game.width;
  sky.height = Game.height;
  var skyCtx = sky.getContext("2d");
  var img = document.createElement("img");
  img.onload = function() {
    skyCtx.drawImage(img,0,0);
  }
  img.src = "images/starfield.png";

  this.step = function(dt) {
    offset += dt * speed;
    offset = offset % sky.height;
  }

  this.draw = function(ctx){
    var intOffset = Math.floor(offset);
    var remaining = sky.height - intOffset;

    if(intOffset > 0) {
      ctx.drawImage(sky,
                0, remaining,
                sky.width, intOffset,
                0, 0,
                sky.width, intOffset);
    }

    if(remaining > 0) {   
      ctx.drawImage(sky,
              0, 0,
              sky.width, remaining,
              0, intOffset,
              sky.width, remaining);
    }
  };
};

var TitleScreenWin = function TitleScreenWin(id,callback) {
	soundBackground2.pause();
	alarm.pause();
	victory.play();
	
	var timeOut = 0;
	var img = new Image();
	img.onload = function() {
		Game.ctx.drawImage(img,0,0,Game.width,Game.height,0,0,Game.width,Game.height);
	};
	img.src = "images/battlewon.png";	
		
	this.step = function(dt){
		timeOut += dt*100;
		if(timeOut >= 600) {
		victory.pause();
         switch(gameLevel) {
			case level1 :{
				playGame(level2);
			}
			case "level2" :{
			}
		}
     }		
	};
  
	this.draw = function(ctx) {
		Game.ctx.drawImage(img,0,0,Game.width,Game.height,0,0,Game.width,Game.height);

	};	
};


/*
var TitleScreenLose = function () {

	var img = new Image();
	img.onload = function() {
		Game.ctx.drawImage(img,0,0,200,300,50,100,220,300);
	};
	img.src = "images/splash.png";
	
  this.step = function(dt){

  };

  this.draw = function(ctx) {
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
	ctx.globalAlpha = 0.9;
    ctx.font = "bold 40px bangers";
    ctx.fillText("LOSER",Game.width/2,Game.height/2);

    ctx.font = "bold 20px bangers";
    ctx.fillText(subtitle,Game.width/2,Game.height/2 + 40);
  };
};

*/


var TitleScreenLose = function () {
	soundBackground2.pause();
	alarm.pause();
	lost.play();
	
	var timeOut = 0;
	var img = new Image();
	img.onload = function() {
		Game.ctx.drawImage(img,0,0,Game.width,Game.height,0,0,Game.width,Game.height);
	};
	img.src = "images/battlelost.png";


	this.drawSquare = function(ctx,x,y) {
//	ctx.globalAlpha = on ? 0.9 : 0.6;
    ctx.fillStyle =  "#CCC";
    ctx.fillRect(x,y,50,50);
  };
/*	
  this.step = function(dt){
  };
  
  this.draw = function(ctx) {
    ctx.save();
    this.drawSquare(ctx,10,100);
    this.drawSquare(ctx,100,100);
    ctx.restore();
  };
*/

	this.step = function(dt){
		timeOut += dt*100;
		if(timeOut >= 600) {
		lost.pause();
		lost.currentTime = 0;
         playGame(gameLevel);
     }
		
	};
  
	this.draw = function(ctx) {
		Game.ctx.drawImage(img,0,0,Game.width,Game.height,0,0,Game.width,Game.height);

	};
	
	
  this.trackTouch = function(e) {
    var touch, x;
	var unitWidth = Game.width/5;
    e.preventDefault();
    for(var i=0;i<e.targetTouches.length;i++) {
      touch = e.targetTouches[i];
      x = touch.pageX / Game.canvasMultiplier - Game.canvas.offsetLeft;
      if(x < unitWidth) {

      } 
      if(x > unitWidth && x < 2*unitWidth) {

      } 
    }

    if(e.type == 'touchstart' || e.type == 'touchend') {
      for(i=0;i<e.changedTouches.length;i++) {
        touch = e.changedTouches[i];
        x = touch.pageX / Game.canvasMultiplier - Game.canvas.offsetLeft;
        if(x > 4 * unitWidth) {
        }
      }
    }
  };

  Game.canvas.addEventListener('touchstart',this.trackTouch,true);
  Game.canvas.addEventListener('touchmove',this.trackTouch,true);
  Game.canvas.addEventListener('touchend',this.trackTouch,true);
};


