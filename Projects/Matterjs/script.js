const CANVAS_SIZE = Math.min(600, window.innerHeight, window.innerWidth);
const WALL_SIZE = 10;
const { Bodies, Body, Constraint, Engine, Events, Mouse, MouseConstraint, Render, World } = Matter;

const engine = Engine.create();
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
    isStatic: true,
    restitution: 0.3
};

// Wall Boundaries
const topWall = Bodies.rectangle(CANVAS_SIZE / 2, WALL_SIZE / 2, CANVAS_SIZE, WALL_SIZE, wallOptions);
const rightWall = Bodies.rectangle(CANVAS_SIZE - WALL_SIZE / 2, CANVAS_SIZE / 2, WALL_SIZE, CANVAS_SIZE, wallOptions);
const bottomWall = Bodies.rectangle(CANVAS_SIZE / 2, CANVAS_SIZE - WALL_SIZE / 2, CANVAS_SIZE, WALL_SIZE, wallOptions);
const leftWall = Bodies.rectangle(WALL_SIZE / 2, CANVAS_SIZE / 2, WALL_SIZE, CANVAS_SIZE, wallOptions);


const hoopOptions = {
    isStatic: true,
    restitution: 0,
    render: {
        fillStyle: '#ffff00',
    }
}

const hoopX = CANVAS_SIZE - 100;
const hoopY = CANVAS_SIZE / 2 - 30;
const hoopWidth = 80;
const hoopHeight = 60;
const leftHoop = Bodies.rectangle(hoopX - hoopWidth / 2, hoopY, 10, hoopHeight, hoopOptions);
const rightHoop = Bodies.rectangle(hoopX + hoopWidth / 2, hoopY, 10, hoopHeight, hoopOptions);
const bottomHoop = Bodies.rectangle(hoopX, hoopY + hoopHeight / 2, hoopWidth, 10, hoopOptions);
bottomHoop.label = 'bottomHoop';

// Hoop Boundaries

const ballOptions = {
    restitution: 0.7
};
const ball = Bodies.circle(CANVAS_SIZE - 100, 50, 30, ballOptions);
ball.label = 'ball';

let rockOptions = { density: 0.004 },
rock = Bodies.polygon(170, 450, 8, 20, rockOptions),
anchor = { x: 170, y: 450 },
elastic = Constraint.create({ 
    pointA: anchor, 
    bodyB: rock, 
    stiffness: 0.05
});

World.add(engine.world, [topWall, rightWall, bottomWall, leftWall, ball, leftHoop, rightHoop, bottomHoop, rock, elastic]);

Engine.run(engine);
Render.run(render);

render.canvas.addEventListener('click', pushBall);

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
        if(bodyA.label === 'ball' && bodyB.label === 'bottomHoop' ||
            bodyA.label === 'bottomHoop' && bodyB.label === 'ball') {
                console.log('scorred!');
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
    console.log(mouseConstraint.mouse.button)
    if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
        rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
        World.add(engine.world, rock);
        elastic.bodyB = rock;
    }
});