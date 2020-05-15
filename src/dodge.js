/*jshint esversion: 6 */

function setup() {
    canvas = createCanvas(500, 500);
    canvas.parent("canvas-holder");
    noStroke();

    player = new Player(width/2, height/2, 20);
    
}

function draw() {
    background(235);
    player.character();
    player.move();
}

class Player {
    constructor(xPos, yPos, diameter) {
        this.xSpeed = 3;
        this.ySpeed = 3;
        this.xPos = xPos;
        this.yPos = yPos;
        this.diameter = diameter;
        this.color = (0, 0, 0);
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

}