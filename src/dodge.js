/*jshint esversion: 7 */

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
    this.radius = this.diameter * 0.5;
    this.color = (0);
  }

  move() {
    if(keyIsDown(68)){
      this.xPos += this.xSpeed;
    }
    if(keyIsDown(65)){
      this.xPos -= this.xSpeed; 
    }
    if(keyIsDown(87)){
      this.yPos -= this.ySpeed;
    }
    if(keyIsDown(83)){
      this.yPos += this.ySpeed; 
    }
  }

  character() {
    let c = color(0, 0, 0);
    fill(c);
    circle(this.xPos, this.yPos, this.diameter);   

  }

  checkXY(){
    if (this.xPos - this.radius <= 0){ 
      this.xPos += this.xSpeed;
    }
    if (this.xPos + this.radius >= canvasX){
      this.xPos -= this.xSpeed;
    }
    if (this.yPos - this.radius <= 0){
      this.yPos += this.ySpeed;
    }
    if (this.yPos + this.radius >= canvasY){
      this.yPos -= this.ySpeed;
    }
  }
}

class Enemy {
  constructor(radius, speed, projectileType) {
    this.radius = radius;
    this.speed = speed;
    this.projectileType = projectileType;
    this.x1 = 0;
  }

  linear() {
    this.y1 = random(0, canvasY);
    this.x2 = canvasX;
    this.y2 = random(0, canvasY);
    this.slope = (this.y2 - this.y1) / (this.x2 - this.x1);
    this.intersection = this.y1;
  }

  quadratic () {
    this.y1 = random(1, canvasY);
    this.x2 = canvasX;
    this.y2 = random(1, canvasY);
    this.x3 = canvasX / 2;
    this.y3 = random(1, canvasY);

    this.quadraticA = (((this.x2 - this.x1) * (this.x3 ** 2) + (-(this.x2 ** 2) + (this.x1 ** 2)) * this.x3 + this.x1 * (this.x2 ** 2) - (this.x1 ** 2) * this.x2) ** -1) * 
    ((this.x2 - this.x1) * this.y3 + (-this.x3 + this.x1) * this.y2 + (this.x3 - this.x2) * this.y1);

    this.quadraticB = -(((this.x2 - this.x1) * (this.x3 ** 2) + (-(this.x2 ** 2) + (this.x1 ** 2)) * this.x3 + this.x1 * 
    (this.x2 ** 2) - (this.x1 ** 2) * this.x2) ** -1) * (((this.x2 ** 2) - (this.x1 ** 2)) * this.y3 + 
    (-(this.x3 ** 2) + (this.x1 ** 2)) * this.y2 + ((this.x3 ** 2) - (this.x2 ** 2)) * this.y1);

    this.quadraticC = (((this.x2 - this.x1) * (this.x3 ** 2) + (-(this.x2 ** 2) + (this.x1 ** 2)) * this.x3 + this.x1 * 
    (this.x2 ** 2) - (this.x1 ** 2) * this.x2) ** -1) * ((this.x1 * (this.x2 ** 2) - (this.x1 ** 2) * this.x2) * this.y3 + (
    -this.x1 * (this.x3 ** 2) + (this.x1 ** 2) * this.x3) * this.y2 + (this.x2 * (this.x3 ** 2) - (this.x2 ** 2) * this.x3) * this.y1);
    
    return this.quadraticA, this.quadraticB, this.quadraticC;
  }

  projectile(){
    let c = color(0, 0, 55);
    fill(c);
    circle(this.x, this.yPos, this.diameter);
  }

}