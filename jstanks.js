var GS;
    
var t1 = new Tank(100,100);
	
function Dot(gs) {
    var x = gs.width * 0.5;
    var y = gs.height * 0.5;
    var r = gs.width * 0.1;

    this.update = function() {
        x += gs.width * 0.01 * (Math.random() - 0.5);
        y += gs.height * 0.01 * (Math.random() - 0.5);
    }

    this.draw = function(c) {
        c.fillRect(x - r / 2, y - r / 2, r, r);
    }
}

function startJSTanks(gs) {
	GS = gs;
	
	var map = new Map();
	gs.addEntity(map);
	
	//var t1 = new Tank(100,100);
    gs.addEntity(t1);
	
    gs.launch();
	console.log(gs);
}

function Map() {

    this.update = function() {
    }

    this.draw = function(c,gs) {
		gs.background('rgba(200,200,200,1.0)');
    }
}

function Tank(tx,ty) {
	this.x = tx;
	this.y = ty;
    
    //angle of tank
    this.angle = 0; //in radians
    
    this.speed = 0; //current moving speed
    this.accel = 0.025; //acceleration rate
    this.max_speed = 0.75; //current max speed
	
	this.turnRate = 0.025; //also depends on the framerate
    this.turnLeft = false; //turning left
    this.turnRight = false; //turning right
    
	//size of tank
	this.length = 40; 
    this.width = 30;
    

	//angle of turret
	this.turret = {};
    this.turret.angle = 0.0; //in radians

	//length of turret
    this.turret.length = this.length * 15/24;
	
	//clip of ammo
    this.clip = [];
	
	this.update = function(gs) {
		//update the angle of the turret according to where the mouse is
		this.turret.angle = Math.atan2(gs.pointerPosition[1]-this.y, gs.pointerPosition[0]-this.x);

		// update our position based on our angle and speed
		this.x = this.x + this.speed * Math.cos(this.angle);
		this.y = this.y + this.speed * Math.sin(this.angle);

		//if hitting east side
		if(this.x > gs.width-5) {
			this.x = gs.width - 5;
		}
		//if hitting west side
		if(this.x < 5) {
			this.x = 5;
		}
		//if hitting south side
		if(this.y > gs.height-5) {
			this.y = gs.height - 5;
		}
		//if hitting north side
		if(this.y < 5) {
			this.y = 5;
		}
	}
	
	this.draw = function (c,gs) {
		c.save(); //save the current draw state
		
		//set drawing area to where the tank is
		c.translate(this.x,this.y);
		
		//rotate drawing area
		c.rotate(this.angle);
				
		//set the color to the color of the body of the tank
		c.fillStyle = "rgb(255,255,255)"; //white		
		//draw rectangle (main body)
        c.fillRect(-this.length/2,-this.width/2,this.length,this.width);
		
		
		//set color to grey
		c.fillStyle = "rgb(100,100,100)"; //grey		
		//draw rectangle (front)
        c.fillRect(0,-this.width/3,this.length/2,this.width*2/3);
		
		//rotate drawing area for drawing gun
		c.rotate(-this.angle + this.turret.angle);
		
		//set to gun color
		c.fillStyle = "rgb(153,153,153)"; //grey
		
		//turret is just a line, so make it thick
		c.lineWidth = 5;
		//draw turret
		c.lineTo(0,0,this.turret.length,0);
		
		c.restore(); //restore the previous draw state

		/*
		//loop clip
		for(int i = 0; i < clip.size(); i++) {
			//get bullet
			Bullet b = (Bullet)clip.get(i);
			//if bullet is dead
			if(b.dead) {
				//remove from clip
				clip.remove(i);
			}
		}
		*/
	
	}
		
	this.keyHeld_65 = this.keyDown_65 = function () {
		this.turnLeft();
	}
	
	this.keyHeld_68 = this.keyDown_68 = function () {
		this.turnRight();
	}
	
	this.keyDown_87 = function () {
		this.speed = this.max_speed;
	}
	
    /* no acceleration right now 
	this.keyHeld_87 = function () {
		if (this.speed < this.max_speed)
			this.speed += this.accel;
	} */
    
	this.keyUp_87 = function () {
		this.speed = 0;
	}
	
	this.keyDown_32 = function () {
		// pass
	}
	
	this.keyDown = function (keyCode) {
		//console.log(keyCode);
	}
	
	this.turnLeft = function() {
		this.turn(-1);
	}
	
	this.turnRight = function() {
		this.turn(1);
	}
	
	this.turn = function(direction) {
		this.angle = (this.angle + direction * this.turnRate) % (2 * Math.PI);
	}
}