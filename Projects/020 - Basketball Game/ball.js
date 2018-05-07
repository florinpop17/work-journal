// // These are taken from script.js
// // const { Body, Bodies, World } = Matter;
const BALL_SIZE = 30;
const GROUP = Body.nextGroup(true);

class Ball {
    constructor(x, y, world) {
        this.x = x;
        this.y = y;
        const options = {
            restitution: 0.7
        };
        this.ball = Bodies.circle(this.x, this.y, BALL_SIZE, options);
        this.ball.collisionFilter.group = GROUP;
        this.ball.label = 'ball';
        this.score = 0;
        this.fitness = 0;
        this.brain = new NeuralNetwork(4, 10, 2);

        World.add(world, this.ball);
    }

    think(hoop) {

        // Calculate the inputs to the NN
        let inputs = [];
        inputs.push(this.ball.position.x / CANVAS_SIZE);
        inputs.push(this.ball.position.y / CANVAS_SIZE);
        inputs.push(hoop.getTarget().position.x / CANVAS_SIZE);
        inputs.push(hoop.getTarget().position.y / CANVAS_SIZE);

        // Predict outputs
        let outputs = this.brain.predict(inputs);
        this.applyForce(outputs);
    }

    applyForce(force) {
        // force must be an array of 2 numbers
        const [x, y] = force;
        Body.applyForce(this.ball, this.ball.position, { x, y });
    }

    getBall() {
        return this.ball;
    }

    removeFromWorld(world) {
        World.remove(world, this.ball);
    }
}