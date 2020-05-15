function setup() {
    canvas = createCanvas(500, 500);
    canvas.parent("canvas-holder");
    noStroke();

    player = new Player(0, height/2, 20);
    
}

function draw() {
    background(235);
    player.move();
    player.character();
}

class Player {
    constructor(xPos, yPos, radius) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.color = (0, 0, 0);
        this.xSpeed = 5;
        this.ySpeed = 0;
        
    }

    move() {
        this.xPos += this.xSpeed;
        this.yPos += this.ySpeed;
    }
    character() {
        circle(this.xPos, this.yPos, this.radius, (0, 0, 0));
        circle();
    }
}