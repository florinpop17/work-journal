const SCREEN_SIZE = Math.min(640, window.innerWidth);
let ball;

function setup() {
    createCanvas(SCREEN_SIZE, 3 * SCREEN_SIZE / 4);
    ball = new Ball();
}

function draw() {
    background(230);
    ball.update();
    ball.draw();
}