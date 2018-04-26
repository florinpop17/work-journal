const imgSrc = 'https://image.ibb.co/jS0zTc/bird.png';
let img;

function preload() {
    img = loadImage(imgSrc);
}

class Bird {
    constructor() {
        this.x = 60;
        this.y = random(height);
        this.yVelocity = 0;
        this.r = 15;
        this.gravity = 0.8;
        this.flyForce = -12;
        this.highlight = false;
        this.score = 0;
        this.fitness = 0;
        this.brain = new NeuralNetwork(5, 10, 2);
    }

    draw() {
        // fill(255);
        // ellipse(this.x, this.y, this.r * 2);
        imageMode(CENTER);
        image(img, this.x, this.y, this.r * 2, this.r * 2);
    }

    think(pipes) {
        // Get the closes pipe to the bird
        let currentPipe = pipes.find(pipe => pipe.x + pipe.w > this.x);

        // Calculate the inputs to the NN
        let inputs = [];
        inputs.push(this.y / height);
        inputs.push(this.yVelocity / 10);
        inputs.push(currentPipe.top / height);
        inputs.push(currentPipe.bottom / height);
        inputs.push(currentPipe.x / width);

        // Predict outputs
        let outputs = this.brain.predict(inputs);

        // Fly only if ...
        if(outputs[0] > outputs[1]) {
            this.fly();
        }
    }

    update() {
        this.score++;
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