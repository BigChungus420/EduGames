/*jshint esversion: 6 */

var canvasX = 900;
var canvasY = 510;

function setup() {
    canvas = createCanvas(canvasX, canvasY);
    canvas.parent("canvas-holder");
    noStroke();

    player = new Player(width/2, height/2, 20);
    
}

function draw() {
    background(83, 21, 22);
    player.character();
    player.move();
    player.checkXY();
}

class Player {
    constructor(xPos, yPos, diameter) {
        this.xSpeed = 3;
        this.ySpeed = 3;
        this.xPos = xPos;
        this.yPos = yPos;
        this.diameter = diameter;
        this.radius = this.diameter * 0,5;
        this.color = (0);
    }

    move() {
        if(keyIsDown(RIGHT_ARROW)){
            this.xPos += this.xSpeed;
           }
         
           if(keyIsDown(LEFT_ARROW)){
             this.xPos -= this.xSpeed; 
           }
        if(keyIsDown(UP_ARROW)){
            this.yPos -= this.ySpeed;
           }
         
           if(keyIsDown(DOWN_ARROW)){
             this.yPos += this.ySpeed; 
           }
    }

    character() {
        let c = color(0, 0, 0);
        fill(c);
        circle(this.xPos, this.yPos, this.diameter);   
        
    }
  
  checkXY(){
    if (this.xPos - this.radius <= 0)
      this.xPos += this.xSpeed
    if (this.xPos + this.radius >= canvasX)
      this.xPos -= this.xSpeed
    if (this.yPos - this.radius <= 0)
      this.yPos += this.ySpeed
    if (this.yPos + this.radius >= canvasY)
      this.yPos -= this.ySpeed
    
  }
}
