const BALL_SIZE = 25;
const GRAVITY_FORCE = 0.7;
const FRICTION_FORCE = 0.99;
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
        this.velocity.mult(FRICTION_FORCE);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        this.applyForce(this.gravity);

        this.checkBorders();
    }

    draw() {
        push();
        translate(this.position.x, this.position.y);

        // Draw the ball
        fill('#E87E04');
        noStroke();
        ellipse(0, 0, this.size * 2);

        // Rotate the ball
        let angle = this.velocity.heading() + radians(90);
        rotate(angle);

        // Draw the line inside the ball
        stroke(0);
        strokeWeight(2);
        line(0, 0, -this.size, 0);

        pop();
    }

    checkBorders() {
        if(this.position.x + this.size > width) {
            this.position.x = width - this.size;
            this.applyForce(-BOUNCE_FORCE, 0);
        } else if (this.position.x - this.size < 0) {
            this.position.x = this.size;
            this.applyForce(-BOUNCE_FORCE, 0);
        }
        
        if(this.position.y + this.size > height) {
            this.position.y = height - this.size;
            this.applyForce(0, -BOUNCE_FORCE);
        } else if (this.position.y - this.size < 0) {
            this.position.y = this.size;
            this.applyForce(0, -BOUNCE_FORCE);
        }
    }
}