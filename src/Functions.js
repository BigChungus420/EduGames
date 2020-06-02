/*jshint esversion: 7 */

// Funktion der kører spillet når der trykkes på start
function run() {
    start = true;
}


// Funktion der tjekker om svaret er rigtigt og trækker et liv fra spilleren hvis det ikke er
function answer() {
    ans = input.value();

    console.log(str(ans), result);
    
    if (float(ans) == float(result)) {
        loop();
    } 
    else {
        player.playerLife -= 1;
        loop();
        console.log(player.playerLife);
    }

    input.hide();
    button.hide();
    document.getElementById('resumeGame').disabled = false;
    document.getElementById('startGame').disabled = false;
}

// Funktion der får et spørgsmål frem på skærmen når man bliver ramt
function questionScreen (){
    questionGen();
    noLoop();

    if (questionType == 1) {
        type = " + ";
    } else if (questionType == 2) {
        type = " - ";
    } else if (questionType == 3) {
        type = " · ";
    }
    fill((255, 255, 255));
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Hvad er " + str(number1) + str(type) + str(number2) + "?", width/2.05, height/2.5);
    
    input = createInput();
    input.id = "guess";
    input.position(windowWidth/2.45, windowHeight/3.5);

    button = createButton('Svar');
    button.position(input.x + input.width, input.y);
    button.mousePressed(answer);
}
// Funktion der genererer tilfældige matematik spørgsmål
function questionGen() {
questionType = floor(random(1, 4));
number1 = floor(random(1, 51));
number2 = floor(random(1, 51));

if (questionType == 1){
     result = number1 + number2;
}

if (questionType == 2){
     result = number1 - number2;
}

if (questionType == 3){
    number1 = floor(random(1, 26));
    number2 = floor(random(1, 26));
    result = number1 * number2;
}
}

function GUI(points, lives) {
    fill((255, 255, 255));
    textSize(30);
    textAlign(LEFT, CENTER);
    text("Points: " + str(points), 50, 50);
    text("Lives: " + str(lives), 50, 100);
}


function playAgain(){
    location.reload();
}

function goToFrontpage(){
    window.location.replace("https://bigchungus420.github.io/EduGames/src/index.html");
}

// Funktion der tjekker om man er død
function checkDie (player){
    if (player.playerLife == 0){
        noLoop();
        clear();
        background(83, 21, 22);
        fill((255, 255, 255));
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Du tabte. Vil du prøve igen?", width/2.05, height/2.5);

        tryAgain = createButton('Ja');
        tryAgain.position(windowWidth * 0.75, height / 1.5);
        tryAgain.mousePressed(playAgain);

        goBack = createButton('Nej');
        goBack.position(windowWidth * 0.25, height / 1.5);
        goBack.mousePressed(goToFrontpage);
    }
}