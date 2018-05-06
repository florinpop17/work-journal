const CANVAS_SIZE = Math.min(600, window.innerHeight, window.innerWidth);
const WALL_SIZE = 20;
const { Bodies, Body, Constraint, Engine, Events, Mouse, MouseConstraint, Sleeping, Render, Vector, World } = Matter;
const BALL_POS = {
    x: 150,
    y: CANVAS_SIZE / 2
}
const BALL_SIZE = 30;
const NR_OF_BALLS = 20;
const ballOptions = {
    restitution: 0.7
};
let balls = [];
let forces = [];
let goodForces = [];
let ball;
let elastic;

const engine = Engine.create();
engine.enableSleeping = true;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        wireframes: false
    }
});

const wallOptions = {
    isStatic: true
};

// Wall Boundaries
const topWall = Bodies.rectangle(CANVAS_SIZE / 2, WALL_SIZE / 2, CANVAS_SIZE, WALL_SIZE, wallOptions);
const rightWall = Bodies.rectangle(CANVAS_SIZE - WALL_SIZE / 2, CANVAS_SIZE / 2, WALL_SIZE, CANVAS_SIZE, wallOptions);
const bottomWall = Bodies.rectangle(CANVAS_SIZE / 2, CANVAS_SIZE - WALL_SIZE / 2, CANVAS_SIZE, WALL_SIZE, wallOptions);
const leftWall = Bodies.rectangle(WALL_SIZE / 2, CANVAS_SIZE / 2, WALL_SIZE, CANVAS_SIZE, wallOptions);


const hoopOptions = {
    isStatic: true,
    render: {
        fillStyle: '#ffff00',
    }
}

const targetInHoopOptions = {
    isSensor: true,
    isStatic: true,
    render: {
        fillStyle: '#ff00ff'
    }
}

// Hoop Boundaries
const hoopX = CANVAS_SIZE - 100;
const hoopY = CANVAS_SIZE / 2 - 30;
const hoopWidth = 80;
const hoopHeight = 60;
const leftHoop = Bodies.rectangle(hoopX - hoopWidth / 2, hoopY, 10, hoopHeight, hoopOptions);
const rightHoop = Bodies.rectangle(hoopX + hoopWidth / 2, hoopY, 10, hoopHeight, hoopOptions);
const bottomHoop = Bodies.rectangle(hoopX, hoopY + hoopHeight / 2, hoopWidth, 10, hoopOptions);
const targetInHoop = Bodies.circle(hoopX, hoopY + 10, 10, targetInHoopOptions);
targetInHoop.label = 'target';

// Creating a non-colliding group
let group = Body.nextGroup(true);

// Random number btw -0.5 and 0.5
function random() {
    return Math.random() - 0.5;
}

function createBallWithForce(force) {
    const ball = Bodies.circle(force.pos.x, force.pos.y, BALL_SIZE, ballOptions);
    ball.label = 'ball';
    ball.collisionFilter.group = group;
    Body.applyForce(ball, force.pos, force.force);
    World.add(engine.world, ball);
    console.log(ball);
}

function createBalls() {

    for(let i = 0; i < NR_OF_BALLS; i++) {
        const ball = Bodies.circle(BALL_POS.x, (Math.random() * (CANVAS_SIZE - BALL_SIZE * 2)) + BALL_SIZE, BALL_SIZE, ballOptions);
        ball.label = 'ball';
        ball.collisionFilter.group = group;
        balls.push(ball);

        let pos = {...ball.position};
        let force = { x: random(), y: random() };
        forces.push({
            id: ball.id,
            force,
            pos
        });

        Body.applyForce(ball, pos, force);
    
        Events.on(ball, "sleepStart", function(e) {
            // Bug, when the ball was removed from the world, for some reasons, it was
            // colliding with the "active ball", even though it wasn't visible
            Body.setPosition(this, { x: -BALL_SIZE, y: -BALL_SIZE });

            // remove the ball from the array
            balls.splice(balls.indexOf(this), 1);

            // remove it also from the World
            World.remove(engine.world, this);

            // Create new balls if there aren't any left moving
            if(balls.length === 0) {
                createBalls();
            }
        });
    }

    World.add(engine.world, [...balls])
}

createBalls();

World.add(engine.world, [topWall, rightWall, bottomWall, leftWall, leftHoop, rightHoop, bottomHoop, targetInHoop]);

Engine.run(engine);
Render.run(render);

// render.canvas.addEventListener('click', pushBall);

function pushBall(e) {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    const { x, y } = ball.position;
    const forceX = (x - mouseX) / 10;
    const forceY = (y - mouseY) / 10;
    // const x = Math.random() * 20 -10; // between -10, 10
    // const y = Math.random() * 20 -10; // between -10, 10
    Body.setVelocity(ball, { x: forceX, y: forceY });
}

Events.on(engine, 'collisionStart', e => {
    const { pairs } = e;

    // change object colours to show those in an active collision (e.g. resting contact)
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
                Body.setStatic(ball, true);
                // Body.setVelocity(ball, { x: 0, y: 0 });
                let force = forces.find(force => force.id === ball.id);
                if(force) goodForces.push(force);
                console.log('scorred!', goodForces)
            }
    });
});

var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: true
        }
    }
});
World.add(engine.world, mouseConstraint);

Events.on(engine, 'afterUpdate', function() {
    for(let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];
        if(ball.position.x < BALL_SIZE || ball.position.x > CANVAS_SIZE - BALL_SIZE) {
            World.remove(engine.world, ball);
            balls.splice(i, 1);
        }
        if(ball.position.y < BALL_SIZE || ball.position.y > CANVAS_SIZE - BALL_SIZE) {
            World.remove(engine.world, ball);
            balls.splice(i, 1);
        }
    }

    if(balls.length === 0) {
        createBalls();
    }
});