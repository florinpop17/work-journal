const PARTICLES = [];
const NR_OF_PARTICLES = 120;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    for(let i = 0; i < NR_OF_PARTICLES; i++) {
        PARTICLES.push(new Particle());
    }
}

function draw() {
    background(0);

    for(let particle of PARTICLES) {
        particle.update();
        particle.checkBorders();
        particle.draw();
        particle.drawLine(PARTICLES);
    }
}