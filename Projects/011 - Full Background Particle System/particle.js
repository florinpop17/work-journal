const VELOCITY_RANGE = 2;
const LINE_RANGE = 120;

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-VELOCITY_RANGE, VELOCITY_RANGE), random(-VELOCITY_RANGE, VELOCITY_RANGE));
        this.r = random(2, 7);
    }

    update() {
        this.pos.add(this.vel);
    }

    checkBorders() {
        if(this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }

        if(this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

    draw() {
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }

    drawLine(particles) {
        for(let particle of particles) {
            if(particle !== this) {
                let d = dist(particle.pos.x, particle.pos.y, this.pos.x, this.pos.y);

                if(d < LINE_RANGE) {
                    stroke(255, 140 - d);
                    line(particle.pos.x, particle.pos.y, this.pos.x, this.pos.y);
                }
            }
        }
    }
}