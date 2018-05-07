const CANVAS_SIZE = Math.min(600, window.innerHeight, window.innerWidth);
const WALL_SIZE = 20;
const NR_OF_BALLS = 100;

let generation = 1;
let reachedTarget = 0;
let balls = [];
let oldGenerationBalls = [];
let hoop = undefined;
let nr_of_bodies = 0;

const engine = Engine.create();
engine.enableSleeping = true;

const { world } = engine;
const render = Render.create({
    element: document.body,
    engine,
    options: {
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        wireframes: false
    }
});

createWalls();

createGeneration();

Engine.run(engine);
Render.run(render);

function createWalls() {
    const wallOptions = {
        isStatic: true,
        isSleeping: true
    };
    
    // Wall Boundaries
    const topWall = Bodies.rectangle(CANVAS_SIZE / 2, WALL_SIZE / 2, CANVAS_SIZE, WALL_SIZE, wallOptions);
    const rightWall = Bodies.rectangle(CANVAS_SIZE - WALL_SIZE / 2, CANVAS_SIZE / 2, WALL_SIZE, CANVAS_SIZE, wallOptions);
    const bottomWall = Bodies.rectangle(CANVAS_SIZE / 2, CANVAS_SIZE - WALL_SIZE / 2, CANVAS_SIZE, WALL_SIZE, wallOptions);
    const leftWall = Bodies.rectangle(WALL_SIZE / 2, CANVAS_SIZE / 2, WALL_SIZE, CANVAS_SIZE, wallOptions);
    
    World.add(world, [topWall, rightWall, bottomWall, leftWall]);
}

function createBall(newGeneration = false) {
    return newGeneration ? pickNewBall() : new Ball(100, randomYPosition(), world);
}

function createBalls(newGeneration = false) {
    for(let i = 0; i < NR_OF_BALLS; i++) {
        const ball = createBall(newGeneration);
        balls.push(ball);

        // Apply random force by "thinking"
        ball.think(hoop);

        // Add event listener for sleeping 'mode'
        Events.on(ball.getBall(), "sleepStart", function(e) {

            const foundBall = balls.find(b => b.getBall().id === this.id);

            // if doesn't have score already
            if(foundBall.score === 0) {
                foundBall.score = 1000 / dist(foundBall.getBall().position, hoop.getTarget().position);
            }

            // remove the ball from the array
            oldGenerationBalls.push(balls.splice(balls.indexOf(foundBall), 1)[0]);

            // Bug, when the ball was removed from the world, for some reasons, it was
            // colliding with the "active ball", even though it wasn't visible
            // Body.setPosition(this, { x: -1000, y: -1000 });

            // remove it also from the World
            ball.removeFromWorld(world);

            checkGenerationEnd();
        });
    }
}

function createGeneration(newGeneration = false) {
    hoop = new Hoop(CANVAS_SIZE - 100, randomYPosition(), world);
    nr_of_bodies = world.bodies.length;
    createBalls(newGeneration);
}

function createNewGeneration() {
    // remove hoop from world 
    // fix some bug in matterjs
    hoop.setPosition({ x: 1000, y: 1000 });
    hoop.removeFromWorld(world);
    createGeneration(true);
}

function checkGenerationEnd() {
    // if all the balls are deleted (when the number of bodies in the engine
    // is the same as it was before the balls were created)
    if(world.bodies.length === nr_of_bodies) {
        calculateFitness();
        createNewGeneration();
        console.log('generation', generation);
        console.log('reachedTarget', reachedTarget);
        reachedTarget = 0;
        generation++;
        oldGenerationBalls = [];
    }
}

// Evolution helper functions
function pickNewBall() {
    let index = 0;
    let r = Math.random();

    while(r > 0) {
        r -= oldGenerationBalls[index].fitness;
        index++;
    }

    index--;

    // Create new ball
    let newBall = createBall();

    // Select an old ball and mutate it's brain
    let pickedBall = oldGenerationBalls[index];
    pickedBall.brain.mutate(mutate);

    // Copy the brain to the new ball
    newBall.brain = pickedBall.brain.copy();

    // Return the new ball
    return newBall;
}

function calculateFitness() {
    let sum = oldGenerationBalls.reduce((total, ball) => total += ball.score, 0);

    oldGenerationBalls.forEach(ball => {
        ball.fitness = ball.score / sum;
    });
}

function mutate(val) {
    if (Math.random() < 0.1) {
        let offset = randomGaussian() * 0.5;
        return val + offset;;
    } else {
        return val;
    }
}

// Helper functions
function randomYPosition() {
    return (Math.random() * (CANVAS_SIZE - 300)) + 150;
}

function randomGaussian()  {
    do {
        var x1 = Math.random() * 2 - 1;
        var x2 = Math.random() * 2 - 1;
        var w = x1 * x1 + x2 * x2;
    } while (w >= 1);
    w = Math.sqrt((-2 * Math.log(w))/w);
    return x1 * w;
  }

function dist(point1, point2) {
    return Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
}

// Events
Events.on(engine, 'afterUpdate', function() {
    for(let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i].getBall();
        if(ball.position.x < 0 || ball.position.x > CANVAS_SIZE || 
            ball.position.y < 0 || ball.position.y > CANVAS_SIZE) {
            balls[i].removeFromWorld(world);

            // Give it a small score
            balls[i].score = 0;
            oldGenerationBalls.push(balls.splice(i, 1)[0]);
        }
    }
    checkGenerationEnd();
});


Events.on(engine, 'collisionStart', e => {
    const { pairs } = e;

    pairs.forEach(pair => {
        const { bodyA, bodyB } = pair;
        if(bodyA.label === 'ball' && bodyB.label === 'target' ||
            bodyA.label === 'target' && bodyB.label === 'ball') {
                let ball;
                if(bodyA === 'ball') {
                    ball = bodyA;
                } else {
                    ball = bodyB;
                }

                // Stop it from moving (only gravitation remains)
                Body.setVelocity(ball, { x: 0, y: 0 });
                const winnerBall = balls.find(b => b.getBall().id === ball.id);

                // Give it a high score
                winnerBall.score = 1000;
                reachedTarget++;
            }
    });
});