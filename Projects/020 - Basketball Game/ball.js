const BALL_SIZE = 25;
const GRAVITY_FORCE = 0.7;
const BOUNCE_FORCE = 0.8;

class Ball {
    constructor() {
        this.position = createVector(100, height / 2);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.gravity = createVector(0, GRAVITY_FORCE);
        this.size = BALL_SIZE;
    }

    applyForce(f) {
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        this.applyForce(this.gravity);

        this.checkBorders();
    }

    draw() {
        fill('#E87E04');
        noStroke();
        ellipse(this.position.x, this.position.y, this.size * 2);
    }

    checkBorders() {
        if(this.position.x + this.size > width) {
            this.position.x = width - this.size;
            this.velocity.mult(-BOUNCE_FORCE);
        } else if (this.position.x - this.size < 0) {
            this.position.x = 0 + this.size;
            this.velocity.mult(-BOUNCE_FORCE);
        }
        
        if(this.position.y + this.size > height) {
            this.position.y = height - this.size;
            this.velocity.mult(-BOUNCE_FORCE);
        } else if (this.position.y - this.size < 0) {
            this.position.y = 0 + this.size;
            this.velocity.mult(-BOUNCE_FORCE);
        }
    }
}