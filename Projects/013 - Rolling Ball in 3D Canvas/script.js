const STEP = 15;
const BALL_SIZE = 75;

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(255);
    drawPoints();
    drawBall();
}

function drawPoints() {
    const points = width / STEP;

    stroke(150);
    strokeWeight(2);
    for(let i = 0; i < width; i+= STEP) {
        for(let j = 0; j < height; j+= STEP) {
            point(i, j);
        }
    }
}

function drawBall() {
    noStroke();
    fill(0);
    ellipse(width / 2, height / 2, BALL_SIZE * 2);
}