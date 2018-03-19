const DEFAULT_MAX_SPEED = 8;
const DEFAULT_MAX_FORCE = 0.3;
const VEHICLE_SIZE = 10;
const DISTANCE_FROM_TARGET = 100;
const SCREEN_OFFSET = 20;

// Behavior types
const SEEK = 'SEEK';
const FLEE = 'FLEE';
const ARRIVAL = 'ARRIVAL';

class Vehicle{
    constructor(x, y, max_speed, max_force) {
        this.position = createVector(x, y);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.size = VEHICLE_SIZE;
        this.max_speed = max_speed || DEFAULT_MAX_SPEED;
        this.max_force = max_force || DEFAULT_MAX_FORCE;
    }

    update() {
        this.velocity.add(this.acceleration);
		this.velocity.limit(this.max_speed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    draw() {
        stroke(0);
        fill(175);
        let angle = this.velocity.heading() + radians(90);

        push();
		translate(this.position.x, this.position.y);
        rotate(angle);

        beginShape(TRIANGLES);
        vertex(0, -this.size);
        vertex(-this.size / 2, this.size);
        vertex(this.size / 2, this.size);
        endShape();

        pop();
    }

    checkEdges() {
        // Check edges of the canvas on the X Axis
        if(this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.x > width) {
            this.position.x = 0;
        }

        // Check edges of the canvas on the Y Axis
        if(this.position.y < 0) {
            this.position.y = height;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
    }

    run() {
        this.applyBehaviors(ARRIVAL);
        this.update();
        this.checkEdges();
        this.draw();
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    seek(target, withArrival) {
        let desired = p5.Vector.sub(target, this.position);
        let distance = desired.mag();

        // If withArrival is true and distance from target is lower than
        // the amount set, slowly decrease speed, until stop (on the target)
        if(withArrival && distance < DISTANCE_FROM_TARGET) {
            let mapped_speed = map(distance, 0, DISTANCE_FROM_TARGET, 0, this.max_speed);
            desired.setMag(mapped_speed);
        } else {
            desired.setMag(this.max_speed);
        }

        let steering = p5.Vector.sub(desired, this.velocity);
        steering.limit(this.max_force);

        return steering;
    }
    
    // Inverse of seek
    flee(target) {
        return this.seek(target).mult(-1);
    }

    arrival(target) {
        return this.seek(target, true);
    }

    applyBehaviors(behavior, providedTarget) {

        // Target can be provider, or it will be default the mouse;
        const target = providedTarget || createVector(mouseX, mouseY);
        let force = null;
        

        switch(behavior) {
            case SEEK: {
                force = this.seek(target);
                break;
            }
            case FLEE: {
                force = this.flee(target);
                break;
            }
            case ARRIVAL: {
                force = this.arrival(target);
                break;
            }
        }

        this.applyForce(force);
    }
}