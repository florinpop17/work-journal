class Circle {
    constructor(x, y, c) {
        this.x = x;
        this.y = y;
        this.c = c;
        this.r = 1;
        this.growing = true;
    }

    draw() {
        noStroke();
        fill(this.c);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    grow() {
        if(this.growing) {
            this.r += 1;
        }

        if(this.r > 5) {
            this.growing = false;
        }
    }

    edges() {
        return (
            this.x + this.r > width || 
            this.x - this.r < 0 || 
            this.y + this.r > height || 
            this.y - this.r < 0
        );
    }
}