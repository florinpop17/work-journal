const HOOP_SIZE = 90;
const INSIDE_HOOP_OFFSET = 25;

class Hoop {
    constructor(x, y) {
        const dot1 = createVector(x - HOOP_SIZE / 2, y);
        const dot2 = createVector(x - HOOP_SIZE / 2 + 10, y + 25);
        const dot3 = createVector(x, y + 40);
        const dot4 = createVector(x + HOOP_SIZE / 2 - 10, y + 25);
        const dot5 = createVector(x + HOOP_SIZE / 2, y);
        this.dots = [dot1, dot2, dot3, dot4, dot5];
        this.insideHoopPosition = createVector(x, y + INSIDE_HOOP_OFFSET);
        this.insideHoopSize = 10;
        this.size = 4;
    }

    draw() {
        // Draw the dots / the hoop borders
        stroke(0);
        strokeWeight(2);
        noFill();
        beginShape();
        this.dots.forEach(dot => {
            vertex(dot.x, dot.y);
            ellipse(dot.x, dot.y, this.size * 2);
        })
        endShape();

        // insideHoop
        noStroke();
        fill(255, 0, 255);
        ellipse(this.insideHoopPosition.x, this.insideHoopPosition.y, this.insideHoopSize * 2);
    }
}