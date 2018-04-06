const PARTICLES = [];
const NR_OF_PARTICLES = 200;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    for(let i = 0; i < NR_OF_PARTICLES; i++) {
        PARTICLES.push(new Particle());
    }
}

function draw() {
    background(0);

    for(let i = 0; i < PARTICLES.length; i++) {
        PARTICLES[i].update();
        PARTICLES[i].checkBorders();
        PARTICLES[i].draw();
        
        for(let j = i + 1; j < PARTICLES.length; j++) {
            PARTICLES[i].drawLine(PARTICLES[j]);
        }
    }
}