const BALL_SIZE = 20;
const GRAVITY_FORCE = 0.7;
const FRICTION_FORCE = 0.99;
const BOUNCE_FORCE = 0.85;
const STOP_VELOCITY_VALUE = 1;

class Ball {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.gravity = createVector(0, GRAVITY_FORCE);
        this.size = BALL_SIZE;
        this.isStopped = true;
        this.brain = new NeuralNetwork(4, 10, 2);
        this.closestToHoop = 9999;
    }

    think(hoop) {
        // Calculate the inputs to the NN
        let inputs = [];
        inputs.push(this.position.x / width);
        inputs.push(this.position.y / height);
        inputs.push(hoop.insideHoopPosition.x / width);
        inputs.push(hoop.insideHoopPosition.y / height);

        // Predict forces
        let [ f1, f2 ] = this.brain.predict(inputs);
        f1 *= 30;
        f2 *= 30;
        const force = createVector(f1, f2);
        this.applyForce(force);
    }

    applyForce(f) {
        this.acceleration.add(f);
    }

    update() {
        if(!this.isStopped) {
            this.applyForce(this.gravity);
            this.velocity.add(this.acceleration);
            this.velocity.mult(FRICTION_FORCE);
            this.position.add(this.velocity);
            this.acceleration.mult(0);

        } else {
            // clear out velocity & acceleration
            this.velocity.mult(0);
            this.acceleration.mult(0);
        }

        this.checkBorders();
    }

    draw() {
        push();
        translate(this.position.x, this.position.y);

        // Draw the ball
        fill(232, 126, 4, 200);
        noStroke();
        ellipse(0, 0, this.size * 2);

        // Rotate the ball
        let angle = this.velocity.heading() + radians(90);
        rotate(angle);

        // Draw the line inside the ball
        stroke(0, 200);
        strokeWeight(2);
        line(0, 0, -this.size, 0);

        pop();
    }

    checkBorders() {
        if(this.position.x + this.size > width) {
            this.position.x = width - this.size;
            this.velocity.x *= -BOUNCE_FORCE;
        } else if (this.position.x - this.size < 0) {
            this.position.x = this.size;
            this.velocity.x *= -BOUNCE_FORCE;
        }
        
        if(this.position.y + this.size > height) {
            this.position.y = height - this.size;
            this.velocity.y *= -BOUNCE_FORCE;
        } else if (this.position.y - this.size < 0) {
            this.position.y = this.size;
            this.velocity.y *= -BOUNCE_FORCE;
        }
    }

    checkIfCollides(hoop) {
        const {
            dots,
            insideHoopPosition,
            insideHoopSize,
            size
        } = hoop;

        dots.forEach(dot => {
            const dotDist = dist(this.position.x, this.position.y, dot.x, dot.y);        
            // Check if collides with the dot
            if(dotDist < size + this.size) {
                const desired = p5.Vector.sub(this.position, dot);
                this.applyForce(desired);
            }
        });
        
        const insideHoopDist = dist(this.position.x, this.position.y, insideHoopPosition.x, insideHoopPosition.y);

        // Testing which is best to have for evolve it better
        this.closestToHoop = Math.min(insideHoopDist, this.closestToHoop);
        // this.closestToHoop = insideHoopDist;

        // Check if it is inside the Hoop
        if(insideHoopDist < insideHoopSize + this.size) {
            if(this.position.y < insideHoopPosition.y) {
                this.isStopped = true;
                this.closestToHoop = 1;
            } else {
                const desired = p5.Vector.sub(this.position, insideHoopPosition);
                this.applyForce(desired);
            }
        }
    }
}