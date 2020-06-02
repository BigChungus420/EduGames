/*jshint esversion: 7 */

var player;

//  Skaber en klasse for spilleren
class Player {
  constructor(xPos, yPos, diameter) {
    this.xSpeed = 3;
    this.ySpeed = 3;
    this.xPos = xPos;
    this.yPos = yPos;
    this.diameter = diameter;
    this.radius = this.diameter * 0.5;
    this.color = (0);

    // Giver spilleren et antal liv
    this.playerLife = 3;
  }

  //  Bevæger spilleren når forskellige knapper trykkes ned
  move() {
    if (keyIsDown(68)) {
      this.xPos += this.xSpeed;
    }
    if (keyIsDown(65)) {
      this.xPos -= this.xSpeed;
    }
    if (keyIsDown(87)) {
      this.yPos -= this.ySpeed;
    }
    if (keyIsDown(83)) {
      this.yPos += this.ySpeed;
    }
  }

  // Tegner spilleren
  display() {
    let c = color(0, 0, 0);
    fill(c);
    circle(this.xPos, this.yPos, this.diameter);
  }

  // Checker om spilleren bevæger sig uden for skærmen
  checkXY() {
    if (this.xPos - this.radius <= 0) {
      this.xPos += this.xSpeed;
    }
    if (this.xPos + this.radius >= width) {
      this.xPos -= this.xSpeed;
    }
    if (this.yPos - this.radius <= 0) {
      this.yPos += this.ySpeed;
    }
    if (this.yPos + this.radius >= height) {
      this.yPos -= this.ySpeed;
    }
  }

  // Tjekker om spilleren rammer en fjende
  isColliding(enemy) {
    let distancePlayerEnemy = dist(this.xPos, this.yPos, enemy.x, enemy.y);

    if (distancePlayerEnemy < this.radius + enemy.radius && enemy.hasCollided == false) {
      enemy.hasCollided = true;
      return true;
    }

    return false;
  }
}

// Opretter funktion for  beregning af forskellige typer projektilers koefficienter
function getFunction(projectileType) {

  // Beregning af koefficienter til linær funktion
  if (projectileType == 1) {
    x1 = 0;
    y1 = random(0, height);
    x2 = width;
    y2 = random(0, height);
    slope = (y2 - y1) / (x2 - x1);
    intersection = y1;

    return [slope, intersection];
  }

  // Beregning af koefficienter til andendgradsfunktion
  if (projectileType == 2) {
    x1 = 0;
    y1 = random(0, height);
    x2 = width / 2;
    y2 = random(0, height);
    x3 = width;
    y3 = random(0, height);

    quadraticA = (((x2 - x1) * (x3 ** 2) + (-(x2 ** 2) + (x1 ** 2)) * x3 + x1 * (x2 ** 2) - (x1 ** 2) * x2) ** -1) * ((x2 - x1) * y3 + (-x3 + x1) * y2 + (x3 - x2) * y1);
    quadraticB = -(((x2 - x1) * (x3 ** 2) + (-(x2 ** 2) + (x1 ** 2)) * x3 + x1 * (x2 ** 2) - (x1 ** 2) * x2) ** -1) * (((x2 ** 2) - (x1 ** 2)) * y3 + (-(x3 ** 2) + (x1 ** 2)) * y2 + ((x3 ** 2) - (x2 ** 2)) * y1);
    quadraticC = (((x2 - x1) * (x3 ** 2) + (-(x2 ** 2) + (x1 ** 2)) * x3 + x1 * (x2 ** 2) - (x1 ** 2) * x2) ** -1) * ((x1 * (x2 ** 2) - (x1 ** 2) * x2) * y3 + (-x1 * (x3 ** 2) + (x1 ** 2) * x3) * y2 + (x2 * (x3 ** 2) - (x2 ** 2) * x3) * y1);

    return [quadraticA, quadraticB, quadraticC];
  }

  // Beregning af koefficienter til trigonometrisk funktion
  if (projectileType == 3) {
    this.a = random(80, height / 2);
    this.b = random(0.001, 0.005);
    this.c = random(0, TWO_PI);
    this.d = height / 2 + random(-40, 40);

    return [a, b, c, d];
  }
}

// Beregner forskellige projektilers baner
function getY(x, projectileType, mathFunction) {
  // Beregner banen for projektiler, der bevæger sig som en linær funktion
  if (projectileType == 1) {
    return (mathFunction[0] * x + mathFunction[1]);
  }
  // Beregner banen for projektiler, der bevæger sig som en andengradsfunktion
  if (projectileType == 2) {
    return (mathFunction[0] * (x ** 2) + mathFunction[1] * x + mathFunction[2]);
  }
  // Beregner banen for projektiler, der bevæger sig som en trigonometrisk funktion
  if (projectileType == 3) {
    return (mathFunction[0] * sin(mathFunction[1] * x * mathFunction[2]) + mathFunction[3]);
  }
}

// Skaber en klasse for fjenderne
class Enemy {
  constructor(diameter, speed, projectileType) {
    this.speed = speed;
    this.diameter = diameter;
    this.radius = diameter * 0.5;
    this.projectileType = projectileType;
    this.function = getFunction(this.projectileType);
    this.x = 0;
    this.y = 0;
    this.hasCollided = false;
    this.startPosition = Math.round(Math.random());

    // Gør at fjenderne kommer fra højre hvis startPosition == 1
    if (this.startPosition == 1) {
      this.startFromOtherSide();
    }
  }

  // Tegner fjender
  display() {
    let c = color(0, 0, 55);
    fill(c);
    circle(this.x, this.y, this.diameter);
  }

  // Bevæger fjender
  move() {
    this.x += this.speed;
    this.y = getY(this.x, this.projectileType, this.function);
  }

  // Laver en funktion, der kan bruges til at få fjender til at komme fra højre
  startFromOtherSide() {
    this.speed = -this.speed;
    this.x = width;
  }

  // Tjekker om fjender rammer kanten af skærmen
  wallCollision() {
    if (this.x < 0 || this.x > width) {
      return true;
    }

    return false;
  }
}

start = false;
points = 0;
counter = 0;

function setup() {
  // Skaber kanvas og får det ind på hjemmesiden
  canvas = createCanvas(900, 510);
  canvas.parent("canvas-holder");
  noStroke();

// Skaber spilleren
player = new Player(width / 2, height / 2, 20);

  //Starter spillet når der trykket på startGame
  document.getElementById('startGame').onclick = () => {
    // Bruger difficulty til at beregne antal af fjender
    difficulty = document.getElementById('difficultySlider').value;
    enemies = [];
    amountOfEnemies = difficulty * 2 + 2;
    enemySize = 10;

    //Skaber et antal fjender svarende til amountOfEnemies
    for (let i = 0; i < amountOfEnemies; i++) {
      append(enemies, new Enemy(enemySize, random(1, 6), floor(random(1, 4))));
    }
    run();
  };

  // Pauser spillet når der trykkes på resumeGame
  document.getElementById('pauseGame').onclick = () => noLoop();
  // Genoptager spillet når der trykkes på resumeGame
  document.getElementById('resumeGame').onclick = () => loop();
}

// Opretter en funktion der kører spillet
function draw() {
  checkDie(player);

  // Tegner baggrund
  background(83, 21, 22);

  // Tegner og bevæger spilleren og sørger for at spilleren ikke ryger udenfor skærmen
  if (start) {
    player.display();
    player.move();
    player.checkXY();

    GUI(points, player.playerLife);


    for (let i = 0; i < enemies.length; i++) {
      enemies[i].move();
      enemies[i].display();

      if (enemies[i].wallCollision()) {
        points += 50;
        counter += 1;
        if (counter == 5) {
          enemies[enemies.length] = new Enemy(enemySize, random(1, 5), floor(random(1, 4)));
          counter = 0;
          console.log(enemies.length);
        }
        enemies[i] = new Enemy(enemySize, random(1, 5), floor(random(1, 4)));
      }

      if (player.isColliding(enemies[i])) {
        document.getElementById('resumeGame').disabled = true;
        document.getElementById('startGame').disabled = true;
        questionGen(floor(random(1, 4)));
        questionScreen();
      }
    }
  }
  checkDie(player);
}
