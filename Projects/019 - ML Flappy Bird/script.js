const SCREEN_SIZE = Math.min(600, window.innerWidth);
const TOTAL_BIRDS = 300;
let birds = [];
let oldGenerationBirds = [];
let pipes = [];
let highest = 0;
let counter = 0;
let generation = 1;
let slider;

function setup() {
    createCanvas(SCREEN_SIZE, 3 * SCREEN_SIZE / 4);
    createP('Use the slider to increase the speed of learning:');
    slider = createSlider(1, 50, 1, 1);
    generateBirds(true);
}

function draw() {

    // Code logic
    for(let i = 0; i < slider.value(); i++) {
        // Only push new pipe at 50 frames
        if(counter % 50 === 0) {
            pipes.push(new Pipe());
        }

        // Birds functions
        birds.forEach(bird => {
            bird.think(pipes);
            bird.update();

            // Save highest score
            if(bird.score > highest) {
                highest = bird.score;
            }
        });

        // Pipes functions
        for(let i = pipes.length - 1; i >= 0; i--){
            let pipe = pipes[i];
            pipe.update();

            if(pipe.isOffscreen()) {
                pipes.splice(i, 1);
            }

            for(let j = birds.length - 1; j >= 0; j--){
                let bird = birds[j];

                // Kill bird if hits the pipe
                // or hits the ceiling
                // or hits the floor
                if(bird.hitsPipe(pipe) || 
                    bird.y - bird.r < 0 ||
                    bird.y + bird.r > height) {
                    oldGenerationBirds.push(birds.splice(j, 1)[0]);
                }
            }
        }

        // Increase counter
        counter++;
    
        checkGenerationEnd();
    }

    // Drawing
    background('#00a8ff');

    // Draw the birds
    birds.forEach(bird => {
        bird.draw();
    });

    // Draw the pipes
    pipes.forEach(pipe => {
        pipe.draw();
    });
    // Draw score from one bird
    // The generation and
    // Write the highest score
    fill(255);
    rect(0, height - 30, width, height);
    fill(0);
    textSize(20);
    text(`Current: ${birds[0].score.toString().padStart(10, ' ')}, Generation: ${generation}, Highest: ${highest}`, 20, height - 10);
}

function generateBirds(generationOne) {
    for(let i = 0; i < TOTAL_BIRDS; i++) {
        birds.push(generationOne ? new Bird() : pickOneBird());
    }
}

function checkGenerationEnd() {
    if(birds.length === 0) {
        calculateFitness();
        generateBirds();
        oldGenerationBirds = [];
        pipes = [];
        counter = 0;
        generation++;
    }
}

function pickOneBird() {
    let index = 0;
    let r = random(1);

    while(r > 0) {
        r -= oldGenerationBirds[index].fitness;
        index++;
    }

    index--;

    // Create new bird
    let newBird = new Bird();

    // Select an old bird and mutate it's brain
    let pickedBird = oldGenerationBirds[index];
    pickedBird.brain.mutate(mutate);

    // Copy the brain to the new bird
    newBird.brain = pickedBird.brain.copy();

    // Return the new bird
    return newBird;
}

function calculateFitness() {
    let sum = oldGenerationBirds.reduce((total, bird) => total += bird.score, 0);

    oldGenerationBirds.forEach(bird => {
        bird.fitness = bird.score / sum;
    });
}

function mutate(val) {
    if (random(1) < 0.1) {
        let offset = randomGaussian() * 0.5;
        return val + offset;;
    } else {
        return val;
    }
}

// function keyPressed() {
//     if(key === ' ') {
//         bird.fly();
//     }
// }