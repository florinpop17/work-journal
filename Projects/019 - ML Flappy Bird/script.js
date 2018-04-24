let bird;
let pipes = [];

function setup() {
    createCanvas(600, 600);
    bird = new Bird();
    pipes.push(new Pipe());
}

function draw() {
    background(50);

    if(frameCount % 50 === 0) {
        pipes.push(new Pipe());
    }

    for(let i = pipes.length - 1; i >= 0; i--){
        let pipe = pipes[i];
        pipe.update();
        pipe.draw();

        if(pipe.isOffscreen()) {
            pipes.splice(i, 1);
        }

        if(bird.hitsPipe(pipe)) {
            bird.highlight = true;
        } else {
            bird.highlight = false;
        }
    }

    bird.update();
    bird.draw();
}

function keyPressed() {
    if(key === ' ') {
        bird.fly();
    }
}