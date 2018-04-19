class Piece {
    constructor(x, y, size, img) {
        // for debugging
        this.x = x;
        this.y = y;
        this.targetPos = createVector(this.x * size, this.y * size);
        this.pos = this.targetPos.copy();
        this.vel = createVector(0, 0);
        this.size = size;
        this.isEmpty = false;
        this.img = img;
        this.id = this.x + this.y * 3 + 1;
    }

    draw() {
        stroke(0);
        if(img.width < img.height) {
            this.img.resize(width, 0);
        } else {
            this.img.resize(0, height);
        }

        if(!this.isEmpty) {
            image(this.img, this.pos.x, this.pos.y, this.size, this.size, this.targetPos.x, this.targetPos.y, this.size, this.size);
        }

        // TO DO: Just for debugging, remove this
        if(!this.isEmpty) {
            fill(0);
            textAlign(CENTER, CENTER);
            textSize(24);
            text(this.id, this.pos.x + this.size / 2, this.pos.y + this.size / 2);
        }
    }
}