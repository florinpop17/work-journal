class Pipe {
    constructor() {
        this.top = random(height / 5, 3 * height / 4);
        this.gapSize = 100;
        this.bottom = this.top + this.gapSize;
        this.x = width;
        this.w = 30;
        this.speed = -5;
    }

    draw() {
        fill(255);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, this.bottom, this.w, height);
    }

    update() {
        this.x += this.speed;
    }

    isOffscreen() {
        return this.x < -this.w;
    }
}