x = 1;

function setup() {
    canvas = createCanvas(500, 500);
    canvas.parent("canvas-holder");
    
}

function draw() {
    background(235);
    circle(x, 250, 20);
    x += 1;
}

class Player {
    constructor(x, y) {
    }
}