const SCREEN_SIZE = Math.min(640, window.innerWidth);
let ball;
let mouseP;
let mouseR;

function setup() {
    createCanvas(SCREEN_SIZE, 3 * SCREEN_SIZE / 4);
    ball = new Ball();
}

function draw() {
    background(230);
    ball.update();
    ball.draw();

    // Debug stuff
    if(mouseP && mouseR) {
        strokeWeight(2);
        stroke(0);
        line(mouseP.x, mouseP.y, mouseR.x, mouseR.y);
    }
}

function mousePressed() {
    mouseP = createVector(mouseX, mouseY);
    let d = dist(mouseP.x, mouseP.y, ball.position.x, ball.position.y);
    if(d < ball.size * 2) {
        mouseP = ball.position.copy();
    } else {
        mouseP = undefined;
    }
    mouseR = undefined;
}

function mouseDragged() {
    if(mouseP) {
        mouseR = createVector(mouseX, mouseY);
    }
}

function mouseReleased() {
    if(mouseP) {
        mouseR = createVector(mouseX, mouseY);
        const desired = p5.Vector.sub(mouseP, mouseR);
        desired.limit(30);
        ball.applyForce(desired);
    }
}