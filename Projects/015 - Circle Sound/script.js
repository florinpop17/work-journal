const SCREEN_SIZE = Math.min(600, window.innerWidth, window.innerHeight);
let song;
let amp;
let volHistory = [];

function preload() {
    song = loadSound('bensound-memories.mp3');
}

function setup() {
    createCanvas(SCREEN_SIZE, SCREEN_SIZE);
    angleMode(DEGREES);
    song.play();
    amp = new p5.Amplitude();
}

function draw() {
    background(0);
    let vol = amp.getLevel();
    volHistory.push(vol);
    
    push();
    translate(width / 2, height / 2);
    rotate(-90);
    strokeWeight(2);
    stroke(255);
    volHistory.forEach((v, i) => {
        let r = map(v, 0, 1, height / 4, 3 * height / 4);
        let x = r * cos(i);
        let y = r * sin(i);
        line(0, 0, x, y);
    });
    pop();

    if(volHistory.length > 360) {
        volHistory.splice(0, 1);
    }
}