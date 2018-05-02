const SCREEN_SIZE = Math.min(640, window.innerWidth);
const NR_OF_BALLS = 50;
let balls = [];
let oldGenerationBalls = [];
let hoop;
let generation = 1;
let totalWhichReachedTheTarget = 0;
let maxWhichReachedTheTarget = 0;
let slider;
// let mouseP;
// let mouseR;

function setup() {
    createCanvas(SCREEN_SIZE, 3 * SCREEN_SIZE / 4);
    generateBalls(true);
    slider = createSlider(1, 100, 1, 1);
    hoop = new Hoop(width - 100, 200);

    setTimeout(pushBalls, 100);

    // Game loop every 5 seconds
    setInterval(() => {
        // Add the balls to the old generation
        oldGenerationBalls = [...balls];
        calculateFitness();
        generateBalls();

        oldGenerationBalls = [];
        generation++;

        setTimeout(pushBalls, 100);
    }, 1000);
}

function draw() {
    background(230);
    hoop.draw();
    balls.forEach(ball => {
        ball.draw();
    });

    // Draw text
    text(`Generation: ${generation}, Reached: ${maxWhichReachedTheTarget}`, 20, height - 20);

    // Speed up the process
    for(let i = 0; i < slider.value(); i++) {
        balls.forEach(ball => {
            ball.update();
            ball.checkIfCollides(hoop);
        });
    }

    // // Debug stuff
    // if(mouseP && mouseR) {
    //     strokeWeight(2);
    //     stroke(0);
    //     line(mouseP.x, mouseP.y, mouseR.x, mouseR.y);
    // }
}

function pushBalls() {
    balls.forEach(ball => {
        ball.isStopped = false;
        ball.think(hoop);
    });
}

function generateBalls(generationOne) {
    balls = [];
    maxWhichReachedTheTarget = Math.max(maxWhichReachedTheTarget, totalWhichReachedTheTarget);
    totalWhichReachedTheTarget = 0;
    for(let i = 0; i < NR_OF_BALLS; i++) {
        balls.push(generationOne ? new Ball(100, height / 2) : pickOneBall());
    }
}

function pickOneBall() {
    let index = 0;
    let r = random(1);

    while(r > 0) {
        r -= oldGenerationBalls[index].fitness;
        index++;
    }

    index--;

    // Create new ball
    let newBall = new Ball(100, height / 2);

    // Select an old ball and mutate it's brain
    let pickedBall = oldGenerationBalls[index];
    pickedBall.brain.mutate(mutate);

    // Copy the brain to the new ball
    newBall.brain = pickedBall.brain.copy();

    // Return the new ball
    return newBall;
}

function calculateFitness() {
    oldGenerationBalls.forEach(ball => {
        let score = 1000 / ball.closestToHoop;
        if(score === 1000) {
            totalWhichReachedTheTarget++;
        }
        ball.fitness = score * score;
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

// function mousePressed() {
//     ball.isStopped = true;
//     mouseP = createVector(mouseX, mouseY);
//     let d = dist(mouseP.x, mouseP.y, ball.position.x, ball.position.y);
//     if(d < ball.size * 2) {
//         mouseP = ball.position.copy();
//     } else {
//         mouseP = undefined;
//     }
//     mouseR = undefined;
// }

// function mouseDragged() {
//     if(mouseP) {
//         mouseR = createVector(mouseX, mouseY);
//     }
// }

// function mouseReleased() {
//     if(mouseP) {
//         mouseR = createVector(mouseX, mouseY);
//         const desired = p5.Vector.sub(mouseP, mouseR);
//         desired.limit(25);
//         ball.isStopped = false;
//         ball.applyForce(desired);
//     }
//     mouseR = undefined;
// }