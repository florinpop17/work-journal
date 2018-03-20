const DEFAULT_MAX_SPEED = 5;
const DEFAULT_MAX_FORCE = 0.3;
const VEHICLE_SIZE = 10;
const DISTANCE_FROM_TARGET = 50;
const SCREEN_OFFSET = 20;

class Vehicle{
    constructor(x, y, max_speed, max_force) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.acceleration = createVector(0, 0);
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
            this.position.x = width - this.size;
        }
        if (this.position.x > width) {
            this.position.x = this.size;
        }

        // Check edges of the canvas on the Y Axis
        if(this.position.y < 0) {
            this.position.y = height - this.size;
        }
        if (this.position.y > height) {
            this.position.y = this.size;
        }
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

        this.applyForce(steering);
    }
    
    // Inverse of seek
    flee(target) {
        let desired = p5.Vector.sub(target, this.position);
        let distance = desired.mag();

        desired.setMag(this.max_speed);

        let steering = p5.Vector.sub(desired, this.velocity);
        steering.limit(this.max_force);
        
        // Multiply by -1 to get inverse of seek behavior
        steering.mult(-1);

        this.applyForce(steering);
    }

    // Stop when reaching the target
    arrival(target) {
        this.seek(target, true);
    }

    // Align the vehicle with the vehicles around it
    align(vehicles) {
        let sum = createVector(0, 0);
        let count = 0;
        for(let vehicle of vehicles) {
            let d = p5.Vector.dist(this.position, vehicle.position);
            
            // Add up all the vehicles velocity
            if(d > 0 && d < DISTANCE_FROM_TARGET) {
                sum.add(vehicle.velocity);
                count++;
            }
        }

        if(count > 0) {
            // Divide to get the average velocity
            sum.div(count);
            sum.setMag(this.max_speed);

            const steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.max_force);
            this.applyForce(steer);
        }
    }

    // Separate
    separate(vehicles) {
        let sum = createVector(0, 0);
        let count = 0;
        for(let vehicle of vehicles) {
            let d = p5.Vector.dist(this.position, vehicle.position);
            
            // Add up all the vehicles velocity
            if(d > 0 && d < DISTANCE_FROM_TARGET) {
                let diff = p5.Vector.sub(this.position, vehicle.position);
                diff.normalize();
                diff.div(d);

                sum.add(diff);
                count++;
            }
        }

        if(count > 0) {
            // Divide to get the average velocity
            sum.div(count);
            sum.setMag(this.max_speed);

            sum.sub(this.velocity);
            sum.limit(this.max_force)
            this.applyForce(sum);
        }
    }
}