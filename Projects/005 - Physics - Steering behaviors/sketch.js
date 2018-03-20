const VEHICLES = [];
const SCREEN_SIZE = Math.min(640, window.innerWidth);
const SELECT = document.getElementById('steer');
let selected_behavior = SELECT.value;

function setup() {
    createCanvas(SCREEN_SIZE, SCREEN_SIZE * 3 / 4);

    for(let i = 0; i < 50; i++) {
        VEHICLES.push(new Vehicle(random(width), random(height)));
    }
}

function draw() {
    background(200);

    for(let vehicle of VEHICLES) {
        applySelectedBehavior(selected_behavior, vehicle);
        vehicle.update();
        vehicle.checkEdges();
        vehicle.draw();
    }
}

function mousePressed() {
    VEHICLES.push(new Vehicle(mouseX, mouseY));
}

function applySelectedBehavior(behavior, vehicle) {
    const mouse = createVector(mouseX, mouseY);

    switch(behavior) {
        case 'align': {
            vehicle.align(VEHICLES);
            break;
        }
        case 'separate': {
            vehicle.separate(VEHICLES);
            break;
        }
        case 'seek': {
            vehicle.arrival(mouse);
            break;
        }
        case 'flee': {
            vehicle.flee(mouse);
            break;
        }
    }
}

SELECT.addEventListener('change', (e) => {
    selected_behavior = e.target.value;
});