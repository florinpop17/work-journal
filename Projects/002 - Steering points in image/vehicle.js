const MAX_SPEED = 12;
const MAX_FORCE = 1;
const CIRCLE_RADIUS = 50;

class Vehicle{
    constructor(x, y, color) {
        this.pos = createVector(random(width), random(height));
        this.target = createVector(x, y)
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.color = color;
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    draw() {
        stroke([...this.color]);
        strokeWeight(CIRCLE_SIZE);
        point(this.pos.x, this.pos.y);
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

        return steer;
    }


    flee(target) {
        const desired = p5.Vector.sub(target, this.pos);
        const distance = desired.mag();

        if (distance < CIRCLE_RADIUS) {
            desired.setMag(MAX_SPEED);
            desired.mult(-1);

            const steer = p5.Vector.sub(desired, this.vel);
            steer.limit(MAX_FORCE);
            
            return steer;
        } else {
            return createVector(0, 0);
        }
    }

    applyForce(f) {
        this.acc.add(f);
    }

    applyBehaviors() {
        const arrive = this.arrive(this.target);
        const mouse = createVector(mouseX, mouseY);
        const flee = this.flee(mouse);
        
        arrive.mult(1);
        flee.mult(5);

        this.applyForce(arrive);
        this.applyForce(flee);
    }
}