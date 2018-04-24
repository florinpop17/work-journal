class Bird {
    constructor() {
        this.x = 60;
        this.y = height / 2;
        this.yVelocity = 0;
        this.r = 20;
        this.gravity = 0.75;
        this.flyForce = -15;
        this.highlight = false;
    }

    draw() {
        fill(this.highlight ? [255, 0, 0] : 255);
        noStroke();
        ellipse(this.x, this.y, this.r * 2);
    }

    update() {
        this.yVelocity += this.gravity;
        this.yVelocity *= 0.9;
        this.y += this.yVelocity;

        if(this.y > height) {
            this.y = height;
            this.yVelocity = 0;
        }

        if(this.y < 0) {
            this.y = 0;
            this.yVelocity = 0;
        }
    }

    fly() {
        this.yVelocity += this.flyForce;
    }

    hitsPipe(pipe) {
        return (
            (this.y - this.r < pipe.top || this.y + this.r > pipe.bottom) && 
            this.x + this.r > pipe.x && 
            this.x - this.r < pipe.x + pipe.w
        );
    }
}