// // These are taken from script.js
// // const { Body, Bodies, World } = Matter;
const HOOP_HEIGHT = 60;
const HOOP_WIDTH = 80;
const HOOP_SIZE = 10;

class Hoop {
    constructor(x, y, world) {
        this.x = x;
        this.y = y;
        const hoopOptions = {    
            isStatic: true,
            render: {
                fillStyle: '#ffff00',
            }
        };

        const targetOptions = {
            isSensor: true,
            isStatic: true,
            render: {
                fillStyle: '#ff00ff'
            }
        };

        this.leftHoop = Bodies.rectangle(this.x - HOOP_WIDTH / 2, this.y, HOOP_SIZE, HOOP_HEIGHT, hoopOptions);
        this.rightHoop = Bodies.rectangle(this.x + HOOP_WIDTH / 2, this.y, HOOP_SIZE, HOOP_HEIGHT, hoopOptions);
        this.bottomHoop = Bodies.rectangle(this.x, this.y + HOOP_HEIGHT / 2, HOOP_WIDTH, HOOP_SIZE, hoopOptions);
        this.target = Bodies.circle(this.x, this.y + HOOP_SIZE, HOOP_SIZE, targetOptions);
        this.target.label = 'target';

        World.add(world, [this.target, this.leftHoop, this.rightHoop, this.bottomHoop]);
    }

    setPosition(pos) {
        Body.setPosition(this.leftHoop, pos);
        Body.setPosition(this.rightHoop, pos);
        Body.setPosition(this.bottomHoop, pos);
        Body.setPosition(this.target, pos);
    }

    getTarget() {
        return this.target;
    }

    removeFromWorld(world) {
        World.remove(world, [this.target, this.leftHoop, this.rightHoop, this.bottomHoop]);
    }
}