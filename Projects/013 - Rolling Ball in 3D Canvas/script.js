const STEP = 15;
const BALL_SIZE = 75;
const RANGE = 20;
const SCREEN_SIZE = Math.min(600, window.innerWidth);
const BALL_POSITION = {
    x: SCREEN_SIZE / 2,
    y: SCREEN_SIZE / 2
};

const BALL_VELOCITY = {
    x: 0,
    y: 0
}

let canvas;

function transformCanvas() {
    const x = map(mouseX, 0, SCREEN_SIZE, RANGE, -RANGE, true);
    const y = map(mouseY, 0, SCREEN_SIZE, -RANGE, RANGE, true);

    BALL_VELOCITY.x = x / 5;
    BALL_VELOCITY.y = -y / 5;
    canvas.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
}

function resetCanvas() {
    BALL_VELOCITY.x = 0;
    BALL_VELOCITY.y = 0;
    canvas.style.transform = `rotateX(0deg) rotateY(0deg)`;
}

function setup() {
    canvas = createCanvas(SCREEN_SIZE, SCREEN_SIZE).canvas;
    canvas.addEventListener('mousemove', transformCanvas)
    canvas.addEventListener('mouseleave', resetCanvas)
}

function draw() {
    background(220);
    drawPoints();
    drawBall();
    update();
    checkBorders();
}

function update() {
    BALL_POSITION.x += BALL_VELOCITY.x;
    BALL_POSITION.y += BALL_VELOCITY.y;
}

function checkBorders() {
    if(BALL_POSITION.x < BALL_SIZE) {
        BALL_POSITION.x = BALL_SIZE;
    } else if (BALL_POSITION.x > width - BALL_SIZE) {
        BALL_POSITION.x = width - BALL_SIZE;
    }

    if(BALL_POSITION.y < BALL_SIZE) {
        BALL_POSITION.y = BALL_SIZE;
    } else if (BALL_POSITION.y > height - BALL_SIZE) {
        BALL_POSITION.y = height - BALL_SIZE;
    }
}

function drawPoints() {
    const points = width / STEP;

    stroke(175);
    strokeWeight(2);
    for(let i = STEP; i < width; i+= STEP) {
        for(let j = STEP; j < height; j+= STEP) {
            point(i, j);
        }
    }
}

function drawBall() {
    noStroke();
    fill(100, 200);
    ellipse(BALL_POSITION.x, BALL_POSITION.y, BALL_SIZE * 2);
}