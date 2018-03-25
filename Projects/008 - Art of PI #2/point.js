const COLORS = ['#FFFFFF', '#D87C46', '#4A2B68', '#C058C7', '#125D5E', '#26CCCA', '#0C3B81', '#0E7AFA', '#FF00FF', '#8CBA5F'];
const MAX_FORCE = .3;
const MAX_SPEED = 8;
const CIRCLE_RADIUS = 25;

class Point {
    constructor(x, y, value, target) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.value = value;
        this.target = target;
    }

    update() {
        this.arrive(this.target);
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    draw() {
        noStroke();
        fill(COLORS[+this.value]);
        textFont('Georgia');
        textAlign(CENTER, CENTER);
        // textStyle(BOLD);
        textSize(32);
        text(this.value, this.pos.x, this.pos.y);
    }

    arrive(target) {
        const desired = p5.Vector.sub(target, this.pos);
        const distance = desired.mag();
        let speed = MAX_SPEED;

        if (distance < CIRCLE_RADIUS) {
            speed = map(distance, 0, 100, 0, MAX_SPEED);
        }

        desired.setMag(speed);

        const steer = p5.Vector.sub(desired, this.vel);
        steer.limit(MAX_FORCE);

        this.applyForce(steer);
    }

    applyForce(f) {
        this.acc.add(f);
    }
}