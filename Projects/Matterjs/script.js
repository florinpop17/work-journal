const CANVAS_SIZE = Math.min(600, window.innerHeight, window.innerWidth);
const WALL_SIZE = 10;
const { Engine, Render, World, Bodies, Body } = Matter;

const engine = Engine.create();
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: CANVAS_SIZE,
        height: CANVAS_SIZE
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
        lineWidth: 2
    }
}

const hoopX = CANVAS_SIZE - 100;
const hoopY = CANVAS_SIZE / 2 - 30;
const hoopWidth = 80;
const hoopHeight = 60;
const leftHoop = Bodies.rectangle(hoopX - hoopWidth / 2, hoopY, 10, hoopHeight, hoopOptions);
const rightHoop = Bodies.rectangle(hoopX + hoopWidth / 2, hoopY, 10, hoopHeight, hoopOptions);
const bottomHoop = Bodies.rectangle(hoopX, hoopY + hoopHeight / 2, hoopWidth, 10, hoopOptions);

// Hoop Boundaries

const ballOptions = {
    restitution: 0.7
};
const ball = Bodies.circle(CANVAS_SIZE - 100, 50, 30, ballOptions);

World.add(engine.world, [topWall, rightWall, bottomWall, leftWall, ball, leftHoop, rightHoop, bottomHoop]);

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
    console.log(forceX, forceY);
    Body.setVelocity(ball, { x: forceX, y: forceY });
}